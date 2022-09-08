import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { HashRouter } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { connect, Provider } from 'react-redux';
// @ts-ignore
import Navbar from './comoponents/navbar/Navbar.tsx';
// @ts-ignore
import Music from './comoponents/music/Music.tsx';
// @ts-ignore
import News from './comoponents/news/News.tsx';
// @ts-ignore
import Settings from './comoponents/settings/Settings.tsx';
// @ts-ignore
import UsersContainer from './comoponents/users/UsersContainer.tsx';
//@ts-ignore
import HeaderContainer from './comoponents/header/HeaderContainer.tsx';
// @ts-ignore
import Login from './comoponents/login/Login.tsx';
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
      <div className='app-wraper'>
        <HeaderContainer />
        <Navbar />
        <div className='app-wrapper-content'>
          <Switch>
            <Route exact path='/' ><Redirect to='/profile' /></Route>
            <Route path='/profile/:userId?' render={() => <SuspendedProfile />} />
            <Route path='/dialogs' render={() => <SuspendedDialogs />} />
            <Route path='/news' render={() => <News />} />
            <Route path='/music' render={() => <Music />} />
            <Route path='/users' render={() => <UsersContainer pageTitle={'Possible friends'} />} />
            <Route path='/settings' render={() => <Settings />} />
            <Route path='/login' render={() => <Login />} />
            <Route path='*' render={() => <div>404 NOT FOUND</div>} />
          </Switch>
        </div>
      </div>
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