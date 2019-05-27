-- Drops the bamazon_db if it exists currently --
DROP DATABASE IF EXISTS bamazon_db;
-- Creates the "bamazon_db" database --
CREATE DATABASE IF NOT EXISTS bamazon_db;

-- Makes it so all of the following code will affect bamazon_db --
USE bamazon_db;

-- Creates the table "products" within bamazon_db --
CREATE TABLE IF NOT EXISTS products (
  -- Makes a "sku" column to be an auto-increment primary key field
  sku INTEGER NOT NULL AUTO_INCREMENT,
  -- Makes a string column called "product_name" --
  product_name VARCHAR(45) NOT NULL,
  -- Makes a string column called "department_name" --
  department_name VARCHAR(45) NOT NULL,
  -- Makes a exact fixed point column called "price" --
  price DECIMAL (10,2) NOT NULL,
  -- Makes an numeric column called "stock_quantity" --
  stock_quantity INTEGER(100) NOT NULL,
  PRIMARY KEY (sku)
);

-- To let the AUTO_INCREMENT sequence start at 100 instead https://www.w3schools.com/sql/sql_autoincrement.asp--
ALTER TABLE products AUTO_INCREMENT=100;

-- Populates database with 10 different products 00
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Standing Desk Board", "Sports & Fitness", 150.00, 5), ("Beach Bat & Ball Set", "Toys & Games", 195.50, 10), ("Standard Process - Purification Kit", "Health, Household & Baby Care", 292.20, 3), ("Waterproof Case", "Cell Phones & Accessories", 24.88, 20), ("Futon Set", "Home & Kitchen", 218.99, 25), ("Reusable Sandwich Bags", "Kitchen & Dining", 17.65, 53), ("Acupressure Pillow", "Health, Household & Baby Care", 35.99, 63), ("Acupressure Massage Mat", "Health, Household & Baby Care", 59.99, 28), ("Wooden Back Roller", "Health, Household & Baby Care", 35.95, 11), ("Bully Sticks", "Pet Supplies", 26.95, 27);