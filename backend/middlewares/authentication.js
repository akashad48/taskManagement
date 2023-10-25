const jwt = require('jsonwebtoken');
var { expressjwt: jct } = require("express-jwt");
var atob = require('atob');

const secretKey = 'MY-DREAM'; 



function generateToken(user) {
 
    const payload = {
        id: user.Userid,
        email: user.email,
        role: user.role,
    };
    
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

function authenticateJWT() {
    return  jct({ secret: secretKey, algorithms: ['HS256'] }).unless({
        path: [
            '/Login', 
        ],
    });
}

function authorizeRoles(allowedRoles) {
    return (req, res, next) => {
        //getting the token from request header
        const token = req.headers.authorization;

        //splitting the token ,header
        const parts = token.split('.');
           const encodedPayload = parts[1];
        //encoding the splitted token 
        const decodedPayload = atob(encodedPayload);
        //parsing object to json
        const payloadObject = JSON.parse(decodedPayload);

        console.log("atob object.role "+ payloadObject.role +" allowdrole = "+allowedRoles);


       
                    
                const userRole =  payloadObject.role;
                  //to check the role is matching or not
                if (allowedRoles.includes(userRole)) {
                    next();
                } else {
                    console.log("inside no error but role mismatched ")
                    res.status(403).json({ message: 'Access denied may be role is not authrosiesd' });
                }

            }

       
        
        
    };


module.exports = { generateToken, authenticateJWT, authorizeRoles };
