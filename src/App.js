import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Dialogs from './comoponents/dialogs/Dialogs';
import Header from './comoponents/header/Header';
import Navbar from './comoponents/navbar/Navbar';
import Profile from './comoponents/profile/Profile';
import Music from './comoponents/music/Music';
import News from './comoponents/news/News';
import Settings from './comoponents/settings/Settings';




const App = (props) => {
  return(
        <div className='app-wraper'>
          <Header />
          <Navbar />
          <div className='app-wrapper-content'>
              <Route path='/profile' render={ () => <Profile profilePage={props.state.profilePage} addPost={props.addPost} updateNewPostText={props.updateNewPostText}/>} />
              <Route path='/dialogs' render={ () => <Dialogs state={props.state.dialogsPage}/>} />
              <Route path='/news' render={ () => <News />} />
              <Route path='/music' render={ () => <Music />} />
              <Route path='/settings' render={ () => <Settings />} />
          </div>
        </div>
  );
}


export default App;