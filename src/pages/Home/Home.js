import React, { useContext, useEffect, useState } from "react";
import "./home.css";
import { CoinContext } from "../../context/context";
import { Link, NavLink } from "react-router-dom";

export default function Home() {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState([]);

  function InputHandler(e) {
    setInput(e.target.value);
    if(e.target.value==="")
    {
      setDisplayCoin(allCoin);
    }
  }

  function SearchHandler(e)
  {
     e.preventDefault()
     setDisplayCoin(allCoin.filter((item)=>item.name.toLowerCase().includes(input.toLowerCase())))
  }

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  return (
    <div className="home-con">
      <div className="home1">
        <h3>
          Largest <br /> Crypto Marketplace
        </h3>
        <p>welcome to the world's largest cryptocurrency marketplace.</p>
        <form className="search" onSubmit={SearchHandler}>
          <input
            placeholder="Search"
            name="search"
            value={input}
            required
            onChange={InputHandler}
            list="coinlist"
          />
          <datalist id="coinlist">
            {allCoin.map((item,idx)=>(<option key={idx} value={item.name}/>))}
          </datalist>
          
          <button>Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-format">
          <p>#</p>
          <p>coins</p>
          <p>Price</p>
          <p>24HChange</p>
          <p>MarketCap</p>
        </div>
        {displayCoin.slice(0, 10).map((item, idx) => (
          <NavLink  to={`/coin/${item.id}`}className="table-format" key={idx}>
            <p>{item.market_cap_rank}</p>
            <div className="coin-img-con">
              <NavLink to={`/coin/${item.name}`}>
                <img src={item.image} alt="" />
              </NavLink>
              <p>{item.name + "-" + item.symbol}</p>
            </div>
            <p>
              {currency.symbol} {item.current_price.toLocaleString()}
            </p>
            <p
              className={item.price_change_percentage_24h > 0 ? "green" : "red"}
            >
              {Math.floor(item.price_change_percentage_24h * 100) / 100}
            </p>
            <p>
              {currency.symbol}
              {item.market_cap.toLocaleString()}
            </p>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
