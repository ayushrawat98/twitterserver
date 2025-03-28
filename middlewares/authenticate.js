import jwt from 'jsonwebtoken'

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.status(401).send({message:'Login to use'})
  
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).json({message:err})
  
      req.user = user
  
      next()
    })
  }
  
export default authenticateToken