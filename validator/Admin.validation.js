const{check}=require('express-validator')
module.exports=[
    check('username').matches(/(?=^.{3,20}$)^[a-zA-Z][a-zA-Z0-9]*[._-]?[a-zA-Z0-9]+$/),
    check('email').isEmail(),
    check('password').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/),
    check('confirmPassword').custom((value,{req})=>{
        if(value!==req.body.password){
            return false
        }
        return true
    })
]