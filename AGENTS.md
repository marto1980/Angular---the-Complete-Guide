# Project Handover Document

**Date:** February 24, 2026
**Author:** Outgoing Senior Development Engineer

## 1. Project Overview

This repository serves as a comprehensive collection of Angular projects and exercises, structured to follow the progression of the "Angular - The Complete Guide" course. It is designed as a monorepo of independent applications, each focusing on specific core concepts of the Angular framework or implementing small standalone applications.

The primary goal of this repository is educational, providing isolated examples for learning and reference.

## 2. Repository Structure

The repository is organized into multiple independent directories. Each directory (with the exception of `node_modules` and hidden configuration folders) represents a standalone Angular application with its own configuration and dependencies.

### Core Concept Modules

*   **`angular-udemy/`**: The main course project / starter application.
*   **`auth/`**: Implementation of Authentication patterns (Login, Signup, Guards, Interceptors).
*   **`directives/`**: Implementation of custom attribute and structural directives.
*   **`forms/`**: Comprehensive examples of both Template-Driven and Reactive Forms, including validation and custom form controls.
*   **`lifecycle/`**: Demonstrations of Angular Component Lifecycle Hooks (`ngOnInit`, `ngOnChanges`, `ngOnDestroy`, etc.).
*   **`pipes/`**: Usage of built-in pipes and creation of custom pipes for data transformation.
*   **`routing/`**: Configuration of the Angular Router, including nested routes, lazy loading, and route guards.
*   **`services/`**: Dependency Injection (DI) patterns, service creation, and hierarchical injectors.
*   **`two-way-binding/`**: Examples of data binding syntax, specifically `[(ngModel)]`.
*   **`RxJS/`**: Examples focusing on Reactive Programming with RxJS (Observables, Subjects, Operators).

### Advanced & Performance Modules

*   **`change-detection/`**: Demonstrations of Angular's change detection strategies (Default vs. OnPush), Zone.js, and performance optimization.
*   **`code-splitting/`**: Techniques for optimizing bundle size, including Lazy Loading of modules and components.
*   **`debugging/`**: Examples and configurations for debugging Angular applications.
*   **`deep-dive/`**: Advanced topics and deeper architectural explorations.
*   **`deferrable-views/`**: Usage of Angular 17+ Deferrable Views (`@defer`, `@placeholder`, `@loading`) for granular lazy loading.
*   **`deploying/`**: Configurations and examples for building production-ready applications and deployment strategies.

### Application Modules

*   **`finances/`**: A standalone "Investment Calculator" application.

### HTTP & Backend

*   **`httpRequests/`**:
    *   **`frontend/`**: Angular application demonstrating HTTP Client usage (GET, POST, Interceptors).
    *   **`backend/`**: A Node.js/Express backend API to support the frontend examples. *Requires separate startup.*

## 3. Technology Stack

*   **Framework:** Angular (Modern versions, utilizing `deferrable-views` implies v17+).
*   **CLI Version:** Angular CLI ~21.x (Based on package configuration).
*   **Language:** TypeScript.
*   **Testing:** Vitest (replacing Karma/Jasmine in newer projects).
*   **State Management:** Primarily Angular Services and RxJS.
*   **Styling:** Standard CSS/SCSS (project dependent).
*   **Linting/Formatting:** ESLint (flat config), Prettier.

## 4. Getting Started

Since this is a collection of independent projects, you must install dependencies and run scripts **within each specific subdirectory**.

### Prerequisites

*   **Node.js**: Ensure a compatible LTS version is installed (v18+ or v20+ recommended for newer Angular versions).
*   **Angular CLI**: Globally installed is recommended (`npm install -g @angular/cli`).

### Installation

Navigate to the project directory you wish to work on:

```bash
cd <directory-name>
npm install
```

*Example:*
```bash
cd finances
npm install
```

### Running a Project

To start the development server for a specific project:

```bash
# Inside the specific directory (e.g., /finances)
ng serve
# OR
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Special Case: HTTP Requests

To fully utilize the `httpRequests` examples, you must run both the backend and frontend:

1.  **Backend:**
    ```bash
    cd httpRequests/backend
    npm install
    npm start # Likely runs on port 3000 or 8080
    ```
2.  **Frontend:**
    ```bash
    cd httpRequests/frontend
    npm install
    ng serve
    ```

## 5. Development Workflow

Standard Angular CLI commands apply to each project individually.

*   **Generate Components:** `ng generate component component-name`
*   **Build:** `ng build` (builds the project to the `dist/` directory)
*   **Test:** `ng test` (launches the Vitest runner)
*   **Lint:** `ng lint` or `npm run lint`

## 6. Key Notes for Handover

*   **Independence:** Remember that changes in one directory (e.g., `services/`) do not affect others (e.g., `routing/`). They share no common root `node_modules` or configuration.
*   **Configuration:** Watch out for `angular.json` and `tsconfig.json` in each directory; they are tailored to that specific project's needs.
*   **Modern Tooling:** Note the use of `eslint.config.ts` (Flat Config) and `Vitest`, indicating a shift towards modern web development standards within the Angular ecosystem.
*   **Root Files:** The root directory contains a `package.json` primarily for holding the global Angular CLI version, but individual projects manage their own dependencies.

## 7. Future Recommendations

*   **Workspaces:** If shared code becomes necessary, consider migrating this structure to an Nx workspace or a standard Angular multi-project workspace.
*   **Updates:** Regularly update Angular CLI and core dependencies in each project to keep them synchronized with the latest framework features.