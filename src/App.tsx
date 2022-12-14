import React from 'react';
import './App.css';
import { Link , Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { HashRouter } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { connect, Provider } from 'react-redux';
// @ts-ignore
import Music from './comoponents/music/Music.tsx';
// @ts-ignore
import News from './comoponents/news/News.tsx';
// @ts-ignore
import Settings from './comoponents/settings/Settings.tsx';
// @ts-ignore
import { UsersPage } from './comoponents/users/UsersContainer.tsx';
//@ts-ignore
import Header from './comoponents/header/Header.tsx';
// @ts-ignore
import { Login } from './comoponents/login/Login.tsx';
// @ts-ignore
import { initializeApp } from './redux/app-reducer.ts';
// @ts-ignore
import { AppStateType } from './redux/redux-store.ts';
// @ts-ignore
import store from './redux/redux-store.ts';
// @ts-ignore
import { withSuspens } from './hoc/withSuspens.tsx';
// @ts-ignore
import Preloader from "./comoponents/common/Preloader/Preloader.tsx";
import 'antd/dist/reset.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';


const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;
// @ts-ignore
const ProfileContainer = React.lazy(() => import('./comoponents/profile/ProfileContainer.tsx'));
// @ts-ignore
const DialogsContainer = React.lazy(() => import('./comoponents/dialogs/DialogsContainer.tsx'));

const SuspendedProfile = withSuspens(ProfileContainer)
const SuspendedDialogs = withSuspens(DialogsContainer)


type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}

class App extends React.Component<MapPropsType & DispatchPropsType> {
  catchAllUnhandledError = (e: PromiseRejectionEvent) => {
    alert('Some error ocured');
  }
  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener('unhandledrejection', this.catchAllUnhandledError);
  }
  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.catchAllUnhandledError);
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (
      <Layout>
        <Header />
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <Layout style={{ padding: '24px 0', background: '#fff' }}>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
          >
            <SubMenu
              key="sub1"
              title={
                <span>
                  <UserOutlined type="user"/>
                  <span style={{ margin: '0 0 0 15px' }}>My Profile</span>
                </span>
              }
            >
              <Menu.Item key="1"><Link to='/profile'>Profile</Link></Menu.Item>
              <Menu.Item key="2"><Link to='/dialogs'>Messages</Link></Menu.Item>
              <Menu.Item key="3">option3</Menu.Item>
              <Menu.Item key="4">option4</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <LaptopOutlined type="laptop" />
                  <span style={{ margin: '0 0 0 15px' }}>Developers</span>
                </span>
              }
            >
              <Menu.Item key="5"><Link to='/developers'>Find developers</Link></Menu.Item>
              <Menu.Item key="6">option6</Menu.Item>
              <Menu.Item key="7">option7</Menu.Item>
              <Menu.Item key="8">option8</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              title={
                <span>
                  <NotificationOutlined type="notification" />
                  <span style={{ margin: '0 0 0 15px' }}>subnav 3</span>
                </span>
              }
            >
              <Menu.Item key="9">option9</Menu.Item>
              <Menu.Item key="10">option10</Menu.Item>
              <Menu.Item key="11">option11</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          <Switch>
            <Route exact path='/' ><Redirect to='/profile' /></Route>
      /     <Route path='/profile/:userId?' render={() => <SuspendedProfile />} />
            <Route path='/dialogs' render={() => <SuspendedDialogs />} />
            <Route path='/news' render={() => <News />} />
            <Route path='/music' render={() => <Music />} />
            <Route path='/developers' render={() => <UsersPage pageTitle={'Possible developers'} />} />
            <Route path='/settings' render={() => <Settings />} />
            <Route path='/login' render={() => <Login />} />
            <Route path='*' render={() => <div>404 NOT FOUND</div>} />
           </Switch>
        </Content>
      </Layout>
    </Content>
    <Footer style={{ textAlign: 'center' }}>react Social Network ©2022 Created by Ihor Kononenko</Footer>
  </Layout>
    )
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})


const AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App);

const MainApp: React.FC = () => {
  return (
    <HashRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </HashRouter>
  )
}

export default MainApp;