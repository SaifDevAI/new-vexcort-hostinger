import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';

process.env.NODE_ENV = process.env.NODE_ENV || 'production';
const port = parseInt(process.env.PORT || '3000', 10);
const dev = false;
const app = next({ dev, hostname: '0.0.0.0', port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, () => {
    console.log(`> Vexcort Next.js server ready on port ${port}`);
  });
});
