import './App.css';
import Header from './components/Header.js';
import Character from './components/Character.js';

function App() {
  const numCharacters = 4;
  const charArray = Array.from({ length: numCharacters }).map((_, index) => (
    <Character />
  ))

  return (
    <div className="App">
      <Header />
      <div className="Party">
        {charArray}
      </div>
    </div>
  );
}

export default App;
