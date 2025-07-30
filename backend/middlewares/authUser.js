import jwt from "jsonwebtoken"


const authUser=async(req,res,next)=>{
  try {
    const {token}=req.headers
    if(!token){
      return res.json({success:false,message: 'not Authorised Login Again'})
    }
    const token_decode=jwt.verify(token,process.env.JWT_SECRET)

    // req.body.userId =token_decode.id


    req.userId = token_decode.id;
    
    // Initialize req.body if it's undefined
    req.body = req.body || {};
    
    // Also add to body if you need it there (though attaching to req is better)
    req.body.userId = token_decode.id;
   
    next()

  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
  }
}
export default authUser