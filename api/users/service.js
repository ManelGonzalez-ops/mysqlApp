const db = require("../../database/db")

exports.checkTable = ()=>{
    //use gig database
        db.query("use gig", (err)=>{
            if(err){
                throw err
            }
        })
    //create table, if table does exists mysql will throw a error, in this case instead of throwing the error and stop express, we continuo the flow (insert rows, update, etc..)
        db.query("create table users (id integer auto_increment, firstName char(30), lastName char(30), gender char(30), password char(150), email char(30) unique, number integer, primary key (id))", (err)=>{
            if(err){
                console.log("tabla ya creada")
            }
        })
    }

    exports.useDB =()=>{
        db.query("use gig")
    }
exports.create = (data, callBack)=>{
        db.query("insert into users (firstName, lastName, gender, email, password, number) values(?,?,?,?,?,?)", [
            data.firstName,data.lastName, data.gender, data.email, data.password, data.number
        ],
        (error, result, fields)=>{
            if(error){
                return callBack(error)
            }else{
                return callBack(null, result)
            }
        })
    }

    exports.getUsers = callBack =>{
        db.query("select id, firstName, lastName, number, gender, email from users",
        // no cuestion marks? leave empty array as useEffect hooks
        []
        , (err, result)=>{
            if(err){
                return callBack(err)
            }
            return callBack(null, result)
        }) 
    }
    exports.getUserById = (id, callBack) =>{
        db.query("select id, firstName, lastName, number, gender, email from users where id = ?",
        // no cuestion marks? leave empty array as useEffect hooks
        [id]
        , (err, result)=>{
            if(err){
                return callBack(err)
            }
            return callBack(null, result[0])
        }) 
    }

    exports.updateUser = (data, callBack)=>{
        db.query("update users set firstName=?, lastName=?, gender=?,email=?, password=?, number=? where id=?",
        [data.firstName,data.lastName, data.gender, data.email, data.password, data.number, data.id]
        , (err, result)=>{
            if(err){
               return callBack(err)
            }
            return callBack(null, result)
        })
    }
    exports.deleteUser = (data, callBack)=>{
        const id = data.id
        db.query("delete from users where id=?"
        , [id], (err, result)=>{
            if(err){
                callBack(err)
            }
            callBack(null, result)
            
        })
    }

    exports.checkUser =(data, callBack)=>{
        const email = data.email
        console.log(email, "Email")
        db.query("select * from users where email = ?",
        [email], (err, result)=>{
            if(err){
                callBack(err)
            }
            callBack(null, result)
        })
    }
    