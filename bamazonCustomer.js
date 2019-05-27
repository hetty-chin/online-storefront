// add the mysql dependency
var mysql = require('mysql')

// create the mysql connection configuration for the `ice_creamDB` database
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

// connect to the `ice_creamDB` database
connection.connect(function (err) {
  if (err) throw err
  console.log('connected as id ' + connection.threadId)
  afterConnection()
})

/**
 * Tell Node to send a SQL query to our database and return the data collected through the "response" variable
 * https://www.npmjs.com/package/mysql#performing-queries
 * .query(sqlString, callback), where a SQL string is the first argument and the second is a callback
 */
function afterConnection () {
  connection.query('SELECT * FROM products', function (err, response) {
    if (err) throw err
    console.log(response)
    connection.end()
  })
}
