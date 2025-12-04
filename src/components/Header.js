import logo from "../icons_assets/Logo.svg";
import Nav from "./Nav";

const Header = () => {
  return (
    <header className="nav">
      <div className="nav-logo">
        <img src={logo} alt="Little Lemon logo" />
      </div>
      <Nav />
    </header>
  );
};

export default Header;


