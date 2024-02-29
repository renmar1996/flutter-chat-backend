
const { response } = require('express');
const JWT= require('jsonwebtoken');

const validarJWT= (req,res=response,next)=>{
    const token= req.header('Authorization');
    if(!token){
       return res.status(401).json({
            ok:false,
            msg:'No hay token en la petición',
        }); 
    }
    try {
        ///Validar el token con JWT
        const {uuid}= JWT.verify(token,process.env.JWT_KEY);
        req.uuid=uuid;
        next();
    } catch (error) {
       return res.status(400).json({
            ok:false,
            msg:'Token no válido'
        });
    }

}

module.exports={
    validarJWT
}
