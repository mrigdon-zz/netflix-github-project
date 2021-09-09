# Github Org Repo Explorer

A simple UI that allows you to browse repos for a Github org, and commits for each repo

https://user-images.githubusercontent.com/7377110/132727260-908ac8e2-d613-4346-b7a7-a1516198d3ce.mov

## Running the App

### Production Mode

```bash
yarn install
yarn build --no-lint
yarn start
open http://localhost:3000
```

### Development Mode

```bash
yarn install
yarn dev
open http://localhost:3000
```

## Running the Test Suite

```bash
yarn test
```

## Tech Stack

| Tool                  | Purpose                       |
| --------------------- | ----------------------------- |
| Typescript            | Programming Language          |
| React                 | UI Component Framework        |
| NextJS                | Web Application Framework     |
| Github REST API       | Data Source                   |
| Jest                  | Unit Test Framework           |
| React Test Renderer   | Snapshot (Regression) Testing |
| React Testing Library | Component Behavioral Testing  |
| Mock Service Worker   | API Stubbing                  |
| CSS Modules           | Styling/CSS Organization      |

## Internationalization (I18n)

- This project is internationalized. When running the application, switch the language to Spanish and the UI text will update accordingly.
- The labels are stored in the `labels/` directory
- The translations are from Google translate; apologies if the Spanish is not a 1:1 translation in some cases
