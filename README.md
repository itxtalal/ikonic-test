
# Ikonic Test

A Full Stack Project which has Users and Posts. A user has 2 roles `user` and `admin`.
A user can have many posts. User can perform CRUD on its own posts. Admin can perform CRUD on all posts and all users.

## Requirements for Running this project

- Docker - https://docs.docker.com/engine/install/
- Node  -   https://nodejs.org/en/download


## Setting up the Project Locally

Clone the project

```bash
  git clone https://github.com/itxtalal/ikonic-test
```

Go to the project directory

```bash
  cd ikonic-test
```

Run the Docker container in the background

```bash
  docker compose up -d
```


Install dependencies

```bash
  npm install -g concurrently
```

```bash
  npm run install:all
```

### Run Prisma Migrations

```bash
  npm run prisma:migrate
```

### (Optional) Run Prisma Studio
You can use prisma studio to view the PostgreSQL database and manipulate data directly (not recommended)

```bash
  npm run prisma:studio
```


### Start Backend & Frontend Servers Concurrently

```bash
  npm run dev
```

## Use your App
You can use your app by going to 

```bash
http://localhost:5173/
```

By the way, Backend is hosted on this port
```bash
http://localhost:8000/
```


## Running Tests

To run tests, run the following command

```bash
  npm run test
```
- Only End 2 End Testing is performed. For Backend only.

## Tech Stack

**Client:** React, Redux, Redux-Toolkit, Typescript, Vite, TailwindCSS, Axios

**Server:** Node, Express, Typescript, JWT, Brcypt, Jest, SuperTest

**Database:** PostgreSQL in a Docker Container


## Deployment

I could have deployed both backend and frontend on Vercel using free tier. But using PostgreSQL for free was not feasible anywhere. That is why the project was not deployed.
