## API Endpoints
Users:

1. Index [token required] '/user' [GET]
2. Show [token required] '/user/:id' [GET]
3. Create N[token required] '/user' [POST]

Products:

1. Index '/product' [GET]
2. Show '/product/:id' [GET]
3. Create [token required] '/product' [POST]
4. Delete  /product/delete/:id [POST]
Orders:


1. Current Order by user (args: user id)[token required] '/order/:id/product' [POST]
2. Completed Orders by user (args: user id)[token required] '/order' [GET]

## Data Shapes

Product:

1. id
2. name
3. price
4. category
TABLE products ( id SERIAL PRIMARY KEY, name VARCHAR(50) NOT NULL, price INTEGER NOT NULL, category VARCHAR(50) NOT NULL )

User:

1. id
2. firstName
3. lastName
4. password
TABLE users ( id SERIAL PRIMARY KEY, first_Name VARCHAR(50) NOT NULL, last_Name VARCHAR(50) NOT NULL, password VARCHAR(255) NOT NULL )

Orders:

1. id
2. id of each product in the order
3. quantity of each product in the order
4. user_id
5. status of order (active or complete)
TABLE orders ( id SERIAL PRIMARY KEY, status VARCHAR(50) NOT NULL, user_id INTEGER REFERENCES users(id) NOT NULL [forign key])

order-products:

1. id
2. quantity
3. product_id
4. order_id
TABLE order_products(id SERIAL PRIMARY KEY,quantity INTEGER NOT NULL,product_id INTEGER REFERENCES products(id) NOT NULL,order_id INTEGER REFERENCES orders(id) NOT NULL);