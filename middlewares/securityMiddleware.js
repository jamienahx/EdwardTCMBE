const utilSecurity = require("../util/securityUtil");
const checkJWT=(req, res, next)=>{
    // Check for the token being sent in a header or as a query parameter
    let token = req.get("Authorization") || req.query.token;
    if (token) {
        token = token.replace("Bearer ", "");
        console.log("Token received: ", token);
        //when the token is found, it verifies the token using utilSecurity.verifyJWT();
        req.user = utilSecurity.verifyJWT(token);
        console.log("User from token: ", req.user);
    } else {
      // No token was sent
      req.user = null;
    }
    return next();
  };
// make use of req.user check if they are login
const checkLogin=(req, res, next)=> {
    // Status code of 401 is Unauthorized. ensure that req.user is not null, it the request is authenticated
    if (!req.user) return res.status(401).json("Unauthorized");
    // block request
    next();
  };
// make use of req.user check if they are owner or if they are admin
const checkPermission=(req, res, next)=> {
    // Status code of 401 is Unauthorized
    if (!req.user) return res.status(401).json("Unauthorized");
    // if you are not the owner and you are not admin -> unauthorized
    if (req.body.email != req.user.email && req.user.is_admin == false) return res.status(401).json("Unauthorized"); 
    next();
  };
  module.exports = {
    checkJWT,
    checkLogin,
    checkPermission
};