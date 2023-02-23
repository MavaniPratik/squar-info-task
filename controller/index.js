

const db = require("../model/index");
const users = db.user
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

/*

create userr with post method
requestbody firstname,lastname,dob,email,password,confirmpassword
using password bcrypt for password hiding
give response :- all create user tokens with user ID

*/

const createuser = async (req, res) => {

    try {
        const data = req.body

        var data1 = []
        for (const element of data) {
            if (element.password === element.confirmpassword) {
                const password1 = await bcrypt.hash(element.password, 10)
                const confirmpassword1 = await bcrypt.hash(element.confirmpassword, 10)
                const data = {
                    firstName: element.firstName,
                    lastName: element.lastName,
                    dateofBirth: element.dateofBirth,
                    email: element.email,
                    password: password1,
                    confirmpassword: confirmpassword1
                }
                data1.push(data)

            } else {
                console.log(`data password not match ${element.name}`)
            }
        }
        const data3 = await users.bulkCreate(data1)
        for (const ele of data3) {
            const token = jwt.sign(ele.id, "12345678910abcd12345678910abcd12345678910")
            await users.update({ tokens: token }, {
                where: {
                    id: ele.id
                }
            })
        }

        const tokens = await users.findAll({ attributes: ["id", "tokens"] })
        res.send(tokens)
    } catch (error) {
        console.log(error)
        res.status(404).send(`data not found - register`)
    }

}



/*

get user with get method 
get one user by using findone method with user tokens
header :- access token
give response :- one user as object

*/

const userbytoken = async (req, res) => {
    const data = req.headers.authorization
    const verifyuser = jwt.verify(data, "12345678910abcd12345678910abcd12345678910")
    console.log(verifyuser)
    const user = await users.findOne({ where: { id: verifyuser } })
    res.send(user)
}


/*

get user by id  with get method 
get one user by using findone method with user tokens and user ID
header :- access token
query parameter :- user_id
give response :- one user as object

*/

const getuserbyid = async (req, res) => {
    if (req.headers.authorization) {
        const data = req.headers.authorization

        const id = req.params.id
        const verifyuser = jwt.verify(data, "12345678910abcd12345678910abcd12345678910")
        if (id == verifyuser) {
            const user = await users.findOne({ where: { id: verifyuser } })
            res.send(user)
        }
        else {
            res.send("user id and token not are match")
        }
    }
    else
        res.send("please provide first headers")
}


/*

get all user with get method
using findAll method 
response :- list of all users

*/


const getalluser = async (req, res) => {
    const usersdata = await users.findAll({})
    if (usersdata) {
        res.send(usersdata)
    }
    else {
        res.send("no any data in database")
    }

}

/*

delete a user by id using delete method
using destroy method with user tokens and user ID
header :- access token
query parameter :- user_id
give response :- user delete successfully

*/
const deleteuser = async (req, res) => {
    if (req.headers.authorization) {
        const data = req.headers.authorization

        const id = req.params.id
        const verifyuser = jwt.verify(data, "12345678910abcd12345678910abcd12345678910")
        if (id == verifyuser) {
            await users.destroy({ where: { id: verifyuser } })
            res.send("user delete successfully")
        }
        else {
            res.send("user id and token not are match")
        }
    }
    else
        res.send("please provide first headers")
}


module.exports = {
    createuser,
    userbytoken,
    getuserbyid,
    getalluser,
    deleteuser

}