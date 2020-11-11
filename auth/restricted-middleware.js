const jwt = require ('jsonwebtoken');

const {jwtSecret} = require ('./secrets.js')


module.exports = (req, res, next) => {
  // add code here to verify users are logged in
  const token = req.headers.authorization;
  if (!token){
    return res.status(401).json({message: 'we want token'});
  }
//two things to verify 
  jwt.verify(token, jwtSecret, (err,decoded)=>{//node style function that takes a bunch of argurments including callback that handles the results of the verification 
    if(err){
      console.log('decoded error ->', err)
      return res.status(401).json({message: 'bad token'});
    }
    console.log('decoded token ->', decoded);
    req.decodedJwt=decoded;
    next();
  }) ;
};
