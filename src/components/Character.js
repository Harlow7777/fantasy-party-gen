import './Character.css';
import name from '../scripts/NameGenerator.js'
import {gender, race, klass} from '../scripts/CharacterGenerator.js'
import React, { useState } from 'react';

function Character() {  
  const [count, setCount] = useState(0);
  const [characterName, setCharacterName] = useState(() => name());

  const handleReloadClick = () => {
    // Update the name when the button is clicked
    setCharacterName(name());

    // Increment the count
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="Character">
        <p id="Name">{characterName}</p>
        <p>the</p>
        <p id="Gender">{gender()}</p>
        <p id="Race">{race()}</p>
        <p id="Class">{klass()}</p>
        <button className="btn-green" onClick={handleReloadClick} >
          <img className="icon" src="https://htmlacademy.ru/assets/icons/reload-6x-white.png" />
        </button>
    </div>
  );
}

export default Character;
