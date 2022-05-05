import React, {useState, useEffect} from 'react';
import {Layout, Menu} from "antd";
import {Link} from "react-router-dom";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import {
    SearchOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons';
import axios from "axios";
const { Header, Content, Footer, Sider } = Layout;

function Cost(props) {

   useEffect(()=>{
      getCostP()
   }, []);

   function getCostP() {
       setLoading(true)
       axios.get("https://human1moment.herokuapp.com/api/extraexpense/").then((response)=>{
           console.log(response.data);
           setGetCost(response.data);
           setLoading(false)
       })
   }

   function updateCost (id){
       axios.put(`https://human1moment.herokuapp.com/api/extraexpense/${id}/`, getCost).then((reaponse)=>{
           getCostP()
           console.log(reaponse.data)
       }).catch((err)=>{console.log(err.response)})
   }

   function deleItem(id) {
       axios.delete(`https://human1moment.herokuapp.com/api/extraexpense/${id}/`).then((response)=>{
        getCostP();
           console.log(response.data)
           setModal(false)
       }).catch((err)=>{console.log(err.response)})

   }

    const toggle = (item) => {
        setCurrentItemD(item.id);
        setModal(!modal)
    };

    const [currentItemD, setCurrentItemD] = useState({});
    const [modal, setModal] = React.useState(false);
    const [getCost, setGetCost] = useState([]);
    const [loading, setLoading] = useState(false);


    const [searcgTerm, setsearchTerm] = useState("")

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
                    <Menu  className="forMenu"  mode="inline" >
                        <Menu.Item className="justify-between" key="2">
                            <img src="image/Vector (33).png" alt=""/>
                            <Link className="menuText" to="/shoping">
                                Do’kon
                            </Link>
                        </Menu.Item>
                        <Menu.Item className="justify-between" key="3">
                            <img src="iconimg/Vector (35).png" alt=""/>
                            <Link className="menuText" to="/vrachebniy">
                                Sklad
                            </Link>
                        </Menu.Item>
                        <Menu.Item className="justify-between" key="4">
                            <img src="iconimg/Vector (36).png" alt=""/>
                            <Link className="menuText" to="/monthly">
                                Oylik
                            </Link>
                        </Menu.Item>
                        <Menu.Item className="justify-between" key="5">
                            <img src="iconimg/Vector (37).png" alt=""/>
                            <Link className="menuText" to="/cost">
                                Xarajat
                            </Link>
                        </Menu.Item>
                        <Menu.Item className="justify-between" key="6">
                            <img src="iconimg/Group 33555.png" alt=""/>
                            <Link className="menuText" to="/exchangeProduct">
                                Barter tavarlar
                            </Link>
                        </Menu.Item>
                        <Menu.Item className="justify-between" key="7">
                            <img src="iconimg/Vector (38).png" alt=""/>
                            <Link className="menuText" to="/sellProduct">
                                Sotilgan tavarlar
                            </Link>
                        </Menu.Item>
                        <Menu.Item className="justify-between" key="8">
                            <img src="imaged/Vector.png" alt=""/>
                            <Link className="menuText" to="/staff">
                                Xodimlar
                            </Link>
                        </Menu.Item>
                        <Menu.Item className="justify-between" key="9">
                            <img src="imaged/Vector.png" alt=""/>
                            <Link className="menuText" to="/keramik">
                                Klent
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout" style={{ marginLeft: 200 }}>
                    <Content className="site-layout-background" style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        <div className="forSearch">
                            <div className="d-flex">
                                <input onChange={event => {setsearchTerm(event.target.value)}} placeholder="Search" className="inputSearch" type="text"/>
                                <div className="for-img-search">
                                    <SearchOutlined />
                                </div>
                            </div>
                        </div>
                        <div className="all-rigth-menu">
                            <div className="for-right-menu">
                                <div>
                                    <Link className="d-flex for-menu-rigth" to="/cost">
                                        <img className="img-shop" src="iconimg/Vector (37).png" alt=""/>

                                        <p className="for-right-menu-text">
                                            Xarajat
                                        </p>
                                    </Link>
                                </div>

                            </div>
                            <Link to="/cost/add">
                                <div className="addShoping">
                                    <PlusCircleOutlined />
                                    Qoshish
                                </div>
                            </Link>
                        </div>
                        <div className="for-Page">
                            Xarajatlar
                        </div>
                        <div className="for-table">
                            <Table bordered hover>
                                <thead className="header-table">
                                <tr>
                                    <th>TR</th>
                                    <th>Nomi</th>
                                    <th>Sumasi</th>
                                    <th>To’langan sana</th>
                                    <th>Option</th>
                                </tr>
                                </thead>
                                {
                                    getCost.length ? (   <tbody className="body-table">
                                    {
                                        getCost && getCost.filter((value => {
                                            if (searcgTerm === ""){
                                                return value
                                            }else if (value.name.toLowerCase().includes(searcgTerm.toLowerCase())){
                                                return value
                                            }
                                        })).map((item, index)=>(
                                            <tr key={index}>
                                                <td>{++index}</td>
                                                <td>{item.name}</td>
                                                <td>{item.price}$</td>
                                                <td>{item.created_at.substring(0, 10)}</td>
                                                <td>
                                                    <div className="d-flex">
                                                        <p>
                                                            <div style={{
                                                                display: 'block', width: 50,
                                                            }}>
                                                                <img onClick={() => toggle(item)} className="dlete"
                                                                     src="imaged/Delete.png" alt=""/>
                                                            </div>
                                                        </p>
                                                        <Link to={`/cost/${item.id}/`}>
                                                            <img className="edite" src="imaged/Edit.png" alt=""/>
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>) : (<div className="border-0">
                                        <div>
                                            <img className="img-folder" src="iconimg/empty folder icon.png" alt=""/>
                                            <b className="img-folder1">Malumotlar yo'q</b>
                                        </div>
                                    </div>)
                                }

                            </Table>
                        </div>
                    </Content>
                </Layout>
                <Modal isOpen={modal} toggle={toggle}><ModalHeader toggle={toggle}>Malumot o'chirish</ModalHeader>
                    <ModalBody>
                        <div className="paddingt">
                            Haqiqatdan ham malumotni o'chirishni hohlaysizmi
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => deleItem(currentItemD)} color="primary">Ok</Button>
                    </ModalFooter>
                </Modal>
            </Layout>
        </>
    );
}

export default Cost;