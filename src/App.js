import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState(0);
  const [coin, setSelectCoin] = useState([]);
  const onChangeMoney = (event) => setMoney(event.target.value);
  const onChangeCoin = (event) => setSelectCoin(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (money === "") {
      return;
    }
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={onChangeCoin} value={coin.id}>
          {coins.map((coin) => (
            <option>
              {coin.name} ({coin.symbol} : ${coin.quotes.USD.price} USD)
            </option>
          ))}
        </select>
      )}
      <h2>Your Money input</h2>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChangeMoney}
          value={money}
          type="text"
          placeholder="USD"
        />
        <button>Change</button>
      </form>
    </div>
  );
}

export default App;
