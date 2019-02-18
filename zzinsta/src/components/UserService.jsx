
import axios from 'axios'


export default class UserService {

    
    static async loginUser(login, pwd){
        const BACK = "localhost";
        const PORTBACK="5000";
        try {
            const url = 'http://'+BACK+':'+PORTBACK+'/login';
            let res = await axios.post(url, {
                "mail": login,
                "password": pwd
            });

            if (res.data.success){
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
        const BACK = "localhost";
        const PORTBACK="5000";
            try {
                const url = 'http://'+BACK+':'+PORTBACK+'/users';
                let res = await axios.post(url, {
                    "mail": login,
                    "username": username,
                    "password": pwd
                });
    
                if (res.data.success){
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