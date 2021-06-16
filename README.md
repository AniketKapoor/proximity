express
prisma
prisma client
body-parser
jsonwebtoken
dotenv
error code 401 jwt authentication empty
403 authentication failure
localhost:4000/api/v1/user/createUser
{
        "userName": "aniket",
        "password": "aniket",
        "userType": "instructor",
        "emailId": "aniketKapoor@live.in"
}
success
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTYyMzMwMDA5OH0.lm3sEhxH0jmu2gmSssvI8KuEoBitRCr_AauBtN4u0S0",
    "userId": 2
}
failure
{
    "errorCode": 1,
    "errorMessage": "email id already used"
}

1 email id already exists


localhost:4000/api/v1/user/login
{       "password": "aniket1",
         "emailId": "aniketKapoor@live.in"
}
success 
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYyMzI5OTk4OH0.ZSCmp2xSFZFZLHWUisJH8g_-dYy4ELz1YdRRgx0u_xY",
    "userType": "instructor",
    "userName": "aniket",
	"userId": 2
}

failure 
{
    "errorCode": "2",
    "errorMessage": "User Not Found"
}

2 user not found
