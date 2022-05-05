import React, {useEffect, useState} from 'react';
import {Layout, Menu} from "antd";
import {Link} from "react-router-dom";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import {
    SearchOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons';

import axios from "axios";
const { Header, Content, Footer, Sider } = Layout;
function Liteshik(props) {

    useEffect(()=>{
        getClentUser()
    }, []);

    function getClentUser() {
        setLoading(true);
        axios.get("https://human1moment.herokuapp.com/api/client/?job_type=Liteyshik").then((response)=>{
            setGetClentsL(response.data.data);
            setLoading(false)
            console.log(response.data)
        })
    }
    const [getClentsL, setGetClentsL] = useState([]);
    const [modal, setModal] = React.useState(false);
    const [modals, setModalS] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const [currentItem, setCurrentItem] = useState({});
    const [currentItemD, setCurrentItemD] = useState({});

    const toggle = (item) => {
        setCurrentItemD(item.id);
        setModal(!modal)
    };

    const toggles = (item) => {
        setCurrentItem(item);
        setModalS(!modals);
    };


    function dleteItem(id, e) {
        setLoading(true);
        axios.delete(`https://human1moment.herokuapp.com/api/client/${id}`).then((response)=>{
            getClentUser();
            setModalS(false);
            console.log(response.data)
            setModal(false)
        }).catch((error)=>{
            console.log(error.response)
        })
    }


    function UpdetaItem(id) {
        axios.put(`https://human1moment.herokuapp.com/api/client/$id/`, getClentsL).then(response => {
            console.log(response.data.data);
            getClentUser()
        });
    }

    const [searchTerm, setSearchTerm] = useState("")

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
                            <Link to="/sectLitey2/add">
                                <div className="addShoping">
                                    <PlusCircleOutlined />
                                    Qoshish
                                </div>
                            </Link>
                        </div>
                        <div className="for-Page">
                            Liteyshik
                        </div>
                        <div className="for-table">
                            <Table bordered hover>
                                <thead className="header-table">
                                <tr>
                                    <td>TR</td>
                                    <td>Ism familiya</td>
                                    <td>Address</td>
                                    <td>Telifon raqam</td>
                                    <td>Klent turi</td>
                                    <td>Izoh</td>
                                    <td>O’chirish</td>
                                </tr>
                                </thead>
                                {getClentsL.length ? (   <tbody className="body-table">
                                {
                                    getClentsL && getClentsL.filter((value => {
                                        if (searchTerm === ""){
                                            return value
                                        }else if (value.first_name.toLowerCase().includes(searchTerm.toLowerCase())){
                                            return value
                                        }
                                    })).map((item, index)=>(
                                        <tr>
                                            <td>{++index}</td>
                                            <td>{item.first_name+" "} {item.last_name}</td>
                                            <td>{item.address}</td>
                                            <td>{item.phone_number} </td>
                                            <td>{item.job_type} </td>
                                            <td>
                                                <div style={{
                                                    display: 'block', width: 100,
                                                }}>
                                                    <Button color="danger" onClick={() => toggles(item)}>Izox</Button>
                                                </div>
                                            </td>
                                            <td><div className="d-flex">
                                                <p>
                                                    <div style={{
                                                        display: 'block', width: 50,
                                                    }}>
                                                        <img onClick={() => toggle(item)} className="dlete"
                                                             src="imaged/Delete.png" alt=""/>
                                                    </div>
                                                </p>
                                                <Link to={`/liteshik/${item.id}`}>
                                                    <img className="edite" src="imaged/Edit.png" alt=""/>
                                                </Link>
                                            </div>
                                            </td>
                                        </tr>
                                    ))
                                }
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
                <Modal isOpen={modals} toggle={toggles}><ModalHeader toggle={toggles}>Klent haqida izox</ModalHeader>
                    <ModalBody>
                        <div className="paddingt">
                            {currentItem.context}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={toggles}>Okay</Button>
                    </ModalFooter>
                </Modal>


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

export default Liteshik;