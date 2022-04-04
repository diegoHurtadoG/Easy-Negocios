CREATE DATABASE IF NOT EXISTS EasyNegocios;

USE EasyNegocios;

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
    measure_unit VARCHAR(10),
    stock_update_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    update_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
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
    sale_date DATETIME,
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    update_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id),
    CONSTRAINT FK_sales_project FOREIGN KEY (project_id)
    REFERENCES projects(id)
);

CREATE TABLE IF NOT EXISTS sales_product_relation(
    id INT NOT NULL AUTO_INCREMENT,
    sales_id INT NOT NULL,
    product_id INT NOT NULL,
    cuantity INT NOT NULL,
    
    PRIMARY KEY (id),
    CONSTRAINT FK_sales_relation FOREIGN KEY (sales_id)
    REFERENCES sales(id),
    CONSTRAINT FK_product_relation FOREIGN KEY (product_id)
    REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS investments(
    id INT NOT NULL AUTO_INCREMENT,
    project_id INT NOT NULL,
    total_net_price INT NOT NULL,
    total_gross_price INT NOT NULL,
    ticket BOOLEAN,
    investment_description VARCHAR(200),
    investment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    owned_product BOOLEAN NOT NULL,   -- IF THE PRODUCT IS OWNED, THEN UPDATE STOCK, REMEMBER TO CHECK THAT THE PRODUCT BELONGS TO THE PROJECT
    cuantity INT,
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    update_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
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
    
    PRIMARY KEY (id),
    CONSTRAINT FK_clients_project FOREIGN KEY (project_id)
    REFERENCES projects(id)
);

CREATE TABLE IF NOT EXISTS orders(
    id INT NOT NULL AUTO_INCREMENT,
    project_id INT NOT NULL,
    client_id INT,
    delivery_date DATETIME,
    order_description VARCHAR(200),
    address VARCHAR(50),
    update_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id),
    CONSTRAINT FK_orders_project FOREIGN KEY (project_id)
    REFERENCES projects(id)
);

CREATE TABLE IF NOT EXISTS order_product_relation(
    id INT NOT NULL AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    cuantity INT NOT NULL,
    
    PRIMARY KEY (id),
    CONSTRAINT FK_order_relation FOREIGN KEY (order_id)
    REFERENCES orders(id),
    CONSTRAINT FK_product_relation_2 FOREIGN KEY (product_id)
    REFERENCES products(id)
);