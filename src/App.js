import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Header from './comoponents/header/Header';
import Navbar from './comoponents/navbar/Navbar';
import Profile from './comoponents/profile/Profile';
import Music from './comoponents/music/Music';
import News from './comoponents/news/News';
import Settings from './comoponents/settings/Settings';
import DialogsContainer from './comoponents/dialogs/DialogsContainer';




const App = (props) => {
  return(
        <div className='app-wraper'>
          <Header />
          <Navbar />
          <div className='app-wrapper-content'>
              <Route path='/profile' render={ () => <Profile />} />
              <Route path='/dialogs' render={ () => <DialogsContainer />} />
              <Route path='/news' render={ () => <News />} />
              <Route path='/music' render={ () => <Music />} />
              <Route path='/settings' render={ () => <Settings />} />
          </div>
        </div>
  );
}


export default App;