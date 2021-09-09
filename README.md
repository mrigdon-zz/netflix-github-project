# Github Org Repo Explorer

A simple UI that allows you to browse repos for a Github org, and commits for each repo

https://user-images.githubusercontent.com/7377110/132727260-908ac8e2-d613-4346-b7a7-a1516198d3ce.mov

## Running the App

### Prerequisites

- NodeJS (recommend `v14.15.4`)
- Yarn (recommend `v1.22.10`)

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

## Rationale/Tradeoffs

### REST API vs GraphQL

- I use GraphQL in my day job and think it's a better long term investment for many new UI projects, especially when combined with Apollo client & Typescript (Schema type generation & caching)
- However, for simple, quick projects such as this, a REST API is much easier to get going, and can be sufficient when there are not many or complex API calls being made

### Unit Testing vs Functional Testing

- I could have went with something like Cypress for functional testing, or even Chromatic for visual regression testing.
- However, I think testing should start at the unit testing level, and given the turnaround of this project, I thought unit testing sufficient.
- If I had more time/was dedicated full time to this project's maintenance, adding Cypress or Chromatic would be a good idea.

### Client Sorting vs Server Sorting

- The project instructions were to sort the repos by some criteria
- In sorting, we can either do that on the client or on the server
- If we do it on the server, we're limited to the sort columns Github allows, and pagination will work
- If we do it on the client, we can sort by whatever we want, but pagination will be a bit wonkier as we don't get the next sorted page when we paginate, just the next page and we'd have to resort the entire table
- I went with client sorting for the repo table because of the benefit of sorting by more columns, and demonstrated how pagination might work on the commits list page

### Unit Test Completeness

- Most unit tests just test the most basic path. This was a decision I had to make to make time for cool features like i18n.
- In the real world, it's better to test all the paths and easier when the work is broken down into smaller work items
- I thought the tests I added (examples of both behavioral and snapshot tests) would be sufficient to demonstrate how it's done.
