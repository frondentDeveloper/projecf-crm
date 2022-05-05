import React, {useState, useEffect} from 'react';
import {Layout, Menu} from "antd";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {
    SearchOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons';
import {
    Button, Modal, ModalFooter,
    ModalHeader, ModalBody
} from "reactstrap"

const { Header, Content, Footer, Sider } = Layout;

function AddProtez(props) {



    const {id} = useParams();
    const navigate=useNavigate();
    const [loading, setLoading] = useState(false);
    const [addCP, setAddCP] = useState(
        {
            first_name:"",
            last_name:"",
            phone_number:"",
            address:"",
            context:"",
            job_type:"Pratezchi"
        });

    function addClentUserP() {
        if (id && id!== 'add'){
            function UpdetaItem(id) {
                axios.put(`https://human1moment.herokuapp.com/api/client/$id/`, addCP).then(response => {
                    console.log(response.data.data);
                    if (response.data.status === "success"){
                        navigate('/protez')
                    }
                    else {
                        alert("malumotlar qoshild hatolik")
                    }
                });
            }
        }else {
            axios.post('https://human1moment.herokuapp.com/api/client/', addCP ,{
                headers:{
                    "Authorization":localStorage.getItem("token")
                }
            }).then((response)=>{
                if (response.data.status === "success"){
                    navigate('/protez')
                }
                else {
                    alert("malumotlar qoshild hatolik")
                }
                console.log(response.data.data);
            }).catch((error)=>{
                console.log(error.response)
            })
        }
    }

    useEffect(()=>{
        getClentUser()
    }, []);

    function getClentUser() {
        axios.get("https://human1moment.herokuapp.com/api/client/?job_type=Pratezchi").then((response)=>{
            response.data.data.map((item, index)=>{
                if (item.id == id){
                    setAddCP(item)
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
                            Protezchi
                        </div>
                        <div className="for-table-white d-flex">
                            <div>
                                <div className="for-Page-in">
                                    Klent qo'shish
                                </div>
                                <div className="add-input">
                                    <div>
                                        <label htmlFor="" className="mt-4 fontsFor">Ismi</label>
                                        <input value={addCP.first_name} onChange={(e)=>setAddCP({...addCP, first_name: e.target.value})} placeholder="Ismi" className=" all-input-out-line form-control"  type="text"/>
                                    </div>
                                    <div>
                                        <label htmlFor="" className="mt-4 fontsFor">Familiyasi</label>
                                        <input value={addCP.last_name} onChange={(e)=>setAddCP({...addCP, last_name: e.target.value})} placeholder="Familiyasi" className=" all-input-out-line form-control" type="text"/>
                                    </div>
                                    <div>
                                        <label htmlFor="" className="mt-4 fontsFor">Telefon raqami</label>
                                        <input value={addCP.phone_number} onChange={(e)=>setAddCP({...addCP, phone_number: e.target.value})} placeholder="Telefon raqami" className=" all-input-out-line form-control" type="text"/>
                                    </div>
                                    <div>
                                        <label htmlFor="" className="mt-4 fontsFor">Adres</label>
                                        <input value={addCP.address} onChange={(e)=>setAddCP({...addCP, address: e.target.value})} placeholder="Adres" className=" all-input-out-line form-control" type="text"/>
                                    </div>
                                </div>
                            </div>
                            <div className="add-button">
                                <div>
                                    <label htmlFor="" className="mt-5 fontsFor">Izox...</label>
                                    <textarea value={addCP.context} onChange={(e)=>setAddCP({...addCP, context: e.target.value})} placeholder="Izox..." className="form-control  all-input-out-line form-control" name="context" id="" cols="30" rows="10"/>
                                </div>
                                <button onClick={addClentUserP} className="mt-5 btn-success all-input-out-line   form-control">
                                    {id!== 'add' ? "Yangilash" : " Qo'shish"}
                                </button>

                                <Link to="/protezS=2">
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

export default AddProtez;