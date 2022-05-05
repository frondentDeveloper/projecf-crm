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

function Addtexnichis(props) {

    const {id} = useParams();
    const navigate=useNavigate();
    const [loading, setLoading] = useState(false)
    const [adProduct, setAddProduct] = useState({
        name: "",
        product_image: "",
        price: "",
        count: "",
        total: "0",
        category: "texnoichisiy"
    });

    function handleInputChange(event) {
        let files = event.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);

        reader.onload = (e) => {
            setAddProduct({
                ...adProduct,
                product_image: e.target.result
            });
            console.log(e.target.result);
        }
    }

    function adProductadd() {
        if (id&& id!=='add'){
            setLoading(true);
            axios.put(`https://human1moment.herokuapp.com/api/product/${id}/`, adProduct, {
                headers:{
                    "Authorization":localStorage.getItem("token")
                }
            }).then((response)=>{
                console.log(response.data);
                if (response.data.status === "success"){
                    console.log(response.data);
                    setLoading(false)
                    navigate('/texnichistkiy')
                }
                else {
                    alert("Malumot yangilashda hato. Iltimos tekshirib qaytadan qo'shing");
                    setLoading(false)
                }
            }).catch((err)=>{
                console.log(err)
            })
        }
        else {
            setLoading(true);
            axios.post("https://human1moment.herokuapp.com/api/product/", adProduct, {
                headers:{
                    "Authorization":localStorage.getItem("token")
                }
            }).then((response)=>{
                console.log(response.data);
                if (response.data.status === "success"){
                    console.log(response.data);
                    setLoading(false);
                    navigate('/texnichistkiy')
                }
                else {
                    alert("Malumot qo'shishda hato. Iltimos tekshirib qaytadan qo'shing")
setLoading(false)
                }
            }).catch((error)=>{
                console.log(error)
            })
        }
    }

    useEffect(()=>{
        getItems()
    },[]);

    function getItems() {
        axios.get("https://human1moment.herokuapp.com/api/product/?category=texnoichisiy").then((response)=>{
            response.data.data.map((item, index)=>{
                if (item.id == id){
                    setAddProduct(item);
                }
            })
        })
    }



    return (
        <>
            {loading && ( <div className="loaderP">
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
                    <Menu className="forMenu"  mode="inline" >
                        <Menu.Item className="justify-between" key="3">
                            <img src="/iconimg/Vector (35).png" alt=""/>
                            <Link className="menuText" to="/vrachebniy">
                                Sklad
                            </Link>
                        </Menu.Item>
                        <Menu.Item className="justify-between" key="7">
                            <img src="/iconimg/Vector (38).png" alt=""/>
                            <Link className="menuText" to="/costsel2">
                                Sotilgan tavarlar
                            </Link>
                        </Menu.Item>
                        <Menu.Item className="justify-between" key="9">
                            <img src="/imaged/Vector.png" alt=""/>
                            <Link className="menuText" to="/keramikSect2">
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
                                    <Link className="d-flex for-menu-rigth" to="/addVracheniy22">
                                        <img className="img-shop" src="/iconimg/Vector (35).png" alt=""/>
                                        <p className="for-right-menu-text">
                                            Sklad
                                        </p>
                                    </Link>
                                </div>
                                <div>
                                    <Link className="d-flex for-menu-rigth" to="/addVracheniy22">
                                        <p className="for-right-menu-text">
                                            Virachebniy
                                        </p>
                                    </Link>
                                </div>
                                <div>
                                    <Link className="d-flex for-menu-rigth" to="/texnichistKiy=user=1">
                                        <p  className="for-right-menu-text">
                                            Texnichiskiy
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="for-Page">
                            texnichistkiy
                        </div>
                        <div className="for-table-white d-flex">
                            <div>
                                <div className="for-Page-in">
                                    Malumot qo'shish
                                </div>
                                <div className="add-input">
                                    <div>
                                        <label className="mt-4 fontsFor" htmlFor="">Mahsulot nomi</label>
                                        <input onChange={(e)=>setAddProduct({...adProduct, name:e.target.value})} placeholder="Mahsulot nomi" className=" all-input-out-line form-control" value={adProduct.name}  type="text"/>
                                    </div>
                                    <div>
                                        <label className="mt-4 fontsFor" htmlFor="">Narxi</label>
                                        <input  onChange={(e)=>setAddProduct({...adProduct, price:e.target.value})}  placeholder="Narxi" className=" all-input-out-line form-control" value={adProduct.price} type="text"/>
                                    </div>
                                    <div>
                                        <label className="mt-4 fontsFor" htmlFor="">Soni</label>
                                        <input  onChange={(e)=>setAddProduct({...adProduct, count: e.target.value})} placeholder="Soni" className=" all-input-out-line form-control" value={adProduct.count} type="text"/>
                                    </div>
                                </div>
                            </div>
                            <div className="add-button">
                                <div>
                                    <label className="mt-5 fontsFor" htmlFor="">Rasm tanlash</label>
                                    <input  onChange={handleInputChange} className="form-control all-input-out-line" type="file"/>
                                </div>
                                <button onClick={adProductadd} className="mt-5 btn-success all-input-out-line   form-control">
                                    {id!== 'add' ? "Yangilash" : "Qo'shish"}
                                </button>
                                <Link to="/texnichistKiy=user=1">
                                    <button className="mt-5 btn-danger all-input-out-line   form-control">
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

export default Addtexnichis;