import React, {useState, useEffect} from 'react';
import {Layout, Menu} from "antd";
import {Link, useNavigate, useParams} from "react-router-dom";
import {
    SearchOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons';
import axios from "axios";
const { Header, Content, Footer, Sider } = Layout;

function AddCost(props) {
    const {id} =useParams();
    const navigate = useNavigate();

    function addCost() {
       if (id&& id!=='add'){
           axios.put(`https://human1moment.herokuapp.com/api/extraexpense/${id}/`,costs,{
               headers: {
                   "Authorization": localStorage.getItem("token")
               }
           }).then((response)=>{
               console.log(response.data);
               setCosts(response.data);
               if (response.data.status === "success") {
                   navigate('/cost')
               } else {
                   alert("malumotlar qoshild hatolik")
               }
           })
       }else {
           axios.post("https://human1moment.herokuapp.com/api/extraexpense/", costs, {
               headers: {
                   "Authorization": localStorage.getItem("token")
               }
           }).then((response)=>{
               console.log(response.data);
               if (response.data.status === "success") {
                   navigate('/cost')
               } else {
                   alert("malumotlar qoshild hatolik")
               }
           }).catch((error)=>{
               console.log(error.response)
           })
       }
    }

    const [costs, setCosts] = useState({name:"", price:""});

    useEffect(()=>{
        getCostP()
    }, []);

    function getCostP() {
        axios.get("https://human1moment.herokuapp.com/api/extraexpense/").then((response)=>{
            response.data.map((item,index)=>{
                if (item.id == id){
                    setCosts(item)
                    console.log(item)
                }
            })
        })
    }


    return (
        <>
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
                            <Link className="menuText" to="/sellProduct">
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
                                    <Link className="d-flex for-menu-rigth" to="/cost">
                                        <img className="img-shop" src="/iconimg/Vector (37).png" alt=""/>
                                        <p className="for-right-menu-text">
                                            Xarajat
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
                            Xarajat
                        </div>
                        <div className="addAmploye">
                            <div className="d-flex">
                                <div className="right-input-add">
                                    <div>
                                        <label htmlFor="" className="mt-1 fontsFor">Nomi</label>
                                        <input value={costs.name} onChange={(e)=>setCosts({...costs, name: e.target.value})} placeholder="Nomi" className="form-control " type="text"/>
                                    </div>
                                    <div>
                                        <label htmlFor="" className="mt-4 fontsFor">Qancha to'langan</label>
                                        <input value={costs.price} onChange={(e)=>setCosts({...costs, price: e.target.value})}  placeholder="Qancha to'langan" className="form-control " type="text"/>
                                    </div>

                                </div>
                                <div className="left-input-add">
                                    <div className=" justify-content-between">
                                        <button onClick={addCost} className="form-control mt-5 btn-success">
                                            {id!=='add' ? "Yangilash" : " Qo'shish"}
                                        </button>
                                        <Link to="/cost">
                                            <button className="form-control mt-5 btn-danger">
                                                Bekor qilish
                                            </button>
                                        </Link>
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

export default AddCost;