import React, {useEffect, useState} from 'react';
import {Layout, Menu} from "antd";
import {Link, useNavigate, useParams} from "react-router-dom";
import {
    SearchOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons';
import axios from "axios";

const {Header, Content, Footer, Sider} = Layout;
function AddLiteyshi(props) {

    const {id} = useParams();
    const navigate=useNavigate();

    function addClentUserL() {
        if ( id && id!== 'add'){
            axios.put(`https://human1moment.herokuapp.com/api/client/${id}/`, addCL ,{
                headers:{
                    "Authorization":localStorage.getItem("token")
                }
            }).then((response)=>{
                console.log(response.data.data);
                setAddCL(response.data.data);
                navigate('/liteshik')
            })
        }
        else{
            axios.post('https://human1moment.herokuapp.com/api/client/', addCL ,{
                headers:{
                    "Authorization":localStorage.getItem("token")
                }
            }).then((response)=>{
                if (response.data.status === "success"){
                    navigate('/liteshik')
                }
                else {
                    alert("malumotlar qoshild hatolik")
                }

                console.log(response.data)
            }).catch((error)=>{
                console.log(error.response)
            })
        }
    }

    const [addCL, setAddCL] = useState(
        {
            first_name:"",
            last_name:"",
            phone_number:"",
            address:"",
            context:"",
            job_type:"Liteyshik"
        });


    useEffect(() => {
        getClentUserL()
    }, []);

    function getClentUserL() {
        axios.get("https://human1moment.herokuapp.com/api/client/?job_type=Liteyshik").then((response) => {
            response.data.data.forEach((item, index) => {
                if (item.id == id) {
                    setAddCL(item)
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
                    <Menu  className="forMenu" mode="inline">
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
                <Layout className="site-layout" style={{marginLeft: 200}}>
                    <Content className="site-layout-background" style={{margin: '24px 16px 0', overflow: 'initial'}}>
                        <div className="all-rigth-menu">
                            <div className="for-right-menu">
                                <div>
                                    <Link className="d-flex for-menu-rigth" to="/keramik">
                                        <img  className="img-shop" src="/imaged/Vector.png" alt=""/>
                                        <p className="for-right-menu-text">
                                            Klent
                                        </p>
                                    </Link>
                                </div>
                                <div>
                                    <Link className="d-flex for-menu-rigth" to="/keramik">
                                        <p className="for-right-menu-text">
                                            Keramik
                                        </p>
                                    </Link>
                                </div>
                                <div>
                                    <Link className="d-flex for-menu-rigth" to="/protez">
                                        <p  className="for-right-menu-text">
                                            Protezchi
                                        </p>
                                    </Link>
                                </div>
                                <div>
                                    <Link className="d-flex for-menu-rigth" to="/syomnik">
                                        <p  className="for-right-menu-text">
                                            Siyomnik
                                        </p>
                                    </Link>
                                </div>
                                <div>
                                    <Link className="d-flex for-menu-rigth" to="/vrachK">
                                        <p  className="for-right-menu-text">
                                            Virach
                                        </p>
                                    </Link>
                                </div>
                                <div>
                                    <Link className="d-flex for-menu-rigth" to="/liteshik">
                                        <p  className="for-right-menu-text">
                                            Liteyshik
                                        </p>
                                    </Link>
                                </div>
                            </div>
                            <Link to="/liteshik/add">
                                <div className="addShoping">
                                    <PlusCircleOutlined/>
                                    Qoshish
                                </div>
                            </Link>
                        </div>
                        <div className="for-Page">
                           Liteyshik
                        </div>
                        <div className="for-table-white d-flex">
                            <div>
                                <div className="for-Page-in">
                                    Klent qo'shish
                                </div>
                                <div className="add-input">
                                    <div>
                                        <label htmlFor="" className="mt-4 fontsFor">Ismi</label>
                                        <input value={addCL.first_name} onChange={(e)=>setAddCL({...addCL, first_name: e.target.value})} placeholder="Ismi" className=" all-input-out-line form-control "  type="text"/>
                                    </div>
                                    <div>
                                        <label htmlFor="" className="mt-4 fontsFor">Familiyasi</label>
                                        <input value={addCL.last_name} onChange={(e)=>setAddCL({...addCL, last_name: e.target.value})} placeholder="Familiyasi" className=" all-input-out-line form-control" type="text"/>
                                    </div>
                                    <div>
                                        <label htmlFor="" className="mt-4 fontsFor">Telefon raqami</label>
                                        <input value={addCL.phone_number} onChange={(e)=>setAddCL({...addCL, phone_number: e.target.value})} placeholder="Telefon raqami" className=" all-input-out-line form-control" type="text"/>
                                    </div>
                                    <div>
                                        <label htmlFor="" className="mt-4 fontsFor">Adres</label>
                                        <input value={addCL.address} onChange={(e)=>setAddCL({...addCL, address: e.target.value})} placeholder="Adres" className=" all-input-out-line form-control" type="text"/>
                                    </div>
                                </div>
                            </div>
                            <div className="add-button">
                                <div>
                                    <label htmlFor="" className="mt-5 fontsFor">Izox...</label>
                                    <textarea value={addCL.context} onChange={(e)=>setAddCL({...addCL, context: e.target.value})} placeholder="Izox..." className="form-control  all-input-out-line form-control" name="context" id="" cols="30" rows="10"/>
                                </div>
                                <button onClick={addClentUserL} className="mt-5 btn-success all-input-out-line   form-control">
                                    {id!== 'add' ? "Yangilash" : " Qo'shish"}
                                </button>

                                <Link to="/liteshik">
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

export default AddLiteyshi;