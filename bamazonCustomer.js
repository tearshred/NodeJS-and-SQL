var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

function start() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        for (i = 0; i < results.length; i++) {
            console.log("Id: " + results[i].item_id + " Product: " + results[i].product_name + " Price $" + results[i].price + " Quantity remaining " + results[i].stock_quantity)
        }
        inquirer
            .prompt([{
                name: "item",
                type: "input",
                message: "What is the id of the item you would like to buy?"
            }, {
                name: "quantity",
                type: "input",
                message: "How many would you like to buy?"
            }]).then(function (answer) {
                var chosenItemId = answer.item;
                var quantity = answer.quantity;
                buy(chosenItemId, quantity)
            })
    })
}

function buy(id, amount) {
    connection.query(
        "select * from products WHERE ?", [{
            item_id: id
        }],
        function (err, results) {
            if (err) throw err;
            if (amount > results[0].stock_quantity) {
                console.log("Sorry we do not have that many units in stock, we only have " + results[0].stock_quantity);
            } else {
                var stockQuantityAfter = results[0].stock_quantity - amount;
                var totalCost = results[0].price * amount
                console.log("Nice buy, your total purchase price is " + totalCost);
                connection.query(
                    "update products set ? where ?", [{
                            stock_quantity: stockQuantityAfter
                        },
                        {
                            item_id: id
                        }
                    ]

                )
                start();
            }
        })
}