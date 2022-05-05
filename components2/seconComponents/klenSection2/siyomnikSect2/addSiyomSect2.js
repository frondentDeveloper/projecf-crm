import React, {useState, useEffect} from 'react';
import {Layout, Menu} from "antd";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {
    SearchOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons';


const { Header, Content, Footer, Sider } = Layout;

function SyomnikAdd(props) {

    const {id}= useParams()
    const navigate=useNavigate();
    const [loading, setLoading] = useState(false);
    const [addCS, setAddCS] = useState(
        {
            first_name:"",
            last_name:"",
            phone_number:"",
            address:"",
            context:"",
            job_type:"Siyomnichi"
        });

    function addClentUserS() {
        if (id && id!=='add'){
            axios.put(`https://human1moment.herokuapp.com/api/client/${id}/`, addCS,{
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            }).then((response)=>{
                if (response.data.status === "success") {
                    setAddCS(response.data.data);
                    navigate('/syomnik')
                } else {
                    alert("malumotlar yangilashda hatolik")
                }
            })
        }else {
            axios.post('https://human1moment.herokuapp.com/api/client/', addCS, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            }).then((response) => {
                if (response.data.status === "success") {
                    navigate('/syomnik')
                } else {
                    alert("malumotlar qoshishda hatolik")
                }
                console.log(response.data.data);
            }).catch((error) => {
                console.log(error.response)
            })
        }
    }


    useEffect(()=>{
        getClentUserS()
    }, []);

    function getClentUserS() {
        axios.get("https://human1moment.herokuapp.com/api/client/?job_type=Siyomnichi").then((response) => {
            response.data.data.map((item,index)=>{
                if (item.id == id) {
                    setAddCS(item);
                }
            })
        })}


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
                    <Menu  className="forMenu" mode="inline">
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
                <Layout className="site-layout" style={{marginLeft: 200}}>
                    <Content className="site-layout-background" style={{margin: '24px 16px 0', overflow: 'initial'}}>
                        <div className="all-rigth-menu">
                            <div className="for-right-menu">
                                <div>
                                    <Link className="d-flex for-menu-rigth" to="/keramikSect2">
                                        <img className="img-shop" src="/imaged/Vector.png" alt=""/>
                                        <p className="for-right-menu-text">
                                            Klent
                                        </p>
                                    </Link>
                                </div>
                                <div>
                                    <Link className="d-flex for-menu-rigth" to="/keramikSect2">
                                        <p className="for-right-menu-text">
                                            Keramik
                                        </p>
                                    </Link>
                                </div>
                                <div>
                                    <Link className="d-flex for-menu-rigth" to="/protezS=2">
                                        <p  className="for-right-menu-text">
                                            Protezchi
                                        </p>
                                    </Link>
                                </div>
                                <div>
                                    <Link className="d-flex for-menu-rigth" to="/sectSiy=2">
                                        <p  className="for-right-menu-text">
                                            Siyomnik
                                        </p>
                                    </Link>
                                </div>
                                <div>
                                    <Link className="d-flex for-menu-rigth" to="/seCtVrac2">
                                        <p  className="for-right-menu-text">
                                            Virach
                                        </p>
                                    </Link>
                                </div>
                                <div>
                                    <Link className="d-flex for-menu-rigth" to="/sectLitey2">
                                        <p  className="for-right-menu-text">
                                            Liteyshik
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="for-Page">
                            Siyomnik
                        </div>
                        <div className="for-table-white d-flex">
                            <div>
                                <div className="for-Page-in">
                                    Klent qo'shish
                                </div>
                                <div className="add-input">
                                    <div>
                                        <label htmlFor="" className="mt-4 fontsFor">Ismi</label>
                                        <input value={addCS.first_name} onChange={(e)=>setAddCS({...addCS, first_name: e.target.value})} placeholder="Ismi" className=" all-input-out-line form-control"  type="text"/>
                                    </div>
                                    <div>
                                        <label htmlFor="" className="mt-4 fontsFor">Familiyasi</label>
                                        <input value={addCS.last_name} onChange={(e)=>setAddCS({...addCS, last_name: e.target.value})} placeholder="Familiyasi" className=" all-input-out-line form-control" type="text"/>
                                    </div>
                                    <div>
                                        <label htmlFor="" className="mt-4 fontsFor">Telefon raqami</label>
                                        <input value={addCS.phone_number} onChange={(e)=>setAddCS({...addCS, phone_number: e.target.value})} placeholder="Telefon raqami" className=" all-input-out-line form-control" type="text"/>
                                    </div>
                                    <div>
                                        <label htmlFor="" className="mt-4 fontsFor">Adres</label>
                                        <input value={addCS.address} onChange={(e)=>setAddCS({...addCS, address: e.target.value})} placeholder="Adres" className=" all-input-out-line form-control" type="text"/>
                                    </div>
                                </div>
                            </div>
                            <div className="add-button">
                                <div>
                                    <label htmlFor="" className="mt-5 fontsFor">Izox...</label>
                                    <textarea value={addCS.context} onChange={(e)=>setAddCS({...addCS, context: e.target.value})} placeholder="Izox..." className="form-control  all-input-out-line form-control" name="context" id="" cols="30" rows="10"/>
                                </div>
                                <button onClick={addClentUserS} className="mt-5 btn-success all-input-out-line   form-control">
                                    {id!=='add' ? "Yangilash" : " Qo'shish"}
                                </button>

                                <Link to="/sectSiy=2">
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

export default SyomnikAdd;