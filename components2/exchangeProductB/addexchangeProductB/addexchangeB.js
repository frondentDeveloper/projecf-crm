import React, {useEffect, useState} from 'react';
import {Layout, Menu} from "antd";
import {Link, useNavigate} from "react-router-dom";
import {
    SearchOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons';
import axios from "axios";

const { Header, Content, Footer, Sider } = Layout;
function AddexchangeB(props) {



    useEffect(()=>{
        getproduct();
        getwhom()
    }, []);

    function getproduct() {
        axios.get("https://human1moment.herokuapp.com/api/product/").then((response)=>{
            console.log(response.data);
            setGetSel(response.data.data)
        })
    }


    const [getsel, setGetSel] = useState([]);
    const [whom, setWhom] = useState([]);
    const navigate = useNavigate();

    function getwhom() {
        axios.get("https://human1moment.herokuapp.com/api/client/").then((response)=>{
            console.log(response.data);
            setWhom(response.data.data)
        })
    }


    function addName() {
        axios.post("https://human1moment.herokuapp.com/api/exchangeproduct/", push).then((response)=>{
            console.log(response.data)
            if (response.data.status === "success"){
                navigate('/exchangeProduct=2')
            } else {
                alert("Malumotlar qo'shishda hatolik iltimos tekshirib qaytadan harakat qilib ko'ring")
            }
        })
    }

    const [push, setPush]= useState({size:"", price:"", by_user:"", count:"", product:"",active:"give", total:0});




    return (
        <>
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
                            <img src="/iconimg/Vector (40).png" alt=""/>
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
                                    <Link className="d-flex for-menu-rigth" to="/exchangeProduct=2">
                                        <img className="img-shop" src="/iconimg/Group 33555.png" alt=""/>
                                        <p className="for-right-menu-text">
                                            Berilgan tavarlar
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
                            Mahsulot qo'shish
                        </div>
                        <div className="addAmploye">
                            <div className="d-flex">
                                <div className="right-input-add">
                                    <div>
                                        <label htmlFor="" className="mt-1 fontsFor">Klent</label>
                                        <select  onClick={(e)=>setPush({...push, by_user: e.target.value})} className="form-select " name="" id="">
                                            {
                                                whom && whom.map((item, index)=>(
                                                    <option key={index} value={item.id}>
                                                        {item.first_name}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="" className="mt-4 fontsFor">O’lchov birligi</label>
                                        <input onChange={(e)=>setPush({...push, size: e.target.value})} placeholder="O’lchov birligi" className="form-control" type="text"/>
                                    </div>
                                    <div>
                                        <label htmlFor="" className="mt-4 fontsFor">Mahsulot nomi</label>
                                        <select onClick={(e)=>setPush({...push, product:e.target.value})} className="form-select" name="" id="">
                                            {
                                                getsel && getsel.map((item, index)=>(
                                                    <option key={index} value={item.id}>
                                                        {item.name}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="left-input-add">
                                    <div>
                                        <label htmlFor="" className="mt-4 fontsFor">Dona narxi</label>
                                        <input onChange={(e)=>setPush({...push, price: e.target.value})} placeholder="Dona narxi" className="form-control " type="text"/>
                                    </div>
                                    <div>
                                        <label htmlFor="" className="mt-4 fontsFor">Umumiy soni</label>
                                        <input onChange={(e)=>setPush({...push, count: e.target.value})} placeholder="Umumiy soni" className="form-control" type="text"/>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <button onClick={addName}  className="form-control mt-5 btn-success btn-success1">
                                            Qo'shish
                                        </button>
                                        <Link to="/exchangeProduct=2">
                                            <button className="form-control mt-5 btn-danger btn-danger btn-danger1">
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

export default AddexchangeB;