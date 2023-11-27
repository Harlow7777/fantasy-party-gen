import './Character.css';
import test from '../scripts/NameGenerator.js'
import {gender, race, klass} from '../scripts/CharacterGenerator.js'

function Character() {
  return (
    <div className="Character">
        <p id="Name">Name: {test()}</p>
        <p id="Gender">Gender: {gender()}</p>
        <p id="Race">Race: {race()}</p>
        <p id="Class">Class: {klass()}</p>
    </div>
  );
}

export default Character;
