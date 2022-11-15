/**
 * Created by AyushK on 18/09/20.
 */
import * as ValidationManger from "../middleware/validation";
import Manager from "../app/modules/content";
import {stringConstants} from "../app/common/constants";
import {JwtVerify} from '../middleware/jwtVerify'
const passport = require('passport')
module.exports = (app) => {
    app.get('/', (req, res) => res.send(stringConstants.SERVICE_STATUS_HTML));

    //api for user profile 
    app.post('/register',ValidationManger.validateUserRegister,new Manager().RegisterUser)
    app.post('/login',ValidationManger.validateUserLogin,new Manager().LoginUser) 
    app.get('/get-user',JwtVerify,new Manager().GetUser) 
    app.put('/update-user',JwtVerify,new Manager().UpdateUser)

    //api for post
    app.post ('/createpost',new Manager().CreatePost)
    app.get('/getpostbyuser',new Manager().GetPost)
    app.put('/updatepost',new Manager().UpdatePost)
    app.put('/likedpost',new Manager().LikedPost)
    app.put('/commentpost',new Manager().commentPost)
    app.delete('/deletepost',new Manager().DeletePost)
    app.put('/sharepost',new Manager().SharePost)
    app.get('/searchkey',new Manager().SearchPost)

    //google authentication 
    app.get('/google', passport.authenticate('google', { scope: ['profile','email'] }))

    app.get(
        '/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/' }),
        (req, res) => {
          res.send("login sucessfully")
        }
      )


    // app.get("/test-route", ValidationManger.validateUserLogin, new TestModule().testRoute);
};
