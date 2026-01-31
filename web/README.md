# file-archiver web

This is the React frontend for file-archiver.

## Prerequisites

- Bun >= 1.3.x

## Setup

Install the project dependencies with

```bash
bun install
```

## Running Locally

You can run the project locally with

```bash
bun dev
```

## Creating new routes

We use [Tanstack Router](https://tanstack.com/router/latest) for the routing solution in this project. For the best
developer experience, make sure the project is running locally first before creating any routes. Tanstack Router's Vite
plugin handles generating the boilerplate code required for each route, as well as ensuring the route types are up to
date with each new route added.

All new routes must be created under `src/routes`. This is the folder Tanstack Router is configured to look at. For
more details on how to configure routes, refer to [Tanstack Router's documentation](https://tanstack.com/router/latest)
for more details.
