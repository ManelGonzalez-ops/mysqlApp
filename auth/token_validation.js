const {verify} = require("jsonwebtoken")

module.exports = {
    checkToken: (req, res, next) =>{
        let token = req.get("authorization")
        if(token){
            token = token.slice(10)
            verify(token, "tontaco123", (err, decoded)=>{
                if(err){
                    res.json({
                        success: false,
                        message: "Invalid token"
                    })
                }
                else{
                    next()
                }
            })
        }else{
            res.json({
                success: false,
                message: "access denied unauthorized user"
            })
        }
    }
}