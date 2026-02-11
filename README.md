# file-archiver

A personal file archiving web tool that backups files to multiple storage locations. Made with the intention of being
run within a Tailscale network.

## Prerequisites

- uv >= 0.9.28
- Docker
- A terminal to execute bash commands on (if you're on Windows), e.g. Git Bash

## Setup

First install Python 3.14+ with

```bash
uv python install 3.14
```

and then install the project's dependencies with

```bash
uv sync
```

## Local Development

### Backend

file-archiver runs on a Django DRF backend and is backed by a SQLite datdabase both in development and in production.
Similar to most Django projects, we first want to run our migrations to setup or local database. To do this, run the
following command:

```bash
uv run manage.py migrate
```

Once we have the database migrated, we'll create a superuser so we can login to the Django admin dashboard:

```bash
uv run manage.py createsuperuser
```

We can then finally run our server with the following command:

```bash
uv run manage.py runserver
```

You should be able to login with the superuser we created prior at the admin landing page: http://localhost:8000/admin.

### Frontend

For the frontend instructions, please refer to the `README.md` file in the `web` directory.

### For developers on Windows

We run a couple of pre-commit checks that pertain to linting and formatting your staged files before actually
committing. These execute some bash commands, so if you're on Windows you will need a terminal that can execute said
bash commands otherwise the pre-commit check will prevent you from creating a commit. You'll want to do all of your git
commands in this bash-compatible terminal or you'll run the risk of the pre-commit check resetting your staged files to the last commit.

## Building

We use Docker to build both the frontend and backend images. In the `docker` directory, we have a `Dockerfile.api` file
and a `Dockerfile.web`, both defining the main components of our application. We can build both using `docker compose`
with the following command:

```bash
docker compose -f "./docker/docker-compose.prod.yaml" build
```

## Running on your own server

To run on your own server, clone this project to it and build the project following the instructions in the `Building`
section. Once you've built the application, you can then start it with:

```bash
docker compose -f "./docker/docker-compose.prod.yaml" up --build -d
```

and both services will start running in detached mode. You'll then want to run both:

```bash
uv run manage.py migrate
uv run manage.py createsuperuser
```

to both make sure the database is up to date and we have an initial user to interact with the application. If you need
which ports both the frontend and backend run on (e.g. for security purposes), please refer to the
`docker-compose.prod.yaml` file in the `docker` directory.
