import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import "./authecss.css"
import axios from "axios";
import {Link,} from "react-router-dom"

function Authen(props) {

    const [loading, setLoading] = useState(false);
    const [username, setuserame] = useState("");
    const [password, setpassword] = useState("");
    const [text, setText] = useState("");
    const navigate = useNavigate();

    function Login() {
        setLoading(true);
        axios.post("https://human1moment.herokuapp.com/user/login/", {username:username, password:password}).then((response)=>{
            console.log(response.data.data.role);
            if (response.data.status === 'success'){
                localStorage.setItem("token", response.data.data.token);
                if (response.data.data.role === "user"){
                    navigate("/section");
                    setLoading(false)
                }else if (response.data.data.role === "admin"){
                    navigate("/shoping");
                    setLoading(false)
                }
                }
            if (response.data.status === "fail"){
                setLoading(false);
                alert("Ro'yhatdan o'tmagansiz")
                }
            console.log(response.data.status)
        }).catch((error)=>{
          if (error.response.status === 500){
              alert("Vaqtincha server bilan ulanishta hatolik")
          }
        })
    }

    return (
        <>
            {loading && ( <div className="container1">
                <div className="ml-left">
                    <div className="dash uno"></div>
                    <div className="dash dos"></div>
                    <div className="dash tres"></div>
                    <div className="dash cuatro"></div>
                </div>
            </div>)}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-5 offset-sm-4">

                        <img className="img-logo" src="image/poytaxt-dent-logo 1.png" alt="Logo"/>
                        <h3>{setText}</h3>
                        <div className="log-in">

                            <label className="mt-5" htmlFor="UserName">UserName</label>
                            <input onChange={(e)=>setuserame(e.target.value)} placeholder="UserName" className="mt-2 input-auth form-control" type="text"/>
                            <div>
                                <label className="mt-4" htmlFor="Password">Password</label>
                                <input onChange={(e)=>setpassword(e.target.value)} placeholder="Password" className="mt-1 input-auth form-control" type="password"/>
                            </div>
                            <button onClick={Login} className="btn input-auth mt-4 form-control btn-success">Enter</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Authen;