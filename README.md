# wall-app

This is the frontend client of the Wall App. Checkout the Backend API project here: https://github.com/Hercilio1/wall-app-api.

This project is online on: https://wall-app.hercilio.ortiz.nom.br

## Project Overview

This project harnesses the capabilities of [Next.js](https://nextjs.org/) to streamline the development process, offering a straightforward and efficient workflow. Next.js proves invaluable, especially when working with React.js, even if not fully utilizing its server-side rendering capabilities.

### Technology Stack

- **Next.js:**
  Next.js powers the frontend development, providing a rapid and efficient framework.

- **Redux:**
  Employing Redux to manage the main states of the software adds a structured layer, enhancing the organization and comprehension of the application's primary flow.

- **Axios:**
  The project relies on Axios, a robust library for managing HTTP client requests. Its middleware structure forms the backbone for proper OAuth2 integration.

- **Material UI + Tailwind:**
  Enhance the UI/UX of the project with the combination of Material UI and Tailwind. These tools not only improve the visual appeal but also simplify the construction of frontend components.

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Hercilio1/wall-app.git
   ```

2. Install de dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Run it in the dev mode:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Docker alternative

Alternatively, there is a docker-compose file for running the application in the local environment, you need just to follow these steps:

1. Install Docker on your machine.

2. Start the dev server for local development:

   ```bash
   docker-compose up
   ```

It also will run in the [http://localhost:3000](http://localhost:3000) URL. The problem is that the docker env will not have the "hot-reload" feature, where you can automatically see the project changes, while your are editing the files. But it stills a good option if you only want to test the application.

## Deploying in Production

To deploy the application in a production environment, follow these steps:

1. Locate the file named `docker-compose.prod.yml` in the project root. This file contains the production configuration for our Docker environment.

2. Duplicate the following sample environment file and remove the `.sample` suffix:

   - `.env.production.sample`: Stores environment variables. This file is essential for the proper functioning of the application.

3. After duplicating the files, update the variable values in the newly created `.env.production` file according to your production environment requirements.

By completing these steps, you'll have the necessary configurations in place for deploying the application in a production environment. Now you just need to run the following command:

```bash
docker-compose -f docker-compose.prod.yml up --build -d
```

### Static export mode

For saving memory, the production mode only generate the SPA build of the frontend project. Currently there is no need for running the server side but it an available option for future features.
