# online-storefront
node.js and MySQL
## MySQL Database
In a .sql I created a database and in it I added a table, then I altered the table to begin the SKU at 100 rather than 1, because when do you ever see an SKU that starts at 1? 
In that table I added 10 random objects in various departments. 
## js
I set up a js to require mysql then I configured the mysql connection, updating my sql username and setting it to read the database I created. 
Then I connected to my sql database. I set up a function, so that after it connects, the terminal will display all of the items found in my table. 
I installed npm mysql and ran the js to confirm that it displays everything on the table and it did. 
Then I added code for inquirer and wrote a function called start. In start, we first display all the different available products and their details, then we prompt the customer to ask them which SKU they'd like to buy and how many. If we have enough in stock, we'll re set the inventory to the original stock quantity minus the number the customer entered and the prompt restarts itself. If we do not have enough inventory to fulfill what the customer said, we'll prompt them to check the inventory number again and again the prompt restarts itself. I installed npm inquirer to make sure it was coded correctly.
I tested buying out all the quanity of a particular product and when it re prompted me, the number was updated correctly. I tried to purchase more of the product that was now sold out, and it prompted me that they did not have any more - which was correct. 
I have my Minimum Viable Product. 
