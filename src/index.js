import { rerenderEntireTree } from './render';
import reportWebVitals from './reportWebVitals';
import state from './redux/state.js';

rerenderEntireTree(state);
reportWebVitals();