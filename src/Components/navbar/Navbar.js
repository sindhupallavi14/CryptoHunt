import React, { useContext } from "react";
import logo from "./Logo.jpg";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { CoinContext } from "../../context/context";


export default function Navbar() {

  const {setCurrency}=useContext(CoinContext);

  function currencyHandler(e)
  {
     switch (e.target.value) {
      case "usd":
        {
          setCurrency({name:"usd",symbol:"$"})
           break;
        }
        case "inr":
        {
          setCurrency({name:"inr",symbol:"₹"})
           break;
        }
        case "eur":
        {
          setCurrency({name:"eur",symbol:"ē"})
           break;
        }
        
      default:
        break;
     }
  }
  return (
    <div className="nav-con">
      <div className="logo">
        <NavLink to="/" style={{ color: "white" }}>
          <i class="fa-regular fa-chess-king icon"></i>
        </NavLink>
        <p  >Cryptoplace</p>
      </div>
      <div className="nav-list">
        <NavLink to={"/"} style={{textDecoration:"none",color:"white"}}><p>Home</p></NavLink>
        <p>Featues</p>
        <p>Pricing</p>
        <p>Blog</p>
      </div>
      <div className="currency-con">
        <select onChange={currencyHandler}>
          <option value="usd">USD</option>
          <option value="inr">INR</option>
          <option value="eur">EUR</option>
        </select>
        <button className="sign-up-btn">Sign up</button>
      </div>
    </div>
  );
}
