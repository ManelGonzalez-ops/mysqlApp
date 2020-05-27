const mysql = require("mysql")

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456"
})

db.connect((err)=>{
    if(err){throw err};
    console.log("Mysql conncected")
})

module.exports = db