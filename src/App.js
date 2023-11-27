import './App.css';
import Character from './components/Character.js';
import React, { useRef, useState } from 'react';

function App() {
  const quantityRef = useRef(null);
  const [quantity, setQuantity] = useState(4);

  function minus() {
    setQuantity(Math.max(quantity - 1, 1));
  }

  function plus() {
    setQuantity(Math.min(quantity + 1, 10));
  }

  // Create an array of Character components based on the quantity
  const charArray = Array.from({ length: quantity }, (_, index) => (
    <Character />
  ));

  return (
    <div className="App">
      <Header
        quantity={quantity}
        quantityRef={quantityRef}
        onMinus={minus}
        onPlus={plus}
      />
      <div className="Party">
        {charArray}
      </div>
    </div>
  );
}

const Header = ({ quantity, quantityRef, onMinus, onPlus }) => (
  <div className="Header">
    <b>Fantasy Party Generator</b>

    <div className="quantity">
      <a href="#" className="quantity__minus" onClick={onMinus}><span>-</span></a>
      <input
        ref={quantityRef}
        id="quantity-num"
        name="quantity"
        type="text"
        className="quantity__input"
        value={quantity}
        readOnly
      />
      <a href="#" className="quantity__plus" onClick={onPlus}><span>+</span></a>
      <p>Adventurers</p>
    </div>
  </div>
);

export default App;
