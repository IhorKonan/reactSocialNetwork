import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Navbar from './comoponents/navbar/Navbar';
import Music from './comoponents/music/Music';
import News from './comoponents/news/News';
import Settings from './comoponents/settings/Settings';
import UsersContainer from './comoponents/users/UsersContainer';
import HeaderContainer from './comoponents/header/HeaderContainer';
import Login from './comoponents/login/Login';
import { connect, Provider } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Preloader from './comoponents/common/Preloader';
// import { BrowserRouter } from 'react-router-dom';
import store from './redux/redux-store';
import { withSuspens } from './hoc/withSuspens';
import { HashRouter } from 'react-router-dom';

const ProfileContainer = React.lazy(() => import('./comoponents/profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./comoponents/dialogs/DialogsContainer'));




class App extends React.Component {
  componentDidMount(){
    this.props.initializeApp();
  }
  render(){
    if(!this.props.initialized){
      return <Preloader />
    }
    return (
        <div className='app-wraper'>
          <HeaderContainer />
          <Navbar />
          <div className='app-wrapper-content'>
              <Route path='/profile/:userId?' render={withSuspens(ProfileContainer)}/> 
              <Route path='/dialogs' render={withSuspens(DialogsContainer)} />
              <Route path='/news' render={ () => <News />} />
              <Route path='/music' render={ () => <Music />} />
              <Route path='/users' render={ () => <UsersContainer />} />
              <Route path='/settings' render={ () => <Settings />} />
              <Route path='/login' render={ () => <Login />} />
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})


const AppContainer = compose(
  withRouter,
  connect(mapStateToProps, {initializeApp}))(App);

const MainApp = (props) => {
  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </HashRouter>
  )
}

export default MainApp;