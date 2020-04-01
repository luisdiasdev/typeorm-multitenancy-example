# typeorm-multitenancy-example

I wanted to create a sample of how to get started with multitenancy with NodeJS, Typescript, Express and TypeORM, 
because there were very few resources about it online.

## Getting started

To get a local copy of this project up and running you first need to make sure you have 
**Docker** and **docker-compose** installed and running. Then after cloning this repo, you should do as follows:

```
cd service
``` 

This will bring you into the services folder and then to start everything up:

```
docker-compose -f docker-compose.development.yml up
```

This will get you four Docker containers running in your PC:
1. The `postgres` which will store all the tenants information
2. The `tenant-db` which will store tenant-specific information
3. The `tenants-api-dev` which will provide an API to manage the tenants
4. The `users-api-dev` which will provide an API to manage tenant-specific users

## Folder structure

Inside the *services* folder there are some files and folders:

| File/Folder | Description |
| -------------- | ----------- |
| postgres       | Postgres Dockerfile for running with pt-br locale (you should choose your own locale) |
| tenants        | Service responsible for managing the *tenants* |
| users          | Service that depends on the tenants service for serving the users |
| docker-compose.development.yml | Sample docker-compose file for running everything together |

## Built with

* [Typescript](https://github.com/Microsoft/TypeScript)
* [Express](https://expressjs.com)
* [TypeORM](https://typeorm.io)

## Acknowledgments

* This was made for learning Typescript along with TypeORM
* This is very basic, please **DO NOT USE THIS AS A TEMPLATE FOR A REAL WORLD PROJECT**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
