import { useContext } from "react";
import { useLocation } from "wouter";
import UserContext from "../../context/UserContext";
import Logo from "../../assets/images/logo.png";
import "./styles.css";

const Navbar = () => {
  const { favorites, toggleFavoriteScreen } = useContext(UserContext);
  const [, navigate] = useLocation();

  const handleLogo = () => {
    toggleFavoriteScreen(false);
    navigate("/");
  };

  const toggleFav = () => {
    toggleFavoriteScreen();
    navigate("/");
  };

  return (
    <div className="navbar">
      <button className="nav-logo" onClick={handleLogo}>
        <img src={Logo} alt="dragon-ball-logo" className="logo" />
      </button>

      <div className="nav-items">
        <span
          className="fav-navbar"
          onClick={toggleFav}
          aria-label={`Favorites: ${favorites.length} items`}
        >
          ❤️ {favorites.length}
        </span>
      </div>
    </div>
  );
};

export default Navbar;
