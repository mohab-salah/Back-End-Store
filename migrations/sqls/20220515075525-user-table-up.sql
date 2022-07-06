CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_Name VARCHAR(100) NOT NULL,
    last_Name VARCHAR(100) NOT NULL,
    password VARCHAR(200) NOT NULL
);