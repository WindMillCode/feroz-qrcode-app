// @ts-nocheck
import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { animals } from './animals';
import {mediaPrefix} from './customExports'


const title = "";

const displayFact = (e:Event)=>{
    const facts = animals[e.target.alt].facts 
    const chosenFact = facts[Math.floor(Math.random() * facts.length)]
    document.querySelector("#fact").innerHTML = chosenFact
}

// convert animats object to array
const images = Object.entries(animals)
.map((x,i)=>{
    let [keyx,valx] =x;
    let myObj =  {
        key:keyx,
        className:'animal',
        alt:keyx,
        src:valx.image,
        "aria-label":keyx,
        role:"button",
        onClick:displayFact
    }
    return <img {...myObj}/>

})
// 

const background = <img className="background a_p_p_Background" alt="ocean" src ={mediaPrefix({media:'ocean.jpg'})}/>;
const showBackground = true;
const animalFacts = (
  <div className ="a_p_p_Pod">
      <h1>{title === "" ?"Click an animal for a fun fact" :title}</h1>
      <div className="animals a_p_p_Animals">
          {images}
      </div>
      <p id ="fact"></p>
      {showBackground && background}
  </div>
);


function App() {
  return animalFacts
}

export default App;
