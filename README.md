# Nx boilerplate Angular16/Postgres/Nest/RESTfullAPI/TypeORM/Storybook

![image_22](https://user-images.githubusercontent.com/10075532/227379966-f688681c-ea72-44e3-afb9-357b4c05178d.png)

<div align="center">
  <a href="https://github.com/Indie-Creator-Community/indie-creators-community/wiki/1-%C2%B7-Bienvenid@-%F0%9F%91%8B" target="_blank">Comienzo rápido</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://discord.gg/77guznJ8mZ" target="_blank">Discord</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://discord.gg/77guznJ8mZ" target="_blank">Website (Pronto)</a>
  <br />
</div>

---

## Table of Contents

- [Nx boilerplate Angular16/Postgres/Nest/RESTfullAPI/TypeORM/Storybook](#nx-boilerplate-angular16postgresnestrestfullapitypeormstorybook)
  - [Table of Contents](#table-of-contents)
  - [Technologies - Frontend](#technologies---frontend)
  - [Technologies - Backend](#technologies---backend)
  - [Project Initialization Guide](#project-initialization-guide)
    - [1. Installation](#1-installation)
    - [2. Git Configuration](#2-git-configuration)
    - [3. Making Commits](#3-making-commits)
    - [4. Running the Project](#4-running-the-project)
    - [5. Further Documentation](#5-further-documentation)
  - [Global project structure](#global-project-structure)
  - [Global scripts](#global-scripts)
    - [Git Configuration](#git-configuration)
    - [Backend Commands](#backend-commands)
    - [Database Migration Commands](#database-migration-commands)
    - [Database Seeding and Clearing](#database-seeding-and-clearing)
    - [Frontend Commands](#frontend-commands)
    - [Storybook Commands](#storybook-commands)
  - [Features](#features)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [General](#general)
  - [Credits and references](#credits-and-references)
- [How can I contribute?](#how-can-i-contribute)
  - [Support](#support)
  - [Read the Contribution Guidelines](#read-the-contribution-guidelines)
  - [Security](#security)
  - [License](#license)
  - [Contributors](#contributors)
  - [Connect with us!](#connect-with-us)

<br />

## Technologies - Frontend

|                                                                                                                                    |                                                                                                                                         |                                                                          |                                                                              |                                                                                |
| :--------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------: | :--------------------------------------------------------------------------: | :----------------------------------------------------------------------------: |
| ![Angular](https://raw.githubusercontent.com/tandpfun/skill-icons/59059d9d1a2c092696dc66e00931cc1181a4ce1f/icons/Angular-Dark.svg) | ![Tailwind](https://raw.githubusercontent.com/tandpfun/skill-icons/59059d9d1a2c092696dc66e00931cc1181a4ce1f/icons/TailwindCSS-Dark.svg) | ![Storybook](https://avatars.githubusercontent.com/u/22632046?s=200&v=4) | ![Compodoc](https://compodoc.app/assets/img/compodoc-vectorise-inverted.svg) | ![NX](https://icons-for-free.com/download-icon-Nx-1324888747599639247_256.ico) |
|                                                 [Angular 16](https://angular.io/)                                                  |                                                  [Tailwind](https://tailwindcss.com/)                                                   |                  [Storybook](https://storybook.js.org/)                  |                      [Compodoc](https://compodoc.app/)                       |                             [NX](https://nx.dev/)                              |

<br />

## Technologies - Backend

|                                                                                                                                |                                                                                                                                          |                                                                                    |                                                                                                                             |                                                                                |
| :----------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------: |
| ![Nest](https://raw.githubusercontent.com/tandpfun/skill-icons/59059d9d1a2c092696dc66e00931cc1181a4ce1f/icons/NestJS-Dark.svg) | ![PostgreSQL](https://raw.githubusercontent.com/tandpfun/skill-icons/59059d9d1a2c092696dc66e00931cc1181a4ce1f/icons/PostgreSQL-Dark.svg) | ![TypeORM](https://seeklogo.com/images/T/typeorm-logo-F243B34DEE-seeklogo.com.png) | ![Docker](https://raw.githubusercontent.com/tandpfun/skill-icons/59059d9d1a2c092696dc66e00931cc1181a4ce1f/icons/Docker.svg) | ![NX](https://icons-for-free.com/download-icon-Nx-1324888747599639247_256.ico) |
|                                                  [Nest](https://nestjs.com/)                                                   |                                                [PostgreSQL](https://www.postgresql.org/)                                                 |                           [TypeORM](https://typeorm.io/)                           |                                              [Docker](https://www.docker.com/)                                              |                             [NX](https://nx.dev/)                              |

<br />

## Project Initialization Guide

Welcome to our project! This guide will help you set up and understand the necessary steps to get started. Let's dive in.

### 1. Installation

Before you can start working on the project, you need to install all the required dependencies. We use `yarn` as our package manager. To install everything, simply run:

```
yarn install
```

This command will fetch and install all the necessary dependencies listed in the `package.json` file.

### 2. Git Configuration

To ensure consistent and well-formatted commit messages, we utilize the `czVinyl` library. Before making your first commit, execute the following command:

```
npm run git:config
```

This configures git to allow the use of the `git c` command for making commits. By doing so, your commits will be formatted according to the standards set by the `czVinyl` library.

### 3. Making Commits

Now that everything is set up, you can start making changes to the code. When you're ready to commit those changes, use:

```
git c
```

This will guide you through the process of creating a well-structured commit message.

### 4. Running the Project

To get the project up and running, use the following commands based on your needs:

- **For the Backend (Development mode)**:

```
npm run start
```

- **For the Backend (Production mode)**:

```
npm run start:prod
```

- **For the Frontend**:

```
npm run serve
```

- **For Storybook**:

```
npm run story
```

### 5. Further Documentation

Be sure to check out the provided documentation for detailed information about database migrations, seeding, and other advanced topics.

---

By following these steps, you should have a smooth experience as you begin your journey with our project. If you have any issues or questions, please refer to the project's documentation or reach out to the team. Happy coding!

<br />

## Global project structure

```
NX-boilerplate.Nestjs-RESTfull-Angular16-Postgres
├── .gitattributes
├── .gitconfig
├── .gitignore
├── .prettierignore
├── .prettierrc
├── .storybook
│ ├── main.ts
│ └── tsconfig.json
├── .vscode
│ ├── extensions.json
│ └── settings.json
├── backend
│ ├── ...
│ ├── api-e2e
│ │ └── ...
│ └── database
│ └── ...
├── config
│ └── ...
├── db
│ └── init.sql
├── dist
│ ├── backend
│ │ └── ...
│ └── storybook
│ └── ...
├── docker-compose.yml
├── environments
│ └── ...
├── frontend
│ ├── ...
│ ├── ui
│ │ ├── ...
│ │ └── stories
│ │ └── ...
├── libs
│ └── tailwind-preset
│ └── ...
├── node_modules
│ └── ...
├── nx.json
├── package.json
├── README.md
├── tools
│ ├── tsconfig.tools.json
├── tsconfig.base.json
├── types
│ ├── express-custom
│ │ └── index.d.ts
│ └── nodejs
│ └── index.d.ts
├── yarn-error.log
└── yarn.lock
```

<br />

## Global scripts

Below is a detailed description of the configured scripts in the project:

### Git Configuration

- **`git:config`**:
  - **Command**: `` `git config --local include.path ../.gitconfig` ``
  - **Description**: Configures git to include a local `.gitconfig` file. This allows for project-specific git configurations.

### Backend Commands

- **`start`**:
  - **Command**: `` `cross-env NODE_ENV=develop nx serve api` ``
  - **Description**: Starts the backend (API) in development mode.
- **`start:prod`**:
  - **Command**: `` `cross-env NODE_ENV=production nx serve api` ``
  - **Description**: Starts the backend (API) in production mode.

### Database Migration Commands

- **`migrate:run`**:
  - **Command**: `` `cross-env NODE_ENV=none nx run database:mig-run` ``
  - **Description**: Executes pending migrations on the database.
- **`migrate:gen`**:
  - **Command**: `` `cross-env NODE_ENV=none nx run database:mig-gen` ``
  - **Description**: Generates a new migration based on detected changes in the entities.
- **`migrate:revert`**:
  - **Command**: `` `cross-env NODE_ENV=none nx run database:mig-rev` ``
  - **Description**: Reverts the last migration executed on the database.

### Database Seeding and Clearing

- **`make:seed`**:
  - **Command**: `` `cross-env NODE_ENV=none nx run database:seed` ``
  - **Description**: Executes seeders to populate the database with test data.
- **`clear:db`**:
  - **Command**: `` `cross-env NODE_ENV=none nx run database:clear` ``
  - **Description**: Clears the entire database, removing all records.

### Frontend Commands

- **`serve`**:
  - **Command**: `` `cross-env NODE_ENV=develop nx run frontend-app:serve` ``
  - **Description**: Starts the frontend in development mode.

### Storybook Commands

- **`story`**:
  - **Command**: `` `nx run frontend-ui:storybook` ``
  - **Description**: Starts Storybook for visualizing and developing UI components in an isolated environment.
- **`story:build`**:
  - **Command**: `` `nx run frontend-ui:build-storybook` ``
  - **Description**: Builds a static version of Storybook that can be deployed.

<br />

## Features

### Frontend

- [x] Frontend correctly set up to work with Angular 16.
- [x] Tailwind fully configured for use in the UI library (This library is intended for creating individual components to be used in the frontend) as well as in the frontend.
- [x] Service separation by endpoint in the frontend to keep components clean.
- [x] Customized error handlers.
- [x] Components created in a separate library for reusability and easy documentation with Storybook and Compodoc.
- [x] Access to the library components from the frontend using a single path @ui/components.
- [x] Typed components to accept certain properties.
- [x] Components with predefined style autocompletion from the library.
- [x] Reactive errors in forms.
- [x] Centralized validators to avoid repeating each validation in every form.
- [x] Directive created to centrally manage the ControlValueAccessor and extend it to reusable components that need it.
- [x] Predefined error list for forms.
- [x] Capability to create customized validators and send them through the custom component.
- [x] Capability to create formGroup level validators.
- [x] The following routes have been added to the frontend: auth/login, auth/revalidate, auth/reset-password, auth/recover, user/register, auth/change-password, user/change-password, dashboard, and the main route (./).
- [x] Atomic design methodology used for component management (Atoms and molecules are managed in the library while organisms and pages are managed in the frontend).
- [x] Documentation of some components in storybook as an example.
- [x] Adapters added for the endpoints.
- [x] Guards added to manage public routes, private routes, and the password reset route.
- [x] Usage of signals to manage data.
- [x] Custom Swal manager for handling notifications.
- [x] Common services created with signals to delete, create, and change data.

### Backend

- [x] Database completely separated from the API for better scaling.
- [x] Environments set up to be used anywhere, without using `process.env` and without the need to change their data type. Everything is done in a centralized manner and imported with the path @environments.
- [x] Autocomplete for available environment variables in case `process.env` is used.
- [x] Environments configured for both production and development, as well as for database environments found in a `.env` file.
- [x] Environments automatically switch between production and development, this change is made just by running the project with the preconfigured scripts in `package.json`.
- [x] TypeORM's synchronize functionality automatically activates in development and deactivates in production.
- [x] Docker set up to mount the Postgres image.
- [x] Guardian added in the backend to grant access only with a valid token.
- [x] Backend interceptors that format the response sent to the client in case of error and in case of success.
- [x] @Public decorator added to mark routes that don't need a token, like registration, login, etc.
- [x] JWT strategy implemented.
- [x] Fully customized response handler to format errors and successful responses.
- [x] Decorator added for role management (Allow certain roles to handle certain endpoints).
- [x] Handlebars added in the backend to manage templates sent to user's email.
- [x] `class-validator` used to validate entity fields in DTOs.
- [x] All main entities extend a base class to have the following fields: id, creation date, update date, deletion date, and id of the last user to edit the entity.
- [x] Factory added to create fake data and automatically fill the database with the data needed for testing.
- [x] Some endpoints have pagination ready.
- [x] Commonly used endpoints added. We have the following: Query all users, query users by their roles, query a single user, query users and projects, query all projects, query a single project, revalidate token, query a user and all their projects, query users by project id, register user, add project, edit user, delete user, block user, add user to project, edit project, delete project, log in user, request password change, change password, create task, etc.
- [x] Endpoint documentation with Swagger.
- [x] Decorator added to manage Swagger documentation in a more organized manner.

### General

- [x] Scripts configured at the project root so that there's no need to switch to backend or frontend directories; everything is done from the root. The following scripts have been fully configured: to start the backend project in development, to start the backend project in production, to start the frontend project in development, to run migrations, to generate migrations, to revert migrations, to clear the entire database, and to run storybook.
- [x] Commits can be made with a special format for documentation based on the type of change made. This can be done using the `git c` command.
- [x] Email is sent when a password change is requested.
- [x] Email is sent when the password is successfully changed.
- [x] The sending and response of each endpoint is fully typed.

<br />

## Credits and references

- [Cómo estructurar tu project de ReactJs? - Gentleman Programming](https://youtu.be/5LqhlCd2_nE)
- [Login Role con NestJS (jwt) - Parte I - Ruslan Gonzales](https://www.youtube.com/live/lTmGLgtgjdM?si=7GIrpN1RdDCL1TCk)
- [Instalación de Storybook para React y Atomic Design - Guillermo Rodas](https://youtu.be/zfxP2VvP_Dw)
- [Storybook](https://storybook.js.org/)
- [Catch Type Errors at Runtime with Zod: An Intro to this JavaScript Library](https://youtu.be/evX18f-n4AI)
- [Implementing a secure password reset in Node.js](https://blog.logrocket.com/implementing-secure-password-reset-node-js/)
- [Nest + GraphQL: Evoluciona tus APIs - Fernando Herrera](https://www.udemy.com/course/nest-graphql/)
- [Exclude a route from Nest.js AuthGaurd (make any route publicly available) - Danny Pule](https://dev.to/dannypule/exclude-route-from-nest-js-authgaurd-h0)
- [Nest](https://docs.nestjs.com/)
- [Introducción a NestJS | Clase 0 | NestJS de 0 a 100 - codrr](https://youtu.be/X-59-aXgFH4)
- [Primeros pasos | Clase 0 | Curso TypeScript - codrr](https://youtu.be/pwrv5D2bXJM)
- [Aprendemos sobre la nueva forma de hacer Clean Architecture en Front - Gentleman Programming](https://youtu.be/MAL7a_aXhxE)
- [Estructuramos en vivo un project de React usando conceptos de Clean Architecture - Gentleman Programming](https://youtu.be/XEcZaKK38fg)
- [Maneja #ERRORS como un campeón con #AXIOS #INTERCEPTOR - Gentleman Programming](https://youtu.be/axtI0lURwAw)
- [cz-vinyl](https://github.com/Exlint/cz-vinyl)
- [pet-vitality-app - Manuel Gil](https://github.com/ManuelGil/pet-vitality-app)
- [🐾 Cómo crear un monorepo con NestJS y Nx 🐱‍👤 - Manuel Gil](https://www.youtube.com/live/GAz0uW2ag7o?feature=share)
- [🐾 Cómo usar migration y seeding con TypeORM y NestJS 🐱‍👤 - Manuel Gil](https://www.youtube.com/live/NuHEU1Uw3Vg?feature=share)
- [6 consejos para que DISEÑES BIEN tu API REST - Manuel Zapata](https://youtu.be/bUmy7Nvsh4s)
- [Best Practices in API Design](https://swagger.io/resources/articles/best-practices-in-api-design/)
- [REST API Best Practices – REST Endpoint Design Examples](https://www.freecodecamp.org/news/rest-api-best-practices-rest-endpoint-design-examples/)
- [API REST con NODE.js || GUÍA de BUENAS PRÁCTICAS - Carlos Azaustre](https://youtu.be/qFmwRriNJWs)
- [Many Tailwind CSS classes doesn´t work on my Angular](https://stackoverflow.com/questions/71384038/many-tailwind-css-classes-doesn%C2%B4t-work-on-my-angular-12-project)
- [How to Not Get Lost in Your Project](https://blog.bitsrc.io/how-not-get-lost-in-my-project-feature-based-folder-structure-in-angular-16-35091577f30c)
- [No todo es STANDALONE Component - Jimy Dolores - Domini Code](https://www.youtube.com/live/sQwzR3gvETc?feature=share)
- [Storybook for Angular tutorial](https://storybook.js.org/tutorials/intro-to-storybook/angular/en/get-started/)
- [Cómo integrar Storybook en tus proyectos de Angular - Garaje de ideas](https://youtu.be/WHh0FMNFxbY)
- [Content Configuration - Tailwindcss](https://tailwindcss.com/docs/content-configuration)
- [Creating an Angular app in minutes with Cypress, StoryBook, Tailwind CSS and Nx](https://medium.com/ngconf/creating-an-angular-app-in-minutes-with-cypress-storybook-tailwind-css-and-nx-2105fb22f3e1)
- [Manipulate Angular components with content projection in Storybook](https://tsvetan.dev/blog/article/render-angular-components-with-ng-content-in-storybook/)
- [Component Story Format 3.0](https://storybook.js.org/blog/component-story-format-3-0/)
- [Set up Compodoc for Storybook on Nx](https://nx.dev/packages/storybook/documents/angular-storybook-compodoc)
- [Resolve JSON files as modules in TypeScript](https://koenwoortman.com/typescript-import-json-file-as-module/)
- [Controls](https://storybook.js.org/docs/angular/essentials/controls)
- [How DestroyRef Made My Life Easier with Angular 16](https://blog.bitsrc.io/how-destroyref-made-my-life-easier-with-angular-16-3b9ee9f54018)
- [How I’ve Created Custom Inputs in Angular 16!](https://blog.bitsrc.io/how-ive-created-custom-inputs-in-angular-16-43f4c2d37d07)
- [Keeping state with a Service using Signals - Alfredo Perez](https://medium.com/ngconf/keeping-state-with-a-service-using-signals-bee652158ecf)
- [Angular 16 - Signals and CRUD with Json Server - Sebastian Persson](https://youtu.be/xS1bpSnNv_U?si=c3drSS-2EAfZEFy3)
- [Exploring a Revolutionary Approach to Data Handling in Angular - A Walkthrough Video - Sebastian Persson](https://youtu.be/iMOsdz-T7_o?si=Dae0g0mURq1qncvf)
- [Angular: De cero a experto - Edición 2023 - Fernando Herrera](https://www.udemy.com/course/angular-fernando-herrera/)
- [Reusable Input and Select component with Control Value Accessor in Angular](https://youtu.be/N2nOUBwBwyU?si=qmBskNlQHmSF_dzB)
- [Get params from URL using inputs in Angular 16 | Enable withComponentInputBinding() in Angular 16](https://youtu.be/4Bc7rHcarOc?si=qMl5718Bk-K7NEAz)

<br>

# How can I contribute?

We welcome contributions from anyone who would like to help improve our project. Whether you're an experienced developer or just starting out, there are plenty of ways to get involved.

<br>

## Support

If you need help using our project, please visit our [SUPPORT.md](./docs/SUPPORT.md) file. This document provides information on how to get help from the community, how to report issues, and where to find additional resources.

<br>

## Read the Contribution Guidelines

Before you start contributing, please read our [CONTRIBUTING.md](./docs/CONTRIBUTING.md) file. This outlines the contribution guidelines and provides instructions for setting up your development environment, submitting pull requests, and more.

<br>

## Security

We take the security of our project seriously. If you discover a security vulnerability, please let us know right away. We will investigate all legitimate reports and do our best to quickly address any issues.

To learn more about our security practices, please read our [SECURITY.md](./docs/SECURITY.md) file.

<br>

## License

[MIT License](./LICENSE)

<br>

## Contributors

<a href="https://github.com/Tech-Code1/NX-boilerplate.Nestjs-Angular16-Postgres-RESTfull-TypeORM-Storybook/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Tech-Code1/NX-boilerplate.Nestjs-Angular16-Postgres-RESTfull-TypeORM-Storybook" />
</a>

Made with [contrib.rocks](https://contrib.rocks).

<div align="right">

[ [ ↑ to top ↑ ] ](#nx-boilerplate-angular16postgresnestrestfullapitypeormstorybook)

</div>

<br>

## Connect with us!

- [Join the community](https://discord.gg/77guznJ8mZ)
- [Follow us on Twitter](https://twitter.com/IndieCreatorsHQ)

---

<br>
<br>
<p align="center">
   <a href="https://discord.gg/77guznJ8mZ">
      <picture>
         <source media="(prefers-color-scheme: dark)" srcset="https://github.com/Tech-Code1/My-CV/assets/61479618/d2ae7bab-5437-4fbd-a257-33734b303f6b">
         <img width="250" alt="Made with love by Builder.io" src="https://github.com/Tech-Code1/My-CV/assets/61479618/e2b47ff4-3b0a-46ef-9ef8-2698ca15757a">
       </picture>
   </a>
</p>
