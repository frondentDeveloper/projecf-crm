import React, {useState, useEffect} from 'react';
import {Layout, Menu} from "antd";
import {Link} from "react-router-dom";
import {Table} from "reactstrap";
import {
    SearchOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons';
import axios from "axios";
const { Header, Content, Footer, Sider } = Layout;

function Stafemploy(props) {

    const [employe, setEmploye] = useState([]);
    const [loading, setLoading] = useState(false);

  useEffect(()=>{
      setLoading(true)
      axios.get("https://human1moment.herokuapp.com/user/worker/").then((response)=>{
          console.log(response.data);
          setEmploye(response.data.data)
setLoading(false)
      });
  },[]);

  const [searchTerm, setSearchTerm] = useState("")

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
                            <Link className="menuText" to="/sellProduct ">
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
                                <input onChange={event => {setSearchTerm(event.target.value)}} placeholder="Search" className="inputSearch" type="text"/>
                                <div className="for-img-search">
                                    <SearchOutlined />
                                </div>
                            </div>
                        </div>
                        <div className="all-rigth-menu">
                            <div className="for-right-menu">
                                <div>
                                    <Link className="d-flex for-menu-rigth" to="/staff">
                                        <img className="img-shop" src="iconimg/Vector (40).png" alt=""/>
                                        <p className="for-right-menu-text">
                                            Hodimlar
                                        </p>
                                    </Link>
                                </div>

                            </div>
                            <Link to="/staff/adStaf">
                                <div className="addShoping">
                                    <PlusCircleOutlined />
                                    Qoshish
                                </div>
                            </Link>
                        </div>
                        <div className="for-Page">
                            Hodimlar
                        </div>
                        <div className="for-table">
                            <Table bordered hover>
                                <thead className="header-table">
                                <tr>
                                    <th>TR</th>
                                    <th>Ismi</th>
                                    <th>Familiyasi</th>
                                    <th>Username</th>
                                    <th>E-mail</th>
                                    <th>Lavozimi</th>
                                    <th>Profil rasmi</th>
                                </tr>
                                </thead>
                                {employe.length ? (  <tbody className="body-table">
                                {employe && employe.filter((value => {
                                    if (searchTerm === ""){
                                        return value
                                    }else if (value.first_name.toLowerCase().includes(searchTerm.toLowerCase())){
                                        return value
                                    }
                                })).map((item, index)=>(
                                    <tr key={index}>
                                        <th>{++index}</th>
                                        <th> {item.first_name}</th>
                                        <td>{item.last_name}</td>
                                        <td>{item.username}</td>
                                        <td>{item.email}</td>
                                        <td>{item.role}</td>
                                        <td><img className="img-call-back" src={item.profile_image} alt=""/></td>
                                    </tr>
                                ))}
                                </tbody>) : (<div className="border-0">
                                    <div>
                                        <img className="img-folder" src="iconimg/empty folder icon.png" alt=""/>
                                        <b className="img-folder1">Malumotlar yo'q</b>
                                    </div>
                                </div>)}

                            </Table>
                        </div>
                    </Content>

                </Layout>
            </Layout>
        </>
    );
}

export default Stafemploy;