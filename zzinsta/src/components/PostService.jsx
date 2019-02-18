
import axios from 'axios'



export default class PostService {


    static async createPost(Post){

        const BACK = "localhost";
        const PORTBACK="5000";

        const access_token = localStorage.getItem("token");
        const userId = localStorage.getItem("UserId");
          try {
              const url = 'http://'+BACK+':'+PORTBACK+'/posts';
            let res = await axios.post(url, {
              "title": Post.title,
              "description": Post.description,
              "img": Post.img,
              "user": userId,
            }, {
                headers: {
                  Authorization: access_token,
                  'content-type': 'application/json',
                  'Content-Type': 'multipart/form-data'
                }
            });
            if (res.status=200){
              return true;
            }
            else{
                return false;
            }
              
          } catch (err) {
            console.error(err);
            return err
          }
        }

        
  static async loadPosts(UserId){
    const BACK = "localhost";
    const PORTBACK="5000";

    try {
        console.log(UserId)
      const access_token = localStorage.getItem("token");
      if (access_token!=null) {
        let options;
        if (UserId!=null){
            const url = 'http://'+BACK+':'+PORTBACK+'/posts/user';            
          options = {
            method: "get",
            headers: {
              Authorization: access_token,
              "Content-Type": "application/json"
            },
            url: url,
            data: {
            },
            params: {
              per_page: 20,
              userId: UserId,
            }
          };
        }
        else{
            const url = 'http://'+BACK+':'+PORTBACK+'/posts';
          options = {
            method: "get",
            headers: {
              Authorization: access_token,
              "Content-Type": "application/json"
            },
            url: url,
            data:{
            },
            params: {
              per_page: 20
            }
          };
        }
      let res = await axios(options);
      return res.data.app ;
    }
    } catch (err) {
        return false;
    }
  }

  

  static async deletePost(postId){
    const BACK = "localhost";
    const PORTBACK="5000";

    const access_token = localStorage.getItem("token");
    if (access_token!=null){
      try {
        const url = 'http://'+BACK+':'+PORTBACK+'/posts/delete';
        let res = await axios.post(url, {
          "postId": postId,
        }, {
            headers: {
              Authorization: access_token,
              'content-type': 'application/json',
            }
        });
        console.log(res);
        if (res.status==200){
          return true;
        }
        else return false;
          
      } catch (err) {
        console.error(err);
        return err;
      }
    }
  }
}