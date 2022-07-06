## Required Technologies
Your application must make use of the following libraries:

1. Postgres for the database
2. Node/Express 
3. dotenv from npm 
4. db-migrate from npm for migrations
5. jsonwebtoken from npm for working with JWTs
6. jasmine from npm for testing

## Instruction for running the project correctly

1. Run comand npm i
2. Configure the ENV file to the spicified data section
3. Run migrations db-migrate up
4. Run the required test

## Database 

1. Install postgreSQL
2. enter to postgresSql by (psql -U postgres -p 8000 -h 127.0.0.1)
3. CREATE DATABASE shopping_store
4. CREATE DATABASE shopping_store_test

## Evironment Data

PORT = 3000 ENV = dev POSTGRES_PORT=8000 POSTGRES_HOST = 127.0.0.1 POSTGRES_DB = shopping_app POSTGRES_DB_TEST = shopping_app_test POSTGRES_USER = postgres POSTGRES_PASSWORD = password BCRYPT_PASSWORD = keep_coding SALT_ROUNDS = 10 TOKEN = udacity-token