import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState("");
  const [coin, setSelectCoin] = useState({ id: "" });
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState("");

  const onChangeMoney = (event) => {
    setMoney(event.target.value);
  };

  const onChangeCoin = (event) => {
    const selectedId = event.target.value;
    const selectedCoin = coins.find((c) => c.id === selectedId);
    setSelectCoin(selectedCoin);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!coin.id) {
      setError("먼저 코인을 선택해주세요.");
      return;
    }
    if (
      !coin.quotes ||
      !coin.quotes.USD ||
      money === "" ||
      isNaN(parseFloat(money))
    ) {
      setError("숫자를 입력해주세요.");
      return;
    }

    const coinPrice = coin.quotes.USD.price;
    const result = parseFloat(money) / coinPrice;
    setAmount(result);
    setError(""); // 에러 초기화
  };

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setSelectCoin(json);
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
          <option value="">원하는 코인을 선택하세요</option>
          {coins.map((coin) => (
            <option key={coin.id} value={coin.id}>
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

      {error && <h2 style={{ color: "red" }}>{error}</h2>}

      {amount > 0 && (
        <h2>
          You can buy {amount.toFixed(6)} {coin.symbol}
        </h2>
      )}
    </div>
  );
}

export default App;
