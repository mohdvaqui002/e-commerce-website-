# Shopify Frontend | E-Commerce Platform

A React + Vite frontend application designed for high performance, premium aesthetics, and responsive layout grids. 

This repository is fully containerized and integrated with **Jenkins CI/CD** for automated testing, builds, and container deployments.

---

## 🛠️ DevOps & Architecture Overview

The deployment lifecycle of this project follows modern DevOps best practices, combining multi-stage Docker builds and automated declarative Jenkins pipelines.

```
                  ┌───────────────────┐
                  │   Git Push (Main) │
                  └─────────┬─────────┘
                            │ (Webhook/Poll)
                            ▼
                  ┌───────────────────┐
                  │ Jenkins Pipeline  │
                  └─────────┬─────────┘
                            │
         ┌──────────────────┴──────────────────┐
         ▼                                     ▼
┌──────────────────┐                  ┌──────────────────┐
│  Docker Build    │                  │  Deploy (Docker) │
│ (Node JS Alpine) │                  │  (Nginx Alpine)  │
└──────────────────┘                  └──────────────────┘
```

### 1. Multi-Stage Containerization (`Dockerfile`)
To optimize image size and secure production deployments, a **two-stage build** process is implemented:
* **Stage 1 (Build)**: Uses a lightweight `node:20-alpine` image to install dependencies (`npm ci`) and compile static production files (`npm run build` producing the `/dist` directory).
* **Stage 2 (Runtime)**: Copies the built static assets into a `nginx:stable-alpine` image. This strips away all development dependencies and Node runtime packages, yielding a highly secure and optimized image under ~30MB.

### 2. Single-Page Application (SPA) Routing (`nginx.conf`)
Because this application utilizes client-side routing, Nginx is configured to handle routing fallbacks. The custom server block includes:
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```
This ensures that refreshing paths or accessing specific routes directly (e.g., `/mens` or `/womens`) does not return a `404 Not Found` error.

### 3. CI/CD Orchestration (`Jenkinsfile`)
A declarative pipeline automates the integration and deployment flow:
* **Checkout**: Fetches source code using the configured SCM.
* **Build Stage**: Runs the Docker build command tagging the output image with the unique Jenkins build number (`ecommerce-frontend:${BUILD_NUMBER}`) and update-tags it as `latest`.
* **Deploy Stage**: Safely stops and removes any previous running container named `ecommerce-app` and spins up the new container mapped to external port `3000`.

---

## 🚀 Getting Started

### Prerequisites
* **Docker Engine** (v20.10+)
* **Git**
* **Node.js** (v20+) *[Optional - for local development only]*

---

## 📦 Run Locally (Docker)

To run the production-ready containerized application locally on port `3000`:

1. **Build the Docker Image**:
   ```bash
   docker build -t ecommerce-frontend:latest .
   ```

2. **Run the Container**:
   ```bash
   docker run -d -p 3000:80 --name ecommerce-app ecommerce-frontend:latest
   ```

3. **Verify running containers**:
   ```bash
   docker ps
   ```
   Access the application at **[http://localhost:3000](http://localhost:3000)**.

---

## 💻 Local Development (No Docker)

For manual code modifications and lint checks:

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Access the local development server at the port indicated in the terminal (usually `http://localhost:5173`).

3. **Run Code Linting**:
   ```bash
   npm run lint
   ```

---

## ⚙️ Jenkins CI/CD Setup

To hook this up to your Jenkins server:

1. Create a new **Pipeline** job in Jenkins.
2. Under the **Pipeline** configuration section, select **Pipeline script from SCM**.
3. Choose **Git**, enter your repository URL: `git@github.com:mohdvaqui002/e-commerce-website-.git`.
4. Specify branch as `*/main`.
5. Set Script Path to `Jenkinsfile`.
6. Click **Save** and trigger a manual build using **Build Now**.
