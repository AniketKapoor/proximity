const { PrismaClient } = require('@prisma/client');
const { generateAccessToken } = require('../middleware/token');
const { returnToken, returnUserNotFound } = require('../middleware/user');
const prisma = new PrismaClient;
exports.createUser = async (req, res) => {
    const { userName, password, userType, emailId } = req.body;
    let returnData = {};
    const userExists = await prisma.user.findFirst({
        where: {
            userEmail: emailId
        },
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving user."
        })
    })
        .finally(async () => { await prisma.$disconnect() });


    if (userExists) {
        returnData.errorCode = 1;
        returnData.errorMessage = 'email id already used';
    }
    else {
        const user = await prisma.user.create({
            data: {
                userName: userName,
                password: password,
                userType: userType,
                userEmail: emailId
            }
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving user."
            })
        })
            .finally(async () => { await prisma.$disconnect() });
        returnData.accessToken = generateAccessToken(user);
        returnData.userId = user.userId;
    }
    res.json(returnData);
}
exports.login = async (req, res) => {
    const { password, emailId } = req.body;
    const userExists = await prisma.user.findFirst({
        where: {
            userEmail: emailId,
            password: password
        },
    }).then((user) => {
        let returnData = user ? returnToken(user) : returnUserNotFound()
       res.json(returnData)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving user."
        })
    })
        .finally(async () => { await prisma.$disconnect() });
}