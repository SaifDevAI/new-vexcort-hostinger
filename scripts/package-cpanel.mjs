import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outputDir = path.join(root, "cpanel-deploy");
const clientDir = path.join(root, "dist", "client");
const serverEntry = path.join(root, "dist", "server", "index.js");

const origin = process.env.CPANEL_ORIGIN ?? "https://cortvex.com";
const routes = [
  "/",
  "/about",
  "/blog",
  "/book-meeting",
  "/contact",
  "/process",
  "/services",
  "/signin",
  "/work",
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

  await writeFile(
    path.join(outputDir, ".htaccess"),
    [
      "DirectoryIndex index.html",
      "Options -MultiViews",
      "",
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
      "Cortvex cPanel deployment package",
      "",
      "Upload the contents of this folder to the subdomain document root in cPanel.",
      "The root index.html and per-route index.html files were prerendered from the TanStack Start build.",
      "Keep .htaccess in place so direct visits and refreshes on client-side routes work.",
      "",
    ].join("\n"),
  );

  console.log(`cPanel package is ready at ${outputDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
