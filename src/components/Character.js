import './Character.css';
import name from '../scripts/NameGenerator.js'
import {gender, race, klass} from '../scripts/CharacterGenerator.js'
import React, { useState } from 'react';

function Character() {
  const [Count, setCount] = useState(0);
  return (
    <div className="Character">
        <p id="Name">{name()}</p>
        <p>the</p>
        <p id="Gender">{gender()}</p>
        <p id="Race">{race()}</p>
        <p id="Class">{klass()}</p>
        <button className="btn-green" onClick={() => setCount(Count + 1)} > Reload
          <img className="icon" src="https://htmlacademy.ru/assets/icons/reload-6x-white.png" />
        </button>
    </div>
  );
}

export default Character;
