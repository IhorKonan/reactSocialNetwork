import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


let dialogsData = [
  {id:1, name:'Ihor'},
  {id:2, name:'Sveta'},
  {id:3, name:'Viktor'},
  {id:4, name:'Andrey'},
  {id:5, name:'Katya'},
  {id:6, name:'Valery'},
]
let messageseData = [
  {id:1, message:'Hi'},
  {id:2, message:'How are you?'},
  {id:3, message:'Yo'},
  {id:4, message:'Hello'},
  {id:5, message:'Where you?'},
  {id:6, message:'How much?'},
]
let postsDatas = [
  {id:1, message:'Hi, how are you?', likeCount: 12},
  {id:2, message:"Guitar HERO!!", likeCount: 25},
  {id:2, message:"It's my second post", likeCount: 11},
  {id:2, message:"It's my first post", likeCount: 16},
]
ReactDOM.render(
    <App />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
