# PWA_SimpleAutoInstall.js

A lightweight, dependency-free JavaScript tool for adding an auto-install banner to your Progressive Web App (PWA). This script makes it incredibly easy to prompt users to install your app, whether they’re on Chrome/Android (via the native install prompt) or iOS (with manual installation instructions).

> **Key Features:**
>
> - **Easy to Use:** Just include the script in your HTML and it automatically handles detection and display of the install banner.
> - **Easy to Deploy:** Works seamlessly with any static site or web server. No additional dependencies or frameworks required.
> - **Easy to Modify:** With its self-contained design and inline CSS, you can quickly customize the banner’s appearance and text to suit your branding.
> - **Cross-Platform Support:** Detects and handles both Android/Chrome (using the `beforeinstallprompt` event) and iOS devices (by showing manual installation instructions).

---

## How It Works

- **Event Handling:**  
  The script listens for the `beforeinstallprompt` event (supported by Chrome and other modern browsers) and stores the event for later use. This allows you to control when and how the installation prompt is shown.

- **Device Detection:**  
  It checks whether the app is already installed or if the device is running iOS. If the app isn’t installed, it creates and displays an install banner with appropriate messaging:
  - **Android/Chrome:** Displays a simple banner with an "Install" button that triggers the native install prompt.
  - **iOS:** Provides step-by-step instructions on how to add the app to the home screen since iOS does not support the native install prompt.

- **User Interactions:**  
  The banner includes:
  - An **Install** button for initiating the installation prompt on supported browsers.
  - A **Dismiss** button that hides the banner if the user isn’t interested.

---

## Usage

### Prerequisites
- Ensure your website qualifies as a PWA:
  - A valid **manifest.json**.
  - A registered **service worker**.
  - Serving your site over **HTTPS**.

### Installation

1. **Download or Clone** this repository to your project directory.

2. **Include the Script**  
   Add the following line before the closing `</body>` tag of your HTML file:

   ```html
   <script src="PWA_SimpleAutoInstall.js"></script>
   ```

3. **Integrate with Your PWA:**  
   Make sure your HTML file links to your manifest and registers your service worker. For example:

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <link rel="manifest" href="manifest.json">
     <title>My PWA</title>
   </head>
   <body>
     <!-- Your content here -->

     <!-- Include the auto-install script -->
     <script src="PWA_SimpleAutoInstall.js"></script>
   </body>
   </html>
   ```

---

## Deployment

Deploy the script as part of your web app:
- **Static Sites:** Place the script file in your project folder and reference it in your HTML.
- **Modern Web Servers:** Works with any server configuration that serves static assets.
- **Continuous Deployment:** Easily integrate into your build process since it’s a single, lightweight file.

No additional setup is required—simply deploy your app as usual, and the script will automatically display the installation prompt/banner for users who haven’t installed your PWA yet.

---

## Customization

This tool is designed for ease of modification:
- **Banner Styles:**  
  The inline CSS (injected into the document’s `<head>`) controls the appearance of the banner. Adjust these styles directly in the script to match your design requirements.
  
- **Text & Instructions:**  
  Modify the inner HTML of the banner message and the button labels to tailor the instructions for your users, especially for iOS devices where manual installation steps are provided.

- **Behavior:**  
  You can extend or change the functionality (e.g., add additional tracking or custom animations) by editing the JavaScript code.

---

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to fork the repository and submit a pull request or open an issue on GitHub.

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

By using **PWA_SimpleAutoInstall.js**, you get a simple, efficient, and highly customizable solution to enhance your PWA installation experience. Add it to your project today and simplify the install process for your users!

---

*Keywords: PWA auto-install, Progressive Web App, easy deploy, simple install banner, iOS install instructions, Chrome install prompt, dependency-free PWA tool.*
