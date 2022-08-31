const { check } = require('express-validator')
module.exports = [
    check('username').matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/),
    check('email').isEmail(),
    check('password').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
    check('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            return false;
        }

        return true;
    }),

]