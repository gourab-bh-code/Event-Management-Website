# Gatherly — Event Management Website

A responsive front-end event management website built with HTML5, CSS3 and vanilla JavaScript.

## Features
- Responsive layout for desktop, tablet and mobile
- Event cards with category labels
- Search events by title, description or venue
- Filter events by category
- View event details in a modal
- Registration form with name, email and phone validation
- Success confirmation after registration
- Registration data saved in browser Local Storage
- Dark/light theme toggle
- Mobile navigation menu

## Run locally
1. Download or clone this repository.
2. Open the project folder in Visual Studio Code.
3. Open `index.html` in a browser. You can also use the VS Code Live Server extension.
4. No build tools or package installation are required.

## Publish with GitHub Pages
1. Create a GitHub repository and upload `index.html`, `style.css`, `script.js`, and `README.md`.
2. Open the repository's **Settings**.
3. Select **Pages** in the left menu.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then click **Save**.
6. Wait a few minutes and refresh the Pages section for the published URL.

## Important note about registration
This is a front-end demonstration. Registration information is stored in the visitor's own browser using Local Storage. It is not sent to an organiser or central database. Do not use real personal information for testing.

## Customisation
- Edit event information in the `events` array in `script.js`.
- Change colours, spacing and layout in `style.css`.
- Edit headings and page sections in `index.html`.
