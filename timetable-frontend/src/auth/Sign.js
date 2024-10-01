import React from 'react'
import "./Sign.css"
import {FaEyeSlash,FaEye} from 'react-icons/fa'
import {Link,useHistory} from 'react-router-dom'
import {useState,useEffect} from 'react'
import swal from 'sweetalert';

function Sign() {
   const [username,setusername] = useState("")
   const [password,setpassword] = useState("")
   const [isValid, setIsValid] = useState(false);
   // show password
   const [state,setstate] = useState(false);
   const toggle = () => {
      setstate(prevState => !prevState);
   }
  

   const history = useHistory();
   useEffect(()=> {
      if (localStorage.getItem('user_login'))
      {
         history.push("/faculty")
      }
   }, [])
   
   
   const signin = async (event)=> {
      event.preventDefault();
      const formData = new FormData();
      formData.append("UserName",username)
      formData.append("Password",password)
      // let item = {username,password}
      let result = await fetch('http://127.0.0.1:8000/api/login',{
         method:'POST',
         // headers:{
         //    "Content-type":"application/json",
         //    "Accept":"application/json"
         // },
      body:formData
      
      });
      
      result = await result.json();
      
      
      if(result.response==="LoggedIn")
      {
         if(result.role==0)
         {
         localStorage.setItem('user_login',JSON.stringify(result.id));
         history.push("/faculty")
         }
         else{
            swal({
               title: "Ops!",
               text: "Access Denied!",
               icon: "warning",
               button: "ok!",
             });
         }
        
      }
      else
      {
         setIsValid(true);
      }
      
   }
  
   return (
      <>
         
          <div className="full_container">
          {isValid 
              ? < div class="alert alert-danger" role="alert">
              Login failed wrong user credentials
               </div>:""}
         <div className="container">
        
            <div className="center verticle_center full_height">
            <div className="heading text-center">
               <h3>Automatic TimeTable Generator</h3>
            </div>
               <div className="login_section">
                  <div className="logo_login">
                     <div className="text-light text-center">
                        <h1>Login</h1>
                     </div>
                  </div>
                  <div className="login_form ">
                     <form onSubmit={signin}>
                        <fieldset>
                           <div className="field ">
                              <input type="text" name="username" placeholder="Username" 
                                 onChange={(e)=>setusername(e.target.value)}
                              />
                           </div>
                           <div class="field">
                              <input type={state?"text":"password"} name="password" placeholder="Password" 
                                 onChange={(e)=>setpassword(e.target.value)}
                              />
                              <span className="showpass" onClick={toggle}>
                                 {state?<FaEye />:<FaEyeSlash />}
                              </span>
                           </div>
                           <div class="field">
                              <a className="forgot" href="">Forgotten Password?</a>
                           </div>
                           <div className="field margin_0">
                              <input type="submit" value="login" className="btn"/>
                           </div>
                        </fieldset>
                     </form>
                  </div>
               </div>
                <p className="h5 text-center ">New User? <Link to="/register">Register</Link> | <Link to="/login"> Admin</Link></p>
            </div>
         </div>
      </div>
      </>
    )
}

export default Sign
