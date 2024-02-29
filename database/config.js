const mongoose = require('mongoose');


const dbConnection=async()=> {
try {
    //console.log('init db config');
    await mongoose.connect(process.env.DB_CNN,{
        //useNewUrlParser:true,
        //useUnifiedTopology:true,
        //useCreateIndex:true,
    });
    console.log('DB Online');
} catch (error) {
    console.log(error);
   // throw Error('error en la base de datos');
}
}
module.exports= {
    dbConnection
}