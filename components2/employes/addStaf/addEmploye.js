import React, {useState} from 'react';
import {Layout, Menu} from "antd";
import "./addstaf.css"

import {Table} from "reactstrap";
import {
    SearchOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const { Header, Content, Footer, Sider } = Layout;

function AddEmploye(props) {

      const navigate = useNavigate();
      const [loading, setLoading] = useState(false);

    function handleInputChanges(event) {
        let files = event.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);

        reader.onload = (e) => {
            setUser({
                ...user,
                profile_image: e.target.result
            });
            console.log(e.target.result);
        }
    }

    function addUser() {
        setLoading(true)
        axios.post("https://human1moment.herokuapp.com/user/registration/", user).then((response)=>{
               console.log(response.data);
            if (response.data.status === "success"){
                navigate("/staff");
                setLoading(false)
            }
            else if (response.data.status === "fail"){
                alert("Malumot qo'shishda hatolik");
                setLoading(false)
            }
        })
    }

    const [user, setUser] = useState({first_name:"", last_name:"", username:"", password:"", email:"", role:"",profile_image:""});



    return (
        <>
            {loading && (<div className="loaderP">
                <div className="loader-in">
                    <p className="loader-texts">L</p>
                    <p className="loader-texts">o</p>
                    <p className="loader-texts">a</p>
                    <p className="loader-texts">d</p>
                    <p className="loader-texts">i</p>
                    <p className="loader-texts">n</p>
                    <p className="loader-texts">g</p>
                </div>
            </div>)}
            <Layout hasSider>
                <Sider style={{overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0,}}>
                    <div className="logo">
                        CRM Poytaxt Dent
                    </div>
                    <Menu  className="forMenu"  mode="inline">
                        <Menu.Item className="justify-between" key="2">
                            <img src="/image/Vector (33).png" alt=""/>
                            <Link className="menuText" to="/shoping">
                                Do’kon
                            </Link>
                        </Menu.Item>
                        <Menu.Item className="justify-between" key="3">
                            <img src="/iconimg/Vector (35).png" alt=""/>
                            <Link className="menuText" to="/vrachebniy">
                                Sklad
                            </Link>
                        </Menu.Item>
                        <Menu.Item className="justify-between" key="4">
                            <img src="/iconimg/Vector (36).png" alt=""/>
                            <Link className="menuText" to="/monthly">
                                Oylik
                            </Link>
                        </Menu.Item>
                        <Menu.Item className="justify-between" key="5">
                            <img src="/iconimg/Vector (37).png" alt=""/>
                            <Link className="menuText" to="/cost">
                                Xarajat
                            </Link>
                        </Menu.Item>
                        <Menu.Item className="justify-between" key="6">
                            <img src="/iconimg/Group 33555.png" alt=""/>
                            <Link className="menuText" to="/exchangeProduct">
                                Barter tavarlar
                            </Link>
                        </Menu.Item>
                        <Menu.Item className="justify-between" key="7">
                            <img src="/iconimg/Vector (38).png" alt=""/>
                            <Link className="menuText" to="/">
                                Sotilgan tavarlar
                            </Link>
                        </Menu.Item>
                        <Menu.Item className="justify-between" key="8">
                            <img src="/imaged/Vector.png" alt=""/>
                            <Link className="menuText" to="/staff">
                                Xodimlar
                            </Link>
                        </Menu.Item>
                        <Menu.Item className="justify-between" key="9">
                            <img src="/imaged/Vector.png" alt=""/>
                            <Link className="menuText" to="/keramik">
                                Klent
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout" style={{ marginLeft: 200 }}>
                    <Content className="site-layout-background" style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        <div className="all-rigth-menu">
                            <div className="for-right-menu">
                                <div>
                                    <Link className="d-flex for-menu-rigth" to="/staff">
                                        <img className="img-shop" src="/image/Vector (33).png" alt=""/>
                                        <p className="for-right-menu-text">
                                           Hodimlar
                                        </p>
                                    </Link>
                                </div>
                            </div>
                            <div className="addShoping">
                                <PlusCircleOutlined />
                                Qoshish
                            </div>
                        </div>
                        <div className="for-Page">
                            Hodim qo'shish
                        </div>
                       <div className="addAmploye">

                          <div className="d-flex">
                              <div className="right-input-add">
                                  <div>
                                      <label htmlFor="" className="mt-1 fontsFor">Ismi</label>
                                      <input onChange={(e)=>setUser({...user, first_name: e.target.value})} placeholder="Ismi" className="form-control" type="text"/>
                                  </div>
                                  <div>
                                      <label htmlFor="" className="mt-4 fontsFor">Familiyasi</label>
                                      <input onChange={(e)=>setUser({...user, last_name: e.target.value})} placeholder="Familiyasi" className="form-control" type="text"/>
                                  </div>
                                  <div>
                                      <label htmlFor="" className="mt-4 fontsFor">Foydalanuvchi nomi</label>
                                      <input onChange={(e)=>setUser({...user, username: e.target.value})} placeholder="Foydalanuvchi nomi" className="form-control " type="text"/>
                                  </div>
                                  <div>
                                      <label htmlFor="" className="mt-4 fontsFor">Paroli</label>
                                      <input onChange={(e)=>setUser({...user, password: e.target.value})} placeholder="Paroli" className="form-control " type="password"/>
                                  </div>
                              </div>
                              <div className="left-input-add">
                                  <div>
                                      <label htmlFor="" className="mt-4 fontsFor">E-mail</label>
                                      <input onChange={(e)=>setUser({...user, email: e.target.value})} placeholder="E-mail" className="form-control " type="text"/>
                                  </div>
                                  <div>
                                      <label htmlFor=""className="mt-4 fontsFor">Profil rasmi</label>
                                      <input onChange={handleInputChanges} placeholder="Profil rasmi" className="form-control" type="file"/>
                                  </div>
                                  <div>
                                      <label htmlFor="" className="mt-4 fontsFor">Lavozimi</label>
                                      <select onClick={(e)=>setUser({...user, role: e.target.value})} className="form-select" name="role">
                                          <option value="admin">Admin</option>
                                          <option value="director_deputy">Direktor o'rinbosar</option>
                                          <option value="workers">Ishchi</option>
                                          <option value="director">Direktor</option>
                                      </select>
                                  </div>
                                 <div className="d-flex justify-content-between">
                                     <Link to="/staff">
                                         <button className="form-control mt-5 btn-danger btn-danger btn-danger1">
                                             Bekor qilish
                                         </button>
                                     </Link>
                                     <button onClick={addUser} className="form-control mt-5 btn-success btn-success1">
                                         Qo'shish
                                     </button>
                                 </div>
                              </div>
                          </div>
                       </div>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
}

export default AddEmploye;