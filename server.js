
const express = require("express")
const userRouter = require("./api/users/router")
const app = express()

// sqlDb = "CREATE DATABASE IF NOT EXISTS gig"
// db.query(sqlDb, (err, result)=>{
//     if(err){
//         throw err
//     }
//     console.log("database created")
// })
//  sqlDB = "CREATE TABLE IF NOT EXISTS" 
app.set("view-engine", "ejs")

app.use(express.urlencoded({extended: false}))
app.use(express.json())
// app.get("/", (req, res)=>{
//     res.send("comemela molt")
//  })
app.use("/api/user", userRouter)  

// app.get("/", (req, res)=>{  //no hacia falta crear una ruta especifica para el login dado que es la pag principal
//     res.render("login.ejs")
// })
app.listen("3000", ()=>{
    console.log("server running")
})