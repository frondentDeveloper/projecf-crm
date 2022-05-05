import React, {useEffect, useState} from 'react';
import {Layout, Menu} from "antd";
import {Link, useNavigate, useParams} from "react-router-dom";
import {
    SearchOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons';
import axios from "axios";
const { Header, Content, Footer, Sider } = Layout;

function AddMonthly(props) {
    const [month, setMonth] = useState([]);
    const navigate = useNavigate;
    const id = useParams();

    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        axios.get("https://human1moment.herokuapp.com/user/worker/").then((response)=>{
            console.log(response.data);
            setMonth(response.data.data)
        });
    },[]);


    function addMonthSalary() {
        axios.post("https://human1moment.herokuapp.com/api/salary/", addSalary).then((response)=>{
            console.log(response.data.status);
            if (response.data.status === "success"){
               alert("Malumotlar qo'shildi")
                navigate('/monthly')
            }else {
                alert("Malumotlar qoshishda hatolik iltimos tekshirib qaytadan harakat qilib koring")
            }
        }).catch((error)=>{
            console.log(error.message)
        })


     // if (id&& id!== 'add'){
     //     axios.put(`https://human1moment.herokuapp.com/api/salary/${id}/`,addSalary,{
     //         headers:{
     //             "Authorization":localStorage.getItem("token")
     //         }
     //     }).then((response)=>{
     //         if (response.data.status === "success"){
     //             console.log(response.data.status);
     //             navigate('/monthly')
     //         }else {
     //             alert("Malumotlar qo'shishda hatolik")
     //         }
     //     })
     // }else {
     //
     // }
    }
    const [addSalary, setAddSalary] = useState({ user:"",  avans:"", bonus:"", staff_salary:"", updated_at:""});


    useEffect(()=>{
        getmonth()
    },[]);

    function getmonth() {
        axios.get("https://human1moment.herokuapp.com/api/salary/").then((response)=>{
             response.data.map((item,index)=>{
                 if (item.id == id){
                     setAddSalary(item);
                     console.log(response.data)
                 }
             })
        })
    }

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
                                    <Link className="d-flex for-menu-rigth" to="/monthly">
                                        <img className="img-shop" src="/iconimg/Vector (36).png" alt=""/>
                                        <p className="for-right-menu-text">
                                            Oylik
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
                            Oylik qo'shish
                        </div>
                        <div className="addAmploye">

                            <div className="d-flex">
                                <div className="right-input-add">
                                    <div>
                                        <label htmlFor="" className="fontsFor mt-4">Avans</label>
                                        <input  onChange={(e)=>setAddSalary({...addSalary, avans:e.target.value})} value={addSalary.avans}  placeholder="Avans" className="form-control " type="text"/>
                                    </div>
                                    <div>
                                        <label htmlFor="" className="fontsFor mt-4">Bonus</label>
                                        <input  onChange={(e)=>setAddSalary({...addSalary,bonus: e.target.value})} value={addSalary.bonus} placeholder="Bonus" className="form-control " type="text"/>
                                    </div>
                                    <div>
                                        <label htmlFor="" className="fontsFor mt-4">Oylik</label>
                                    </div>
                                    <input onChange={(e)=>setAddSalary({...addSalary, staff_salary: e.target.value})} value={addSalary.staff_salary}  placeholder="Oylik" className="form-control " type="text"/>
                                </div>
                                <div className="left-input-add">
                                    <div>
                                        <label htmlFor="" className="fontsFor mt-5">Hodim tanlash</label>
                                        <select onClick={(e)=>setAddSalary({...addSalary, user: e.target.value})} className="form-select" name="role" >
                                            {
                                                month && month.map((item, index)=>(
                                                        <option key={index}  value={item.id}>
                                                            {item.last_name+" "}{" "+item.first_name}
                                                        </option>
                                                    )
                                                )
                                            }
                                        </select>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                       <Link to="/monthly">
                                           <button className="form-control mt-5 btn-danger btn-danger btn-danger1">
                                               Bekor qilish
                                           </button>
                                       </Link>
                                        <button onClick={addMonthSalary} className="form-control mt-5 btn-success btn-success1">
                                            {/*/!*{console.log(id)}*!/*/}
                                            {/*{id!=="add" ? "Yangilash" : " Qo'shish"}*/}
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

export default AddMonthly;