# Project Handover Document

**Date:** February 20, 2026
**Author:** Outgoing Senior Development Engineer

## 1. Project Overview

This repository serves as a comprehensive collection of Angular projects and exercises, structured to follow the progression of the "Angular - The Complete Guide" course. It is designed as a monorepo of independent applications, each focusing on specific core concepts of the Angular framework or implementing small standalone applications.

The primary goal of this repository is educational, providing isolated examples for learning and reference.

## 2. Repository Structure

The repository is organized into multiple independent directories. Each directory (with the exception of `node_modules` and hidden configuration folders) represents a standalone Angular application with its own configuration and dependencies.

### Core Concept Modules

*   **`angular-udemy/`**: The main course project or starter application.
*   **`change-detection/`**: Demonstrations of Angular's change detection strategies (Default vs. OnPush), Zone.js, and performance optimization.
*   **`debugging/`**: Examples and configurations for debugging Angular applications.
*   **`deep-dive/`**: Advanced topics and deeper architectural explorations.
*   **`directives/`**: Implementation of custom attribute and structural directives.
*   **`forms/`**: Comprehensive examples of both Template-Driven and Reactive Forms, including validation and custom form controls.
*   **`httpRequests/`**: Examples of handling HTTP communication.
    *   *Note:* Contains `frontend` (Angular) and likely a simple `backend` (Node/Express or similar) for API interaction.
*   **`lifecycle/`**: Demonstrations of Angular Component Lifecycle Hooks (`ngOnInit`, `ngOnChanges`, `ngOnDestroy`, etc.).
*   **`pipes/`**: Usage of built-in pipes and creation of custom pipes for data transformation.
*   **`routing/`**: Configuration of the Angular Router, including nested routes, lazy loading, and route guards.
*   **`RxJS/`**: Examples focusing on Reactive Programming with RxJS (Observables, Subjects, Operators).
*   **`services/`**: Dependency Injection (DI) patterns, service creation, and hierarchical injectors.
*   **`two-way-binding/`**: Examples of data binding syntax, specifically `[(ngModel)]`.

### Application Modules

*   **`finances/`**: A standalone "Investment Calculator" application, likely applying multiple concepts (forms, data binding, services) in a practical scenario.

## 3. Technology Stack

*   **Framework:** Angular (Modern versions, utilizing `eslint.config.ts` suggesting v16+).
*   **Language:** TypeScript.
*   **State Management:** Primarily Angular Services and RxJS.
*   **Styling:** Standard CSS/SCSS (project dependent).
*   **Linting/Formatting:** ESLint, Prettier.
*   **Package Manager:** `npm` (indicated by `package-lock.json`).

## 4. Getting Started

Since this is a collection of independent projects, you must install dependencies and run scripts **within each specific subdirectory**.

### Prerequisites

*   **Node.js**: Ensure a compatible LTS version is installed.
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

## 5. Development Workflow

Standard Angular CLI commands apply to each project individually.

*   **Generate Components:** `ng generate component component-name`
*   **Build:** `ng build` (builds the project to the `dist/` directory)
*   **Test:** `ng test` (launches the test runner)
*   **Lint:** `ng lint` or `npm run lint`

## 6. Key Notes for Handover

*   **Independence:** Remember that changes in one directory (e.g., `services/`) do not affect others (e.g., `routing/`). They share no common root `node_modules` or configuration.
*   **Configuration:** Watch out for `angular.json` and `tsconfig.json` in each directory; they are tailored to that specific project's needs.
*   **Backend:** The `httpRequests/backend` directory likely requires a separate `npm install` and `npm start` to serve the API for the frontend examples.
*   **Modernization:** Some projects use newer tooling configurations (like flat `eslint.config.ts`), indicating they are up-to-date with recent Angular best practices.

## 7. Future Recommendations

*   **Workspaces:** If shared code becomes necessary, consider migrating this structure to an Nx workspace or a standard Angular multi-project workspace.
*   **Updates:** Regularly update Angular CLI and core dependencies in each project to keep them synchronized with the latest framework features.
