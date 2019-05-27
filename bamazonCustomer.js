// the mysql dependency
var mysql = require('mysql')
// allow command line interface with inquirer
var inquirer = require('inquirer')

// create the mysql connection configuration for the `bamazon_db` database
var connection = mysql.createConnection({
    host: 'localhost',
    // Your port; if not 3306
    port: 3306,
    // Your sql username
    user: 'nodeUser',
    // Your password
    password: '',
    database: 'bamazon_db'
})

// connect to the `bamazon_db` database
connection.connect(function (err) {
    if (err) throw err
    console.log('connected as id ' + connection.threadId)
    start()
})


function start () {
    queryAllProducts()
    promptCustomer()
}
/**
 * Tell Node to send a SQL query to our database and return the data collected through the "response" variable
 * https://www.npmjs.com/package/mysql#performing-queries
 * .query(sqlString, callback), where a SQL string is the first argument and the second is a callback
 */
function queryAllProducts() {
    connection.query('SELECT * FROM products', function (err, response) {
        if (err) throw err
        console.log (`\n\n ***** ----- FEATURED PRODUCTS ----- ***** \n\n`)
        for (var i = 0; i < response.length; i++) {
            console.log(`SKU: ${response[i].sku} | PRODUCT: ${response[i].product_name} | DEPARTMENT: ${response[i].department_name} | PRICE: $${response[i].price} | QUANTITY IN STOCK: ${response[i].stock_quantity} \n -------------------- \n`)
        }
    })
}

function promptCustomer() {
    // query the database for all items being sold
    connection.query('SELECT * FROM products', function (err, response) {
        if (err) throw err
        inquirer
            .prompt([
                {
                    name: 'whichSKU',
                    type: 'rawlist',
                    choices: function () {
                        var productChoiceArray = []
                        for (var i = 0; i < response.length; i++) {
                            productChoiceArray.push(response[i].sku)
                        }
                        return productChoiceArray
                    },
                    message: `What is the SKU of the product you'd like to buy?`
                },
                {
                    name: 'quantityBuy',
                    type: 'input',
                    message: `How many would you like to purchase?`
                }
            ])
            .then(function (answer) {
                // get the info of the chosen item
                var chosenItem
                for (var i = 0; i < response.length; i++) {
                    if (response[i].sku === answer.whichSKU) {
                        chosenItem = response[i]
                    }
                }

                // determine if there is enough of the product
                if (chosenItem.stock_quantity >= parseInt(answer.quantityBuy)) {
                    var newQuantity
                    newQuantity = (chosenItem.stock_quantity - answer.quantityBuy)
                    // there is enough, so update db
                    connection.query(
                        'UPDATE products SET ? WHERE ?',
                        [
                            {
                                stock_quantity: newQuantity
                            },
                            {
                                sku: chosenItem.sku
                            }

                        ],
                        function (error) {
                            if (error) throw err
                            console.log('You order was placed successfully! /n What else would you like to buy?')
                            start()
                          }

                    )
                } else {
                    // not enough in stock
                    console.log (`Sorry, we do not have enough in stock. Please check the QUANTITY IN STOCK for this item and try again.`)
                    start()
                }
            })
    })
}