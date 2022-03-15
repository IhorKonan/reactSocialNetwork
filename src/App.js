import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Dialogs from './comoponents/dialogs/Dialogs';
import Header from './comoponents/header/Header';
import Navbar from './comoponents/navbar/Navbar';
import Profile from './comoponents/profile/Profile';
import Music from './comoponents/music/Music';
import News from './comoponents/news/News';
import Settings from './comoponents/settings/Settings';




const App = () => {
  return(
      <BrowserRouter>
        <div className='app-wraper'>
          <Header />
          <Navbar />
          <div className='app-wrapper-content'>
              <Route path='/profile' component={Profile} />
              <Route path='/dialogs' component={Dialogs} />
              <Route path='/news' component={News} />
              <Route path='/music' component={Music} />
              <Route path='/settings' component={Settings} />
          </div>
        </div>
      </BrowserRouter>
  );
}


export default App;