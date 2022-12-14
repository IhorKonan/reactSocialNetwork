import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button, Col, Layout, Menu, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';
//@ts-ignore
import logo from '../../img/logo.png';
//@ts-ignore
import s from './Header.module.css';
import { useDispatch, useSelector } from 'react-redux';
//@ts-ignore
import { selectCurrentUserLogin, selectIsAuth } from '../../redux/auth-selectors.ts';
//@ts-ignore
import { logout } from '../../redux/auth-reducer.ts';

export type MapPropsType = {
}

export const Header: React.FC<MapPropsType> = (props) => {

  const isAuth = useSelector(selectIsAuth)
  const login = useSelector(selectCurrentUserLogin)

  const dispatch = useDispatch()

  const logoutCallback = () => {
    dispatch(logout())
  } 
  const { Header } = Layout;

  return (
    <Header className="header">
      <div className="logo" />
      <Row>
        <Col span={18}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{ lineHeight: '64px' }}>
            <Menu.Item key="1"><Link to='/developers'>Developers</Link></Menu.Item>
          </Menu>
        </Col>
          {isAuth 
          ? <><Col span={1}>
                <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
              </Col>
              <Col span={5}>
                <Button onClick={logoutCallback}>Log out</Button>
              </Col>
            </>
          : <Col span={6}>
              <Link to={'/login'}><Button>login</Button></Link>
            </Col>}
      </Row>
    </Header>
    //   <header className={s.header}>
    //   <img src={logo} alt='logo'></img>
      
    // </header>
  );
}

export default Header;