import React, {useEffect, useState} from 'react';
import {Layout, Menu} from "antd";
import {Link, useNavigate} from "react-router-dom";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";

import {
    SearchOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons';
import axios from "axios";
const { Header, Content, Footer, Sider } = Layout;

function Vrachebniy(props) {

    const navigate = useNavigate();

    const [vrachebniy, setVrachebniy] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = React.useState(false);

    useEffect(()=>{
        getItems()
    },[]);

    function getItems(){
        setLoading(true);
        axios.get("https://human1moment.herokuapp.com/api/product?category=vrachobniy").then((response)=>{
            console.log(response.data);
            setVrachebniy(response.data.data);
            setLoading(false)
        })
    }

    function UpdetaItem(id) {
        axios.put(`https://human1moment.herokuapp.com/api/product/${id}/`, vrachebniy).then(response => {
            console.log(response.data);
            getItems()
        });
    }


    function dleteItem(id) {
        axios.delete(`https://human1moment.herokuapp.com/api/product/${id}`).then((response)=>{
            getItems();
            setModal(false)
        })
    }

    const [currentItemD, setCurrentItemD] = useState({});

    const toggle = (item) => {
        setCurrentItemD(item.id);
        setModal(!modal)
    };

    const [searchterm, setSearchTerm] = useState("");

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
                        <Menu.Item className="justify-between" key="3">
                            <img src="iconimg/Vector (35).png" alt=""/>
                            <Link className="menuText" to="/addVracheniy22">
                                Sklad
                            </Link>
                        </Menu.Item>
                        <Menu.Item className="justify-between" key="7">
                            <img src="iconimg/Vector (38).png" alt=""/>
                            <Link className="menuText" to="/costsel2">
                                Sotilgan tavarlar
                            </Link>
                        </Menu.Item>
                        <Menu.Item className="justify-between" key="9">
                            <img src="imaged/Vector.png" alt=""/>
                            <Link className="menuText" to="/keramikSect2">
                                Klent
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout" style={{ marginLeft: 200 }}>
                    <Content className="site-layout-background" style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        <div className="forSearch">
                            <div className="d-flex">
                                <input onChange={event => setSearchTerm(event.target.value)} placeholder="Search" className="inputSearch" type="text"/>
                                <div className="for-img-search">
                                    <SearchOutlined />
                                </div>
                            </div>
                        </div>
                        <div className="all-rigth-menu">
                            <div className="for-right-menu">
                                <div>
                                    <Link className="d-flex for-menu-rigth" to="/addVracheniy22">
                                        <img className="img-shop" src="iconimg/Vector (35).png" alt=""/>
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
                            <Link to="/addVracheniy22/add">
                                <div className="addShoping">
                                    <PlusCircleOutlined />
                                    Qoshish
                                </div>
                            </Link>
                        </div>
                        <div className="for-Page">
                            Virachebniy
                        </div>
                        <div className="for-table">
                            <Table bordered hover>
                                <thead className="header-table">
                                <tr>
                                    <th>TR</th>
                                    <th>Maxsulot nomi</th>
                                    <th>Narxi</th>
                                    <th>Soni</th>
                                    <th>Jami sumasi</th>
                                    <th>Kelgan sana</th>
                                    <th>Rasmi</th>
                                    <th>O’chirish</th>
                                </tr>
                                </thead>
                                {vrachebniy.length ? (  <tbody className="body-table">
                                {vrachebniy && vrachebniy.filter(value => {
                                    if (searchterm === ""){
                                        return value
                                    }else if (value.name.toLowerCase().includes(searchterm.toLowerCase())){
                                      return value
                                    }
                                }).map((item, index)=>(
                                    <tr key={index}>
                                        <th>{++index}</th>
                                        <td>{item.name}</td>
                                        <td>{item.price}$</td>
                                        <td>{item.count}</td>
                                        <td>{item.total}$</td>
                                        <td>{item.created_at.substring(0,10)}</td>
                                        <td><img className="img-call-back" src={item.product_image} alt=""/></td>
                                        <td>
                                            <div className="d-flex">

                                                <p>
                                                    <div style={{display: 'block', width: 50,}}>
                                                        <img onClick={() => toggle(item)} className="dlete" src="imaged/Delete.png" alt=""/>
                                                    </div>
                                                </p>

                                                <Link to={`/addVracheniy22/${item.id}`}>
                                                    <img className="edite" src="imaged/Edit.png" alt=""/>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                </tbody>):(<div className="border-0">
                                    <div>
                                        <img className="img-folder" src="iconimg/empty folder icon.png" alt=""/>
                                        <b className="img-folder1">Malumotlar yo'q</b>
                                    </div>
                                </div>)}

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
                        <Button onClick={() => dleteItem(currentItemD)} color="primary">Ok</Button>
                    </ModalFooter>
                </Modal>
            </Layout>
        </>
    );
}

export default Vrachebniy;