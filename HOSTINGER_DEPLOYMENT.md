# Deploying Vexcort (Next.js) to Hostinger Node.js Hosting

## Step 1: Push / Upload Files to Hostinger

1. **Via Git Deployment (Recommended)**:
   - Connect your repository: `https://github.com/SaifDevAI/new-vexcort-hostinger.git`
   - Branch: `main`
   
2. **Via File Manager / FTP**:
   - Upload the project files to your domain directory (e.g., `/public_html` or application folder).
   - *(Do not upload `node_modules` or `.next` — they will be built on the server).*

---

## Step 2: Configure Node.js in Hostinger hPanel

1. Navigate to **Websites** &rarr; **Manage** &rarr; **Node.js**.
2. Set configuration:
   - **Node.js version**: Select **v20.x** or **v22.x**.
   - **Application root**: Select or enter your project root folder (e.g., `/public_html` or `/vexcort`).
   - **Application startup file**: Set to `server.js`.
   - **Application mode**: `Production`.

---

## Step 3: Install Dependencies & Build

In the Hostinger Node.js panel (or via SSH terminal in project root):

```bash
npm install
npm run build
```

---

## Step 4: Start / Restart Application

Click **Restart Application** in the Hostinger hPanel.
Your Next.js site will immediately be live with SSR, static optimization, dynamic routing, and fast performance.
