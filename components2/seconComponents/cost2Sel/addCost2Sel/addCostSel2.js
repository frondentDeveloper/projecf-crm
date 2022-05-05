import React, {useState, useEffect} from 'react';
import {Layout, Menu} from "antd";
import {Link, useNavigate, useParams} from "react-router-dom";
import {
    SearchOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons';
import axios from "axios";
import data from "bootstrap/js/src/dom/data";

const {Header, Content, Footer, Sider} = Layout;

function AddSels(props) {

    const [getSelName, setGetSelName] = useState([]);
    const {id} = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        axios.get('https://human1moment.herokuapp.com/api/product/').then((response)=>{
            console.log(response.data);
            setGetSelName(response.data.data)
        })
    }, []);

    useEffect(()=>{
        axios.get('https://human1moment.herokuapp.com/api/client/').then(res=>{
            console.log(res.data)
            setGetclent(res.data.data)
        })
    },[]);

    const [getClent, setGetclent] = useState([])

    function addPostSell() {
        if (id&& id!=='add'){
            axios.put(`https://human1moment.herokuapp.com/api/realproduct/${id}/`, postName, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            }).then(response => {
                console.log(response.data.data);
                if (response.data.status === "success"){
                    console.log(response.data);
                    navigate('/sellProduct')
                }else {
                    alert("malumotlar yangilashda hatolik iltimos tekshirib qaytadan harakat qilib ko'ring")
                }
            }).catch((err)=>{
                console.log(err.response)
            });
        }
        else {
            axios.post("https://human1moment.herokuapp.com/api/realproduct/", postName).then((response)=>{
                console.log(response.data);
                if (response.data.status === "success") {
                    navigate('/sellProduct')
                }
                else if (response.data.error === "none"){
                    alert("Mahsulot yetarli emas")
                }
                else {
                    alert("malumotlar qo'shishda hatolik iltimos tekshirib qaytadan harakat qilib ko'ring")
                }
            }).catch((error)=>{
                console.log(error.response);
                if (error === "none"){
                    alert("Mahsulot yetarli emas")
                }
                else if (error.response === 500){
                    alert("Serverda Hatolik")
                }
            })
        }
    }


    const [postName, setPostName] = useState({
        product_id:[],
        price:"",
        count:""});

    useEffect(() => {
        getselprod()
    }, []);

    function getselprod() {
        axios.get("https://human1moment.herokuapp.com/api/realproduct/").then((response)=>{
            response.data.map((item, index)=>{
                if (item.id== id){
                    setGetSelName(response.data);
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
                    <Menu  className="forMenu"  mode="inline">
                        <Menu.Item className="justify-between" key="3">
                            <img src="/iconimg/Vector (35).png" alt=""/>
                            <Link className="menuText" to="/addVracheniy22">
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
                        <div className="forSearch">

                        </div>
                        <div className="all-rigth-menu">
                            <div className="for-right-menu">
                                <div>
                                    <Link className="d-flex for-menu-rigth" to="/costsel2">
                                        <img className="img-shop" src="/iconimg/Vector (38).png" alt=""/>
                                        <p className="for-right-menu-text">
                                            Sotilgan tavarlar
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="for-Page">
                            Tavar sotish
                        </div>
                        <div className="addAmploye">

                            <div className="d-flex">
                                <div className="right-input-add">
                                    <div>
                                        <label htmlFor="" className="fontsFor mt-1">Narxi</label>
                                        <input  onChange={(e)=>setPostName({...postName, price: +e.target.value})} value={postName.price} placeholder="Narxi" className="form-control" type="text"/>
                                    </div>
                                    <div>
                                        <label htmlFor="" className="mt-4 fontsFor">Soni</label>
                                        <input  onChange={(e)=>setPostName({...postName, count: +e.target.value})} value={postName.count} placeholder="Soni" className="form-control " type="text"/>
                                    </div>
                                    <div>
                                        <label htmlFor="" className="mt-4 fontsFor">Klent tanlash</label>
                                        <select onChange={(e)=>setPostName({...postName, full_name: e.target.value})} className="form-select" name="" id="">
                                            {getClent.map((item, index)=>(
                                                <option key={index} value={item.id}>{item.first_name+" "}{item.last_name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="left-input-add">
                                    <div>
                                        <label htmlFor="" className="mt-4 fontsFor">mahsulot tanlash</label>
                                        <select onClick={(e)=>setPostName({...postName, product_id:+e.target.value})}  className="form-select" name="" id="">
                                            {
                                                getSelName && getSelName.map((item, index)=>(
                                                    <option key={index} value={item.id}>
                                                        {item.name}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                       <Link to="/costsel2">
                                           <button  className="form-control mt-5 btn-danger btn-danger btn-danger1">
                                               Bekor qilish
                                           </button>
                                       </Link>
                                        <button onClick={addPostSell} className="form-control mt-5 btn-success btn-success1">
                                            {id!=='add' ? "Yangilash" : " Qo'shish"}
                                            {console.log(id)}
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

export default AddSels;