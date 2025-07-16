var jwt = require('jsonwebtoken');

module.exports = {
    createJWT,
    getExpiry,
    verifyJWT
}

//signs a new JWT with the payload. use a secret key in the env file. it is called when user logs in, to generate a token 
function createJWT(payload) {
    return jwt.sign(
        // data payload
        payload ,
        process.env.SECRET, // key (assymetric or symmetric)
        { expiresIn: "24h" }
      );
}

//decode the token, extract the expiry time. returns the expiry timestamp
function getExpiry(token) {
    const payloadBase64 = token.split('.')[1];
    const decodedJson = Buffer.from(payloadBase64, 'base64').toString();
    const decoded = JSON.parse(decodedJson)
    const exp = decoded.exp;
    return exp
}
//verifies the token using secret key
//returns the decoded payload if valid
//returns null if verification fails (e.g., invalid or expired token).
function verifyJWT(token) {
    try{
        const decoded = jwt.verify(token, process.env.SECRET);
        return decoded;
    } catch (err) {
console.error("JWT verification failed:", err.message);
return null;

    }


   
}