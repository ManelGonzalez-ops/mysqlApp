const { createUser, getUserById, getUsers, deleteUser, updateUser, loginPage, checkUser} = require("./controller")
const router = require("express").Router()

const {checkToken} = require("../../auth/token_validation")
// la ruta de login tiene que estar arriba para que se muestre, sino pillará la ruta "/"
router.route("/login")
.get(loginPage)
.post(checkToken, checkUser)

router.route("/")
.post(createUser)
.get(getUsers)
.put(checkToken, updateUser)
.delete(checkToken, deleteUser)

router.route("/:id")
.get(getUserById)




module.exports = router