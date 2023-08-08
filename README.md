# GameXplorer API

This is my project as a response to the IntegrarTEC backend exam

## Content

The project is oriented to be a server in order to have a database of video games, their platforms, genres and reviews. It is made in:

- [NodeJS](https://nodejs.org/es/)
- [ExpressJS](https://expressjs.com/es/)
- [Prisma](https://prisma.io)
- [MongoDB](https://www.mongodb.com/)

## Requirements

To be able to use the project in localhost it is necessary to clone it and have some necessary programs:

- [Nodejs](https://nodejs.org/es/download/) v12.18.0 or higher.
- Development IDE of your convenience Eg [VS Code](https://code.visualstudio.com/download)
- [PostMan](https://www.postman.com/downloads/) for APIS tests. (Optional)
- [Git](https://git-scm.com/downloads) to be able to manage the versions.

## How to clone

Clone command:

```bash
cd existing_folder
git clone [LINK DEL REPOSITORIO]

```

## Instalation

Once the project has been cloned, it is necessary to install all the dependencies with the command:

```bash
npm install
```

## Run on LocalHost:

First, we need to create a .env file with the enviroment variables. Those are:

- PORT: The port where the server is running
- JWT_SECRET: A secret key for json web tokens
- JWT_EXPIRES_IN: The lifetime of our jwt
- JWT_REFRESH_EXPIRES_IN: Lifetime of the refresh token
- DATABASE_URL: The URL to our mongodb database

Once the environment variables are configured, we can start the server in development mode

```bash
npm run dev
```

Now we will have the server running on the port that we have configured and we will be able to access the endpoints
