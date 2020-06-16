import React, {useState} from 'react';
import './App.css';

import Header from './header';
import Routes from './routes'
import { Route } from 'react-router-dom';

function App() {
  //const [counter, setCounter] = useState(0); //[valor do estado, função para atualizar o valor do estado]

  //function handleButtonClick() {
  //  setCounter(counter + 1);
  //}

  return (
    <Routes />  
  );  
}

export default App;
