import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outputDir = path.join(root, "vexcort_cpanel");
const clientDir = path.join(root, "dist", "client");
const serverEntry = path.join(root, "dist", "server", "index.js");

const origin = process.env.CPANEL_ORIGIN ?? "https://www.Vexcort.com";
const routes = [
  "/",
  "/about",
  "/faq",
  "/contact",
  "/services",
  "/sitemap.xml",
];

async function renderRoute(handler, route) {
  const url = new URL(route, origin);
  const response = await handler.fetch(new Request(url), {}, {});

  if (!response.ok) {
    throw new Error(`Failed to render ${route}: ${response.status} ${response.statusText}`);
  }

  const body = await response.text();
  const contentType = response.headers.get("content-type") ?? "";
  const filePath =
    route === "/"
      ? path.join(outputDir, "index.html")
      : route.endsWith(".xml")
        ? path.join(outputDir, route.slice(1))
        : path.join(outputDir, route.slice(1), "index.html");

  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, body);

  const displayPath = path.relative(outputDir, filePath).replaceAll(path.sep, "/");
  console.log(`Rendered ${route} -> ${displayPath} (${contentType})`);
}

async function main() {
  await rm(outputDir, { recursive: true, force: true });
  await mkdir(outputDir, { recursive: true });
  await cp(clientDir, outputDir, {
    recursive: true,
    filter: (source) => path.basename(source) !== ".assetsignore",
  });

  // Copy .env if it exists
  await cp(path.join(root, ".env"), path.join(outputDir, ".env"), { force: true }).catch(() => {});

  const serverUrl = pathToFileURL(serverEntry);
  serverUrl.searchParams.set("t", Date.now().toString());
  const server = await import(serverUrl.href);
  const handler = server.default;

  if (!handler || typeof handler.fetch !== "function") {
    throw new Error("Built TanStack Start server entry does not export a fetch handler.");
  }

  for (const route of routes) {
    await renderRoute(handler, route);
  }

  // Create premium static 404.html page
  const page404 = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Not Found Ã¢â‚¬â€ Vexcort</title>
  <style>
    body {
      background-color: #f8fafc;
      color: #0f172a;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      text-align: center;
      padding: 0 20px;
    }
    .container {
      max-width: 450px;
      padding: 40px;
      border-radius: 32px;
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(24, 0, 173, 0.08);
      box-shadow: 0 20px 50px rgba(24, 0, 173, 0.08);
    }
    h1 {
      font-size: 72px;
      font-weight: 900;
      margin: 0;
      background: linear-gradient(135deg, #1800AD 0%, #0EA5A4 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    h2 {
      font-size: 24px;
      font-weight: 800;
      margin: 16px 0 8px;
    }
    p {
      color: #64748b;
      font-size: 15px;
      line-height: 1.6;
      margin: 0 0 24px;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #1800AD 0%, #0EA5A4 100%);
      color: #ffffff;
      padding: 12px 28px;
      border-radius: 9999px;
      font-weight: 700;
      text-decoration: none;
      font-size: 14px;
      box-shadow: 0 10px 20px -5px rgba(24, 0, 173, 0.3);
      transition: transform 0.2s;
    }
    .btn:hover {
      transform: translateY(-2px);
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <p>The page you're looking for doesn't exist or has been moved. Let's get you back on track.</p>
    <a href="/" class="btn">Go Home</a>
  </div>
</body>
</html>`;
  await writeFile(path.join(outputDir, "404.html"), page404);

  // Write .htaccess with rewrite rules, ErrorDocument 404, and protection for sensitive files (.env, config files)
  await writeFile(
    path.join(outputDir, ".htaccess"),
    [
      "DirectoryIndex index.html",
      "Options -MultiViews",
      "",
      "# Configure custom 404 fallback page",
      "ErrorDocument 404 /404.html",
      "",
      "# Protect sensitive configurations and .env files",
      "<FilesMatch \"^\\.env|tsconfig\\.json|package\\.json|wrangler\\.jsonc\">",
      "  Order allow,deny",
      "  Deny from all",
      "</FilesMatch>",
      "",
      "# SPA client-side routing fallback rewrites",
      "<IfModule mod_rewrite.c>",
      "  RewriteEngine On",
      "  RewriteCond %{REQUEST_FILENAME} -f [OR]",
      "  RewriteCond %{REQUEST_FILENAME} -d",
      "  RewriteRule ^ - [L]",
      "  RewriteRule ^ index.html [L]",
      "</IfModule>",
      "",
    ].join("\n"),
  );

  await writeFile(
    path.join(outputDir, "DEPLOYMENT.txt"),
    [
      "Vexcort cPanel deployment package",
      "",
      "Upload the contents of this folder to the subdomain document root in cPanel.",
      "The root index.html and per-route index.html files were prerendered from the TanStack Start build.",
      "Keep .htaccess in place so direct visits and refreshes on client-side routes work.",
      "The .env file has been copied to this folder and is protected by rules in .htaccess.",
      "A custom static 404.html page has been generated and configured.",
      "Make sure files uploaded are set to permission 644 and directories are set to 755 in cPanel.",
      "",
    ].join("\n"),
  );

  console.log(`cPanel package is ready at ${outputDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
