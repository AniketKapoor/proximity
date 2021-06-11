const { PrismaClient } = require('@prisma/client');
const { generateAccessToken } = require('../middleware/token');
exports.returnToken=(user)=>{
    let returnData={}
    returnData.accessToken=generateAccessToken(user);
    returnData.userType=user.userType;
    returnData.userName=user.userName;
    return returnData;
};
exports.returnUserNotFound=()=>{
    let returnData={};
    returnData.errorCode='2'
    returnData.errorMessage='User Not Found';
return returnData;
}