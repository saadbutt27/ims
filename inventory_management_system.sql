create database ims;
use ims;

CREATE TABLE Categories (
    CategoryID INT PRIMARY KEY,
    CategoryName VARCHAR(50)
);

CREATE TABLE Suppliers (
  SupplierID INT PRIMARY KEY,
  SupplierName VARCHAR(100),
  ContactInformation VARCHAR(255)
);

CREATE TABLE Products (
  ProductID INT PRIMARY KEY AUTO_INCREMENT,
  ProductName VARCHAR(100),
  Description VARCHAR(255),
  Price DECIMAL(10, 2) CHECK (Price >= 0),
  Quantity INT CHECK (Quantity >= 0),
  CategoryID INT,
  SupplierID INT,
  FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID),
  FOREIGN KEY (SupplierID) REFERENCES Suppliers(SupplierID)
);

CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY AUTO_INCREMENT,
    CustomerName VARCHAR(100),
    Address VARCHAR(255),
    ContactInformation VARCHAR(255)
);

CREATE TABLE Orders (
  OrderID INT PRIMARY KEY AUTO_INCREMENT,
  ProductID INT,
  Quantity INT,
  OrderDate DATE,
  CustomerID INT,
  Amount INT CHECK (Amount >= 0),
  FOREIGN KEY (ProductID) REFERENCES Products(ProductID),
  FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

CREATE TABLE Transactions (
  TransactionID INT PRIMARY KEY AUTO_INCREMENT,
  ProductID INT,
  OrderID INT,
  CustomerID INT,
  PaymentStatus BOOLEAN, 
  TransactionDate DATE,
  FOREIGN KEY (ProductID) REFERENCES Products(ProductID),
  FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
  FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

INSERT INTO Categories (CategoryID, CategoryName)
VALUES
  (1, 'Electronics'),
  (2, 'Clothing'),
  (3, 'Furniture'),
  (4, 'Books'),
  (5, 'Beauty'),
  (6, 'Toys'),
  (7, 'Sports'),
  (8, 'Jewelry');

INSERT INTO Suppliers (SupplierID, SupplierName, ContactInformation)
VALUES
  (1, 'Parco Electronics', 'contact@abc.com'),
  (2, 'Jimmy Clothing', 'contact@xyz.com'),
  (3, 'Pure Furniture', 'contact@pqr.com'),
  (4, 'Find Books', 'contact@booksrus.com'),
  (5, 'Beauty Essentials', 'contact@beautyessentials.com'),
  (6, 'Toys Unlimited', 'contact@toysunlimited.com'),
  (7, 'Sports Emporium', 'contact@sportsemporium.com'),
  (8, 'Jewelry Gems', 'contact@jewelrygems.com');

INSERT INTO Products (ProductName, Description, Price, Quantity, CategoryID, SupplierID)
VALUES
  ('Laptop', 'High-performance laptop', 1500.00, 10, 1, 1),
  ('T-shirt', 'Cotton t-shirt', 20.00, 50, 2, 2),
  ('Sofa', 'Leather sofa', 800.00, 5, 3, 3),
  ('Python Programming Book', 'Learn Python programming', 30.00, 20, 4, 4),
  ('Cricket Bat', 'Cricket kit and musch more', 120.00, 10, 7, 7),
  ('Action Figure', 'Superhero action figure', 15.00, 30, 6, 6),
  ('Football', 'Official football', 25.00, 15, 7, 7),
  ('Lipstick', 'Matte red lipstick', 10.00, 40, 5, 5),
  ('Diamond Necklace', '18k gold necklace with diamonds', 2000.00, 3, 8, 8),
  ('Boxing Gloves', '12V car battery', 100.00, 12, 7, 7),
  ('Jeans Paint', 'Cotton Pant', 20.00, 50, 2, 2),
  ('Database Systems', 'Learn Databases', 70.00, 20, 4, 4);

INSERT INTO Customers (CustomerName, Address, ContactInformation)
VALUES
  ('John Doe', '123 Main St, City', 'john.doe@example.com'),
  ('Jane Smith', '456 Elm St, Town', 'jane.smith@example.com'),
  ('Michael Johnson', '789 Oak St, Village', 'michael.johnson@example.com'),
  ('Emily Davis', '321 Pine St, County', 'emily.davis@example.com'),
  ('Daniel Wilson', '654 Maple St, State', 'daniel.wilson@example.com'),
  ('Olivia Brown', '987 Cedar St, Country', 'olivia.brown@example.com'),
  ('James Taylor', '147 Birch St, Province', 'james.taylor@example.com'),
  ('Sophia Anderson', '258 Walnut St, Kingdom', 'sophia.anderson@example.com'),
  ('Matthew Martinez', '753 Spruce St, Empire', 'matthew.martinez@example.com'),
  ('Ava Hernandez', '951 Ash St, Republic', 'ava.hernandez@example.com');
  
INSERT INTO Orders (ProductID, Quantity, OrderDate, CustomerID)
VALUES
  (1, 2, '2023-05-01', 1),
  (2, 3, '2023-05-02', 2),
  (3, 1, '2023-05-03', 3),
  (4, 2, '2023-05-04', 4),
  (5, 1, '2023-05-05', 5),
  (6, 4, '2023-05-06', 6),
  (7, 2, '2023-05-07', 7),
  (8, 1, '2023-05-08', 8),
  (6, 3, '2023-05-09', 9),
  (4, 2, '2023-05-10', 10),
  (4, 3, '2023-05-11', 5),
  (5, 4, '2023-05-11', 6),
  (5, 2, '2023-05-12', 8),
  (3, 1, '2023-05-13', 2),
  (4, 4, '2023-05-13', 3);
  
INSERT INTO Transactions (ProductID, TransactionDate, CustomerID, OrderID, PaymentStatus)
VALUES
  (1, '2023-05-01', 1, 1, 1),
  (2, '2023-05-02', 2, 2, 0),
  (3, '2023-05-03', 3, 3, 0);
  
show triggers;

DELIMITER $$
CREATE TRIGGER after_order_insert
AFTER INSERT ON orders
FOR EACH ROW
BEGIN
INSERT INTO Transactions 
(ProductID, TransactionDate, CustomerID, OrderID, PaymentStatus)
VALUES
  (NEW.ProductID, curdate(), NEW.CustomerID, NEW.OrderID, 0);
END$$
DELIMITER ;

CALL place_order(3,1,4);
select * from products where productid = 3;
select * from products;
select * from orders;

DELIMITER //

CREATE PROCEDURE place_order(IN p_product_id INT, IN p_quantity INT, IN customer_id INT, IN total_amount INT)
BEGIN
    DECLARE v_available_quantity INT;

    -- Start a transaction
    START TRANSACTION;

    -- Get the available quantity of the product
    SELECT quantity INTO v_available_quantity
    FROM products
    WHERE ProductID = p_product_id
    FOR UPDATE;

    -- Check if there is enough quantity available
    IF v_available_quantity >= p_quantity THEN
        -- Update the product quantity
        UPDATE products
        SET quantity = quantity - p_quantity
        WHERE productid = p_product_id;

        -- Insert the order
        INSERT INTO orders (ProductID, Quantity, OrderDate, CustomerID, Amount)
        VALUES (p_product_id, p_quantity, curdate(), customer_id, total_amount);

        -- Commit the transaction
        COMMIT;

        SELECT 'Order placed successfully' AS message;

    ELSE
        -- Rollback the transaction
        ROLLBACK;

        SELECT 'Not enough quantity available' AS message;

    END IF;

END //

DELIMITER ;

  
INSERT INTO Orders (ProductID, Quantity, OrderDate, CustomerID)
VALUES
  (1, 2, curdate(), 1);

-----------------------------------------------------------------
  
select * from categories;
select * from suppliers;
select * from products;
select * from customers;
select * from orders;
select * from transactions;

select * from customers where customername = 'john doe';
select p.productid, p.productname, p.description, p.price, p.quantity, c.categoryid, c.categoryname, s.supplierid, s.suppliername  from products p  
join categories c on c.categoryid = p.categoryid
join suppliers s on s.supplierid = p.supplierid
where p.productid = 2;

select * from orders;
select o.orderid, p.productid, o.quantity, o.orderdate, c.customerid, c.customername from orders o
join products p on p.productid = o.productid
join customers c on c.customerid = o.customerid
order by orderid asc;

delete from products where productid = 3;

select * from products where productid = 3;

select t.transactionid, p.productid, o.orderid, t.paymentstatus, t.transactiondate, c.customerid, c.customername 
from transactions t 
join products p on p.productid = t.productid 
join customers c on c.customerid = t.customerid 
join orders o on o.orderid = t.orderid
order by transactionid asc;

update products set productname = 'sofa amooth', description = 'Leather sofa' , price = 800.00, quantity = 5 where productid = 3; 