# Enterprise Cloud Engineering Platform

## Project Overview
This is a modern, web-based cloud engineering portfolio platform designed to demonstrate real-world cloud administration and security architectures. It features interactive dashboard simulations for Microsoft 365, Azure AD, Intune, Sophos, and AWS.

## Features
- **Identity & Access Management (Azure AD)**: Simulates User Lifecycle management and Zero Trust Conditional Access policies.
- **Device Management (Intune)**: Showcases endpoint compliance evaluation and application deployment tracking.
- **Security Posture (Sophos)**: Visualizes threat detections, incident response statuses, and endpoint security scores.
- **AWS Cloud Architecture**: Demonstrates EC2 instances state, S3 storage metrics, and Security Group configurations.

## Architecture
- **Frontend**: Vite + React (JavaScript), styled with Tailwind CSS v4.
- **Routing**: React Router (HashRouter used for GitHub Pages static hosting compatibility).
- **Icons**: Lucide React.
- **CI/CD**: Fully automated deployment to GitHub Pages via GitHub Actions.

## Live Demo
Once deployed via GitHub Actions, the live site will be available at your GitHub Pages URL (e.g. `https://<your-username>.github.io/cloud-engineering-platform/`).

## Local Development Instructions
1. Clone the repository
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`
4. Open your browser and navigate to the localhost URL provided.

## How to Deploy
This repository comes with a pre-configured GitHub Actions workflow (`.github/workflows/deploy.yml`).
1. Push this repository to GitHub.
2. In your GitHub repository settings, navigate to **Pages**.
3. Under Build and deployment, ensure **Source** is set to "GitHub Actions".
4. The workflow will automatically build and deploy your site!

## Designer & Architect
Built for a Cloud Engineer portfolio.
