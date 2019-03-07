DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

  USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NULL,
  department VARCHAR(50) NULL,
  price FLOAT NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department, price, stock_quantity)
      VALUE("Milwaukee 12-Set Toolbox","Home Imrpovement", 349.99, 15);

INSERT INTO products (product_name, department, price, stock_quantity)
  VALUE("Colgate Electric Toothbrush","Electronics", 39.99, 25);

INSERT INTO products (product_name, department, price, stock_quantity)
  VALUE("Samsung 860 EVO 500GB 2.5 Inch SATA III Internal SSD (MZ-76E500B/AM)","Computer Accessories", 79.99, 13);
