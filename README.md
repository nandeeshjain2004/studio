# NyayaAI: Legal AI Assistant

This is a Next.js application built in Firebase Studio. It provides an intelligent legal automation platform designed to digitize, analyze, and streamline legal workflows.

## Getting Started

To run the application locally, first install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Project Structure

-   `src/app`: Contains the main pages and layouts for the Next.js application.
-   `src/components`: Contains reusable React components, including UI components from `shadcn/ui`.
-   `src/ai`: Contains the Genkit flows and AI-related logic.
-   `src/lib`: Contains utility functions and library configurations.
-   `public`: Contains static assets.

## Deployment to Firebase App Hosting

This application is configured for deployment to Firebase App Hosting. You can set up a continuous deployment workflow by connecting your GitHub repository to Firebase.

Here are the steps to deploy your application:

1.  **Create a GitHub Repository**: Push your code to a new or existing repository on GitHub.

2.  **Create a Firebase Project**: If you haven't already, go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.

3.  **Navigate to App Hosting**: In your Firebase project, go to the **Build** section in the left-hand menu and select **App Hosting**.

4.  **Create a Backend**: Click on **Create backend** to start the setup process.
    -   You will be prompted to connect your GitHub account.
    -   Select the GitHub repository you want to deploy.

5.  **Configure Deployment**:
    -   The `apphosting.yaml` file in this repository provides the basic configuration, so you can often proceed with the default settings.
    -   Set the root directory to the root of your repository (`/`).
    -   Set up your production branch (e.g., `main` or `master`).

6.  **Deploy**: Firebase App Hosting will automatically build and deploy your application whenever you push changes to the configured production branch. You can monitor the deployment status in the App Hosting dashboard.

Once deployed, Firebase will provide you with a live URL for your application.
