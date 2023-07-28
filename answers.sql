SELECT email FROM customers ORDER BY email ASC;

SELECT id FROM orders WHERE customer_id = (SELECT id FROM customers WHERE fname LIKE 'Elizabeth');

SELECT SUM(num_cupcakes) FROM orders WHERE processed = false;

SELECT cupcakes.name, SUM(orders.num_cupcakes) AS sum FROM cupcakes LEFT JOIN orders ON cupcakes.id = orders.cupcake_id GROUP BY cupcakes.name ORDER BY cupcakes.name;

SELECT customers.email, SUM(orders.num_cupcakes) AS total FROM customers LEFT JOIN orders ON customers.id = orders.customer_id GROUP BY customers.id ORDER BY total DESC;

SELECT customers.fname, customers.lname, customers.email FROM customers INNER JOIN orders ON customers.id = orders.customer_id AND orders.cupcake_id = (SELECT id FROM cupcakes WHERE name LIKE 'funfetti') AND orders.processed = true GROUP BY customers.id;