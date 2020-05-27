const { create, checkTable, getUsers, getUserById, updateUser, useDB, deleteUser, checkUser} = require("./service")
const {genSaltSync, hashSync, compareSync} = require("bcrypt")
const {sign} = require("jsonwebtoken")

module.exports = {
    createUser: (req, res) =>{
        checkTable()
        const body = req.body
        const salt = genSaltSync(10);
        body.password = hashSync(body.password.toString(), salt)
        create(body, (err, results)=>{
            if (err){
                console.log(err)
                return res.status(500).json({success: false, msg: "server error"})
            }
            console.log("new row added")

            return res.render("index.ejs", {name: body.firstName})
        })
    },
    getUsers: (req, res)=>{
        useDB()
        getUsers((err, results)=>{
            if(err){
                res.send("error")
                return res.status(500).json({
                    success: false,
                    data: err.sqlMessage
                })
            }
            
            return res.render("register.ejs")
        })
    },
    getUserById: (req, res)=>{
        useDB()
        getUserById(req.params.id, (err, results)=>{
            if(err){
                return res.status(500).json({
                    success: false,
                    data: err
                })
            }
            return res.status(200).json({
                success: true,
                data: results
            })
        })
    },
    updateUser: (req, res)=>{
        useDB()
        const body = req.body
        const salt = genSaltSync(10);
        body.password = hashSync(body.password.toString(), salt)
        updateUser(body, (err, results)=>{
            if(err){
                return res.status(500).json({
                    success: false,
                    data: err
                })
            }
            return res.status(200).json({
                success: true,
                data: results
            })
        })
    },
    deleteUser: (req, res)=>{
        useDB()
        deleteUser(req.body, (err, result)=>{
            if(err){
                return res.json({
                    success: false,
                    message: err
                })
            }
            if(!result){
                return res.json({
                    success: false,
                    message: "record not found"
                })
            }
            console.log("row deleted")
            return res.json({
                success: true,
                data: {}
            })
        })
    },
    loginPage: (req, res)=>{
       return res.render("login.ejs")
    },
    checkUser: (req, res)=>{
        checkTable()
        const data = req.body
        console.log(req.body)
        checkUser(data, (err, result)=>{
            if(err){
                return res.json({
                    success: false,
                    data: err
                })
            }
            if(!result){
                console.log("ningun resultado")
            }
            console.log(result, "RESULTADO")
            console.log(result[0].password)
            // return res.render("index.ejs", {name: result[0].firstName})
            const results = compareSync(data.password.toString(), result[0].password.toString())
            if(results){
                data.password = undefined;
                const jsontoken = sign({result: results}, "tontaco123", {expiresIn: "1h"})
                return res.json({
                    success: true,
                    token: jsontoken
                })
            }else{
                res.json({
                    success: false,
                    data: "invalid mail or password"
                })
            }
        }) 
    }

}