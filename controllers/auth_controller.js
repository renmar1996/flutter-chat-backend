const {response}= require('express');
const { validationResult } = require('express-validator');
const Usuario = require('../models/usuario');
const bcrypt= require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const crearUsuario= async (req,res=response)=>{
    const {email,password}= req.body;
    try {
        const existeEmail=  await Usuario.findOne({email})

        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg:'El correo ya está registrado'
            });
        }

        const usuario=new Usuario(req.body);
        ///Encryptar contraseña usando bcryptjs
        const solt=bcrypt.genSaltSync();
        usuario.password=bcrypt.hashSync(password,solt);
        ///////////////////////////////////////////////
        await usuario.save();
     
        ////Generar JWT
        const token= await generarJWT(usuario.id);
        ///////////////
         res.json({
             ok:true,
             msg:usuario,
             token,
         }); 
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el admin'
        });
    }

    
}

const login= async(req,res=response)=>{
    const {email,password}= req.body;
try {
    

    const usuarioDB=await Usuario.findOne({email});
    
    if(!usuarioDB){
        return res.status(400).json({
            ok:false,
            msg:'Email no encontrado'
        });
    }
    const validarPassword= bcrypt.compareSync(password,usuarioDB.password);
    
    if(!validarPassword){
       return res.status(400).json({
            ok:false,
            msg:'La contraseña no es válida'
        });
    }

    const token=await generarJWT(usuarioDB._id);
    res.json({
        ok:true,
        usuario:usuarioDB,
        token,
    }); 
} catch (error) {
    console.log(error);
    res.status(500).json({
        ok:false,
        msg:'Hable con el admin'
    });
}
}

const tokenRenew= async(req,res=response)=>{

    const {uuid}= req.uuid;
    try {
    const token=await generarJWT(uuid);
    const usuario =  await Usuario.findOne(uuid);
    return res.json({
        ok:true,
        msg:'Token válido',
        usuario: usuario,
        token
    });
} catch (error) {
    console.log(error);
    res.json({
        ok:false,
        msg:'Hable con el admin',
        body:req._id,
    });
}

}


module.exports={
    crearUsuario,login,tokenRenew
};