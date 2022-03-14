import React from 'react';
import './App.css';
import Header from './comoponents/header/Header';
import Navbar from './comoponents/navbar/Navbar';
import Profile from './comoponents/profile/Profile';



const App = () => {
  return(
    <div className='app-wraper'>
      <Header />
      <Navbar />
      <Profile />
    </div>
  );
}


export default App;