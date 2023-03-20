import "./App.css";
import gear from "./Vector.png";

function App() {
  return (
    <div className="App">
      <header className="header">
        <span className="nav-title">LOGO</span>
        <div className="setting">
          <img src={gear} alt="gear" />
        </div>
      </header>
      <div className="container">
        <div className="taiwan">TAIWAN</div>
        <div className="content"></div>
      </div>
    </div>
  );
}

export default App;
