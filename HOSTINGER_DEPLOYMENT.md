# Deploying Vexcort to Hostinger Node.js Hosting

## Option A: Hostinger Node.js Web Application (Recommended)

1. **Upload Files**:
   Upload the project files to your domain directory (e.g., `public_html` or application folder) via Hostinger File Manager or Git.
   *(You do not need to upload `node_modules` — they will be installed on the server).*

2. **Configure Node.js in Hostinger hPanel**:
   - Go to **Websites** -> **Manage** -> **Node.js**.
   - **Node.js version**: Select **v20.x** or **v22.x**.
   - **Application root**: Select or enter your project root folder (e.g., `/public_html` or `/vexcort`).
   - **Application startup file**: Set to `server.mjs`.
   - **Application mode**: `Production`.

3. **Install Dependencies & Build**:
   Click **NPM Install** in the Hostinger Node.js panel (or run via SSH terminal):
   ```bash
   npm install
   npm run build
   ```

4. **Start/Restart Application**:
   Click **Restart Application** in the Hostinger panel.
   The server will start listening on the assigned environment port.

---

## Option B: Static / cPanel Export (Hostinger Shared / Cloud Hosting)

If using static hosting without the Node.js runtime process:
```bash
npm run package:cpanel
```
Upload everything inside `vexcort_cpanel` directly to your `public_html` folder.
