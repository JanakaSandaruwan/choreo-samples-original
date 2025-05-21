# Vue.js Single Page Application

## 1. Sample Overview

This sample provides a simple single-page web application (SPA) built with Vue.js. It demonstrates how to deploy a Vue.js frontend application on Choreo using the **WebApp** buildpack. The application is initialized using Vue CLI.

## 2. Prerequisites

*   **Language Runtime:** Node.js (version 18.x recommended, as specified for Choreo).
*   **Package Manager:** npm (usually comes with Node.js).
*   **Tools:** Vue CLI (`@vue/cli` - for local development if modifying the app), Git, Web browser.
*   **Choreo Account:** Access to the Choreo console.
*   **(Optional) Docker:** For building and running with Docker locally.

## 3. Local Development & Testing

### 3.1. Clone the Repository
```bash
git clone https://github.com/wso2/choreo-samples.git
cd choreo-samples/vue-single-page-application
```
*(Note: The original README mentions `web-apps/vue-spa` and `bring-your-own-image-components/web-apps/vue-spa` in paths. The actual sample is at `vue-single-page-application`. Ensure paths reflect the sample's location in the `choreo-samples` repo.)*

### 3.2. Install Dependencies
```bash
npm install
```

### 3.3. Run the Application (Development Server)
```bash
npm run serve
```
This will typically start a development server (e.g., on `http://localhost:8080/`). Check the console output for the exact URL.

### 3.4. Test Locally (Development Server)
Open your web browser and navigate to the URL provided by the `npm run serve` command.

### 3.5. Build for Production (Local)
```bash
npm run build
```
This will create a `dist` directory with the production-ready static files.

### 3.6. (Alternative) Build and Run with Docker Locally
*This sample also includes a `Dockerfile`.*
```bash
# Ensure you are in the vue-single-page-application directory
docker build -t vue-spa .
docker run -p 8080:80 vue-spa
```
Then access `http://localhost:8080` in your browser. *(Note: The Dockerfile's exposed port might differ, adjust if needed. The original command `docker run -p 8080:80` implies the container exposes port 80)*.

## 4. Choreo Deployment

### 4.1. Create Component
1.  Navigate to the Choreo Console and select your project.
2.  Click **+ Create** or **Create Component**.
3.  Select Component Type: **Web Application**.
4.  Enter a **Name** (e.g., `My Vue App`) and **Description**.

### 4.2. Connect Repository
1.  **GitHub Account:** Your GitHub account.
2.  **GitHub Repository:** `choreo-samples` (or your fork).
3.  **Branch:** `main`.
4.  **Buildpack:** **WebApp**.
5.  **Select Framework / Language:** Vue.js
6.  **Project Directory:** `vue-single-page-application`
7.  **Node Version:** `18` (or `18.x.x`).
8.  **Build Command:** `npm run build` (Choreo might auto-detect this).
9.  **Build Output Directory:** `dist` (Choreo might auto-detect this).
10. Click **Create**.

*(Alternative using Dockerfile: If you prefer, you could choose Buildpack: Dockerfile, and provide the Dockerfile Path and Context Path as `vue-single-page-application`.)*

### 4.3. Configure Endpoints & Configurations
1.  **Endpoints:**
    *   Choreo will provide a Web App URL. The internal container port would typically be port `80` (for Nginx serving static files, common in WebApp buildpacks) or the port exposed in your Dockerfile if using that method.
2.  **Configurations:**
    *   This simple SPA likely requires no special environment variables unless it's configured to consume backend APIs.

### 4.4. Build and Deploy
1.  Go to the **Build** page and click **Build**.
2.  Once successful, go to the **Deploy** page.
3.  Click **Configure & Deploy** (or **Deploy**).
4.  Select the environment and deploy.

## 5. Testing on Choreo

*   Access the **Web App URL** provided on the Choreo component's overview page in your browser.
*   Verify that the Vue.js application loads and functions as expected.

---
*The original README had path inconsistencies (`web-apps/vue-spa`, `bring-your-own-image-components/web-apps/vue-spa`). The paths in this updated README assume the sample is directly under `vue-single-page-application` in the `choreo-samples` root, which is the standard structure. If the sample is located deeper, adjust paths accordingly.*
