const{ Schema,model}=require('mongoose');

const UsuarioSchema= Schema({
    nombre:{
        type:String,
        required:true,
    },
    email:{
        type: String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    online:{
     type:Boolean,
     default:false,
    }
});
    //// Metodo de mongoose para modificar los valores de respuesta del json
    UsuarioSchema.method('toJSON',function(){
        const {__v,_id,password,...object}=this.toObject();
        object.uuid=_id;
        return object;
    });
/////////

module.exports=model('Usuario',UsuarioSchema);