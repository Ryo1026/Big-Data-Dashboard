import gear from "./Vector.png";

const Header = () => {
  return (
    <header className="header">
      <span className="nav-title">LOGO</span>
      <div className="setting">
        <img src={gear} alt="gear" />
      </div>
    </header>
  );
};

export default Header;
