import React, {useState, useEffect} from 'react';
import {Layout, Menu} from "antd";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Table} from "reactstrap";
import {
    SearchOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons';
import axios from "axios";
const { Header, Content, Footer, Sider } = Layout;

function AddShop(props) {

    const [addShop, setAddShop] = useState({name:"", user_director:"", created_at:""});
    const [loading, setLoading] = useState(false);
    const navigate=useNavigate();
    const {id} = useParams;

function addShops() {
    setLoading(true);
    axios.post("https://human1moment.herokuapp.com/api/shop/", addShop, {
        headers: {
            "Authorization": localStorage.getItem("token")
        }
    }).then((response)=>{
        if (response.data.status === "success"){
            navigate("/shoping");
            setLoading(false)
        }
        else {
            alert("malumotlar qo'shishda hatolik")
            setLoading(false)
        }
        console.log(response.data.data)
    }).catch((error)=>{
        console.log(error.response);
        if (error.response.status === 500){
            alert("Serverda hato");
            console.log(error.response);
            setLoading(false)
        }
    })}
    
    
    
   // if (id&& id!== "add"){
   //     setLoading(true);
   //     axios.put(`https://human1moment.herokuapp.com/api/shop/${id}/`,addShop, {
   //         headers: {
   //             "Authorization": localStorage.getItem("token")
   //         }
   //     }).then((response)=>{
   //         console.log(response);
   //         if (response.data.status === "success"){
   //             navigate("/shoping");
   //             setLoading(false)
   //         } else {
   //             alert("Malumotlar yangilanishda hatolik")
   //         }
   //
   //     }).catch((error)=>{
   //         if (error.response.status === 500){
   //             alert("Serverda hato");
   //             console.log(error.response);
   //             setLoading(false)
   //         }
   //     })
   // }else {
   //   
   // }



useEffect(()=>{
    axios.get('https://human1moment.herokuapp.com/api/director/').then((response)=>{
        console.log(response.data);
        setGetSelect(response.data.data)
    }).catch((error)=>{
        if (error.response.status >= 500){
            alert(error.message)
            setLoading(false)
        }
        })
}, []);



    useEffect(()=>{
        geting()
    },[]);

    function geting() {
        axios.get("https://human1moment.herokuapp.com/api/shop/").then((response)=>{
           response.data.map((item, index)=>{
               if (item.id == id){
                   setAddShop(item);
                   console.log(item);
               }
           })
        })
    }


const [getselect, setGetSelect] = useState([]);

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
                    <Menu className="forMenu"  mode="inline">

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
                                    <Link className="d-flex for-menu-rigth" to="/shoping">
                                        <img className="img-shop" src="/image/Vector (33).png" alt=""/>
                                        <p className="for-right-menu-text">
                                            Do'kon
                                        </p>
                                    </Link>
                                </div>
                            </div>
                            <div className="addShoping">
                                <PlusCircleOutlined />
                                Qoshish
                            </div>
                        </div>
                        <div className="for-table d-flex">
                            <div>
                                <div className="for-Page-in">
                                    Malumot qo'shish
                                </div>
                                <div className="add-input">
                                    <div>
                                        <label htmlFor="" className="mt-4 fontsFor">Do'kon nomi</label>
                                        <input className=" all-input-out-line form-control" onChange={(e)=>setAddShop({...addShop, name: e.target.value})} value={addShop.name} placeholder="Dokon nomi" className=" all-input-out-line form-control" type="text"/>
                                    </div>
                                    <div>
                                        <label htmlFor="" className="mt-4 fontsFor">Direktor tanlash</label>
                                        <select className=" all-input-out-line form-control" onClick={(e)=>setAddShop({...addShop, user_director:+e.target.value})} name="" id="">
                                            {
                                                getselect && getselect.map((item ,index)=>(
                                                    <option key={index} value={item.id}>{item.first_name + " "} {item.last_name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="add-button">

                                <button onClick={addShops} className="mt-5-top btn-success all-input-out-line   form-control">
                                    {/*{console.log(id)}*/}
                                    {/*{id!== "add" ? "Yangilash" : "Qo'shish"}*/}
                                    Qo'shish
                                </button>
                                <Link to="/shoping">
                                    <button className="mt-5-top2 btn-danger all-input-out-line   form-control">
                                        Bekor qilish
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </Content>

                </Layout>
            </Layout>
        </>
    );
}

export default AddShop;