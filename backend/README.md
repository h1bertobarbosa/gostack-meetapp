**Bancos utilizados**

- `docker run --name redismetapp -p 6379:6379 -d -t redis:alpine`
- `docker run --name mongometapp -p 27017:27017 -d -t mongo`
- `docker run --name databasemetapp -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres:11.4`

*Rodar as migrations 
- yarn sequelize db:migrate

*Rodar o server 
- yarn dev
