import React, { createContext, useEffect, useState } from 'react'

export const CoinContext=createContext();

export default function CustomCoinContext({children}) {
  const [currency,setCurrency]=useState({name:"usd",symbol:"$"})
  const [allCoin,setAllCoin]=useState([]);

  async function fetchAllCoins(){
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-42HR7fbsgqURhHgJM2dJ2Jg3'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
      .then(res => res.json())
      .then(res => setAllCoin(res))
      .catch(err => console.error(err));
  }

  useEffect(()=>{
    fetchAllCoins();
  },[currency])

  console.log(allCoin,currency)
  
  return (
    <CoinContext.Provider value={{allCoin,currency,setCurrency}}>
      {children}
    </CoinContext.Provider>
  )
}