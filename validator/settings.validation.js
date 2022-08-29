const{check}=require('express-validator')
module.exports=[
    check('password').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/),
    check('repass').custom((value,{req})=>{
        if(value!==req.body.newpass){
            return false
        }
        return true
    })
]