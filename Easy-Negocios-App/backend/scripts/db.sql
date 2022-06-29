CREATE DATABASE IF NOT EXISTS EasyNegocios;

USE EasyNegocios;

-- If anything fails due to the foreigns keys and the delete statement, use ON DELETE CASCADE

CREATE TABLE IF NOT EXISTS projects(
    id INT NOT NULL AUTO_INCREMENT,
    project_name VARCHAR(40) NOT NULL,
    project_description VARCHAR(200),
    update_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS categories(
    id INT NOT NULL AUTO_INCREMENT,
    project_id INT NOT NULL,
    category_name VARCHAR(40) NOT NULL,
    category_description VARCHAR(200),
    active BOOLEAN DEFAULT TRUE,
    
    PRIMARY KEY (id),
    CONSTRAINT FK_category_project FOREIGN KEY (project_id)
    REFERENCES projects(id)
);

CREATE TABLE IF NOT EXISTS products(
    id INT NOT NULL AUTO_INCREMENT,
    project_id INT NOT NULL,
    product_name VARCHAR(40) NOT NULL, -- THIS ONE COULD BE BETTER IF WE ASSIGN A UNIQUE CONSTRAINT TO THE NAME + PROJECT (name can be repeated, just not in the same project)
    category_id int,
    product_description VARCHAR(200),
    net_price int NOT NULL,
    gross_price int NOT NULL,
    stock int NOT NULL,
    measure_unit VARCHAR(20),
    stock_update_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    update_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    active BOOLEAN DEFAULT TRUE,
    
    PRIMARY KEY (id),
    CONSTRAINT FK_product_project FOREIGN KEY (project_id)
    REFERENCES projects(id),
    CONSTRAINT FK_product_category FOREIGN KEY (category_id)
    REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS sales(
    id INT NOT NULL AUTO_INCREMENT,
    project_id INT NOT NULL,
    total_net_price INT NOT NULL,
    total_gross_price INT NOT NULL,
    ticket BOOLEAN,
    sale_description VARCHAR(200),
    sale_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    update_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    active BOOLEAN DEFAULT TRUE,
    
    PRIMARY KEY (id),
    CONSTRAINT FK_sales_project FOREIGN KEY (project_id)
    REFERENCES projects(id)
);

CREATE TABLE IF NOT EXISTS sales_product_relation(
    id INT NOT NULL AUTO_INCREMENT,
    project_id INT NOT NULL,
    sales_id INT NOT NULL,
    product_id INT NOT NULL,
    cuantity INT NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    
    PRIMARY KEY (id),
    CONSTRAINT FK_sales_relation FOREIGN KEY (sales_id)
    REFERENCES sales(id),
    CONSTRAINT FK_product_relation FOREIGN KEY (product_id)
    REFERENCES products(id),
    CONSTRAINT FK_sales_relation_project FOREIGN KEY (project_id)
    REFERENCES projects(id)
);

CREATE TABLE IF NOT EXISTS investments(
    id INT NOT NULL AUTO_INCREMENT,
    project_id INT NOT NULL,
    total_net_price INT NOT NULL,
    total_gross_price INT NOT NULL,
    ticket BOOLEAN,
    investment_description VARCHAR(200),
    investment_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    owned_product BOOLEAN NOT NULL,   -- IF THE PRODUCT IS OWNED, THEN UPDATE STOCK, REMEMBER TO CHECK THAT THE PRODUCT BELONGS TO THE PROJECT
    cuantity INT,
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    update_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    active BOOLEAN DEFAULT TRUE,
    
    PRIMARY KEY (id),
    CONSTRAINT FK_investments_project FOREIGN KEY (project_id)
    REFERENCES projects(id)
);

CREATE TABLE IF NOT EXISTS clients(
    id INT NOT NULL AUTO_INCREMENT,
    project_id INT NOT NULL,
    client_name VARCHAR(40),
    client_description VARCHAR(200),
    update_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    active BOOLEAN DEFAULT TRUE,
    
    PRIMARY KEY (id),
    CONSTRAINT FK_clients_project FOREIGN KEY (project_id)
    REFERENCES projects(id)
);

CREATE TABLE IF NOT EXISTS orders(
    id INT NOT NULL AUTO_INCREMENT,
    project_id INT NOT NULL,
    client_id INT NOT NULL,
    delivery_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    order_description VARCHAR(200),
    address VARCHAR(50),
    update_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    active BOOLEAN DEFAULT TRUE,
    
    PRIMARY KEY (id),
    CONSTRAINT FK_orders_project FOREIGN KEY (project_id)
    REFERENCES projects(id)
);

CREATE TABLE IF NOT EXISTS order_product_relation(
    id INT NOT NULL AUTO_INCREMENT,
    project_id INT NOT NULL,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    cuantity INT NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    
    PRIMARY KEY (id),
    CONSTRAINT FK_order_relation FOREIGN KEY (order_id)
    REFERENCES orders(id),
    CONSTRAINT FK_product_relation_2 FOREIGN KEY (product_id)
    REFERENCES products(id),
    CONSTRAINT FK_orders_relation_project FOREIGN KEY (project_id)
    REFERENCES projects(id)
);


-- FROM NOW ON THE QUERIES ARE TO INSERT VALUES TO TEST!

INSERT INTO projects (project_name, project_description)
VALUES ('Project Test', 'This is a project to test the development of the app');

INSERT INTO clients (project_id, client_name, client_description)
VALUES (1, 'John Doe', 'This is a test clients description');

INSERT INTO investments (project_id, total_net_price, total_gross_price, ticket, investment_description, owned_product, cuantity)
VALUES (1, 1337.000, 150.000, TRUE, 'This is a testing investments description', TRUE, 30);

INSERT INTO categories (project_id, category_name, category_description)
VALUES (1, 'Testing Products', 'This is a test categories description');

INSERT INTO products (project_id, category_id, product_name, product_description, net_price, gross_price, stock, measure_unit)
VALUES (1, 1, 'Negotiable product', 'This is a test product description', 1000, 850, 20, 'units');

INSERT INTO sales (project_id, total_net_price, total_gross_price, ticket, sale_description, sale_date)
VALUES (1, 1000, 850, TRUE, 'This is a test sale description', CURRENT_TIMESTAMP);

INSERT INTO sales_product_relation (project_id, sales_id, product_id, cuantity)
VALUES (1, 1, 1, 10);

INSERT INTO orders (project_id, client_id, delivery_date, order_description, address)
VALUES (1, 1, CURRENT_TIMESTAMP, 'This is an order test description', 'Calle 13, casa 23, Santiago');

INSERT INTO order_product_relation (project_id, order_id, product_id, cuantity)
VALUES (1, 1, 1, 12);