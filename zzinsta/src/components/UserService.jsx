
import axios from 'axios'


export default class UserService {

    
    static async loginUser(login, pwd){
        try {
            const url = 'http://'+process.env.REACT_APP_BACK+':'+process.env.REACT_APP_PORTBACK+'/login';
            console.log(url);
            let res = await axios.post(url, {
                "mail": login,
                "password": pwd
            });

            if (res.status=200){
                return {
                    token:res.data.token,
                    username:res.data.username,
                    userId:res.data.user
                }
            }
            else return res.statusText

          } catch (err) {
              return err;
          }
    }

    
    static async registerUser(login, pwd, username){
            try {
                const url = 'http://'+process.env.REACT_APP_BACK+':'+process.env.REACT_APP_PORTBACK+'/users';
                console.log(url);
                let res = await axios.post(url, {
                    "mail": login,
                    "username": username,
                    "password": pwd
                });
                console.log(res);
    
                if (res.status=200){
                    return true;
                }
                else {
                    return res.message;

                }
    
              } catch (err) {
                return err;
              }            
    }

}