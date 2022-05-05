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

function ExchabgeproductB(props) {


    function dleteItem(id) {
        setLoading(true);
        axios.delete(`https://human1moment.herokuapp.com/api/exchangeproduct/${id}/`,{
            headers:{
                "Authorization":localStorage.getItem("token")
            }
        }).then((response) => {
            getex();
            console.log(response.data);
            setModal(false)
        }).catch((error) => {
            console.log(error.response)
        })
    }

    const toggle = (item) => {
        setCurrentItemD(item.id);
        setModal(!modal)
    };
    const [modal, setModal] = React.useState(false);
    const [currentItemD, setCurrentItemD] = useState({});

    useEffect(()=>{
        getex()
    }, []);

    function getex() {
        setLoading(true)
        axios.get('https://human1moment.herokuapp.com/api/exchangeproduct/?active=give').then((response)=>{
            console.log(response.data);
            setExProduct(response.data);
            setLoading(false)
        })
    }

    const [exProduct, setExProduct] = useState([]);
    const [loading, setLoading] = useState(false);

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
                    <Menu className="forMenu"  mode="inline">
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
                            <img src="/imaged/Vector.png" alt=""/>
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
                                <input onChange={event => {setSearchTerm(event.target.value)}} placeholder="Search" className="inputSearch" type="text"/>
                                <div className="for-img-search">
                                    <SearchOutlined />
                                </div>
                            </div>
                        </div>
                        <div className="all-rigth-menu">
                            <div className="for-right-menu">
                                <div>
                                    <Link className="d-flex for-menu-rigth" to="/exchangeProduct">

                                        <img className="img-shop1" src="iconimg/Group 33555.png" alt=""/>
                                        <p className="for-right-menu-text">
                                            Barter tavarlar
                                        </p>
                                    </Link>
                                </div>
                                <div>
                                    <Link className="d-flex for-menu-rigth" to="/exchangeProduct">
                                        <p className="for-right-menu-text">
                                            Olingan tavarlar
                                        </p>
                                    </Link>
                                </div>
                                <div>
                                    <Link className="d-flex for-menu-rigth" to="/exchangeProduct=2">
                                        <p  className="for-right-menu-text">
                                            Berilgan tavarlar
                                        </p>
                                    </Link>
                                </div>
                            </div>
                            <Link to="/exchangeProduct/addexchange=B">
                                <div className="addShoping">
                                    <PlusCircleOutlined />
                                    Qoshish
                                </div>
                            </Link>
                        </div>
                        <div className="for-Page">
                            Berilgan tavarlar
                        </div>
                        <div className="for-table">
                            <Table bordered hover>
                                <thead className="header-table">
                                <tr>
                                    <th>TR</th>
                                    <th>Kimdan</th>
                                    <th>Nomi</th>
                                    <th>O’lcho’v birligi</th>
                                    <th>Dona narxi</th>
                                    <th>Umumiy soni</th>
                                    <th>Umumiy summasi</th>
                                    <th>O'chirish</th>
                                </tr>
                                </thead>
                                {
                                    exProduct.length ? ( <tbody className="body-table">
                                    {
                                        exProduct && exProduct.filter((value => {
                                            if (searchTerm === ""){
                                                return value
                                            }else if (value.by_user.first_name.toLowerCase().includes(searchTerm.toLowerCase())){
                                                return value
                                            }
                                        })).map((item, index)=>(
                                            <tr key={index}>
                                                <td>{++index}</td>
                                                <td>{item.by_user.first_name+" "}{item.by_user.last_name}</td>
                                                <td>{item.product.name}</td>
                                                <td>{item.size}</td>
                                                <td>{item.price}$</td>
                                                <td>{item.count}</td>
                                                <td>{item.total}$</td>
                                                <td>
                                                    <p>
                                                        <div style={{display: 'block', width: 50,}}>
                                                            <img onClick={() => toggle(item)} className="dlete" src="imaged/Delete.png" alt=""/>
                                                        </div>
                                                    </p>
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
                        <Button onClick={() => dleteItem(currentItemD)} color="primary">Ok</Button>
                    </ModalFooter>
                </Modal>
            </Layout>
        </>
    );
}

export default ExchabgeproductB;