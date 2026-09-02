import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const PORT = process.env.PORT || 3000;
const CLIENT_DIR = join(__dirname, "dist", "client");
const SERVER_ENTRY = pathToFileURL(join(__dirname, "dist", "server", "index.js")).href;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

async function main() {
  const serverModule = await import(SERVER_ENTRY);
  const handler = serverModule.default;

  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
      const pathname = decodeURIComponent(url.pathname);

      // Try serving static asset from dist/client
      const safePath = join(CLIENT_DIR, pathname.replace(/^\/+/, ""));
      if (safePath.startsWith(CLIENT_DIR)) {
        try {
          const fileStat = await stat(safePath);
          if (fileStat.isFile()) {
            const ext = extname(safePath).toLowerCase();
            const contentType = MIME_TYPES[ext] || "application/octet-stream";
            const content = await readFile(safePath);
            res.writeHead(200, {
              "Content-Type": contentType,
              "Content-Length": content.length,
              "Cache-Control": pathname.startsWith("/assets/")
                ? "public, max-age=31536000, immutable"
                : "public, max-age=3600",
            });
            res.end(content);
            return;
          }
        } catch {
          // Fall through to SSR
        }
      }

      // Forward to TanStack Start SSR handler
      const webReq = new Request(url.href, {
        method: req.method,
        headers: req.headers,
        body: ["GET", "HEAD"].includes(req.method) ? undefined : req,
        duplex: "half",
      });

      const webRes = await handler.fetch(webReq, {}, {});

      res.writeHead(webRes.status, Object.fromEntries(webRes.headers.entries()));
      if (webRes.body) {
        const reader = webRes.body.getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          res.write(value);
        }
      }
      res.end();
    } catch (err) {
      console.error("Server error:", err);
      if (!res.headersSent) {
        res.writeHead(500, { "Content-Type": "text/plain" });
      }
      res.end("Internal Server Error");
    }
  });

  server.listen(PORT, () => {
    console.log(`🚀 Vexcort Node.js server running on port ${PORT}`);
  });
}

main().catch(console.error);
