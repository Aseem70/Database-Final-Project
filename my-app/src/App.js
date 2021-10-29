import logo from './OMA-Cinema.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to the plethora of entertainment!
        </p>
        <a
          className="App-link"
          href="https://youtu.be/dQw4w9WgXcQ"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn More about our history!
        </a>
      </header>
    </div>
  );
}

export default App;
