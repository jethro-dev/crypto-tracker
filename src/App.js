import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.scss";
import { Coin } from "./components";
import { MdModeNight, MdOutlineWbSunny } from "react-icons/md";

const URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=100&page=1&sparkline=false";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  const getCoinsData = async () => {
    try {
      const response = await axios.get(URL);
      setCoins(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCoinsData();
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="coin-app ">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency </h1>

        <form>
          <input
            type="text"
            placeholder="Search"
            className="coin-input"
            onChange={handleChange}
          />
        </form>
      </div>
      <div className="coin-header">
        <h2 className="coin-name">Coin</h2>
        <h2 className="coin-price">Price</h2>
        <h2 className="coin-volume">Volume</h2>
        <h3 className="coin-percent">
          Price Change <br />
          (%)
        </h3>
        <h2 className="coin-marketcap">Market Cap</h2>
      </div>
      {filteredCoins.map((coin) => (
        <Coin
          key={coin.id}
          name={coin.name}
          image={coin.image}
          price={coin.current_price}
          symbol={coin.symbol}
          marketcap={coin.market_cap}
          priceChange={coin.price_change_percentage_24h}
          volume={coin.total_volume}
        ></Coin>
      ))}
    </div>
  );
}

export default App;
