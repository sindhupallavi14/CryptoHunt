import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/context";
import "./Coin.css";
import LineChart from "../../Components/Chart/LineChart";

export default function Coin() {
  const { coinId } = useParams();
  const { currency } = useContext(CoinContext);
  const [coinData, setCoinData] = useState();
  const [hisData, setHisData] = useState();
  const [loading, setLoading] = useState(false);

  async function fetchCoinDetails() {
    setLoading(true);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-42HR7fbsgqURhHgJM2dJ2Jg3",
      },
    };

    await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then((res) => res.json())
      .then((res) => setCoinData(res))
      .catch((err) => console.error(err));
  }

  async function fetchHistoricalData() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-42HR7fbsgqURhHgJM2dJ2Jg3",
      },
    };

    await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
      options
    )
      .then((res) => res.json())
      .then((res) => setHisData(res))
      .catch((err) => console.error(err));
    setLoading(false);
  }

  useEffect(() => {
    fetchHistoricalData();
    fetchCoinDetails();
  }, [currency]);

  console.log(coinData);

  if (loading) {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }

  return (
    <>
      {coinData && hisData && (
        <div className="coin-con">
          <div className="coinimg-con">
            <img src={coinData.image.large} alt={`${coinId}`} />
            <p>
              {coinData.name} - {coinData.symbol.toUpperCase()}
            </p>
          </div>
          <div className="coin-chart">
            <LineChart hisData={hisData} />
          </div>
          <div className="coin-info">
            <ul>
              <li>Crypto Market Rank</li>
              <li>{coinData.market_cap_rank}</li>
            </ul>
            <ul>
              <li>Current Price</li>
              <li>
                {currency.symbol}{" "}
                {coinData.market_data.current_price[
                  currency.name
                ].toLocaleString()}
              </li>
            </ul>
            <ul>
              <li>Market Cap</li>
              <li>
                {currency.Symbol}{" "}
                {coinData.market_data.market_cap[
                  currency.name
                ].toLocaleString()}
              </li>
            </ul>
            <ul>
              <li>24 Hour high</li>
              <li>
                {currency.Symbol}{" "}
                {coinData.market_data.high_24h[currency.name].toLocaleString()}
              </li>
            </ul>
            <ul>
              <li>24 Hour low</li>
              <li>
                {currency.Symbol}{" "}
                {coinData.market_data.low_24h[currency.name].toLocaleString()}
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
