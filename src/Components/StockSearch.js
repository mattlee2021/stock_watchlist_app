import { useState } from "react";
import "./StockSearch.scss";
import FetchStocks from "../api/FetchStocks";
import FetchSimilarStocks from "../api/FetchSimilarStocks";

const StockSearch = (props) => {
  const [showSimilarStocks, setShowSimilarStocks] = useState(false);
  const [suggestedResults, setSuggestedResults] = useState([]);
  const [ticker, setTicker] = useState("");
  let suggestedResultsSize;

  //API KEY is TD8ZNN64UTNOK6DA

  const onSubmitTickerHandler = (event) => {
    event.preventDefault();
    FetchStocks(ticker, props.getStockData);
    if (showSimilarStocks) {
      FetchSimilarStocks(ticker, props.getStockData);
    }
    setTicker("");
    setSuggestedResults(() => []);
  };

  const onChangeInput = (event) => {
    const input = event.target.value;
    setTicker(() => input);
    setSuggestedResults(() => []);
    fetch(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${event.target.value}&apikey=ZY9GZNYZQM8C1MQC`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        suggestedResultsSize =
          data.bestMatches.length >= 4 ? 4 : data.bestMatches.length;

        for (let index = 0; index < suggestedResultsSize; index++) {
          let key = index;
          if (
            data.bestMatches[key]["1. symbol"] &&
            data.bestMatches[key]["2. name"]
          ) {
            setSuggestedResults((prev) => [
              ...prev,
              [
                data.bestMatches[key]["1. symbol"],
                data.bestMatches[key]["2. name"],
              ],
            ]);
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <form>
      <div className="ticker">
        <label>Ticker</label>
        <input
          type="text"
          value={ticker}
          onChange={onChangeInput}
          className="searchBar"
        />
        <button
          type="submit"
          disabled={ticker.length === 0}
          onClick={onSubmitTickerHandler}
          className={ticker.length === 0 ? "disabled" : ""}
        >
          Submit
        </button>
        <div className="similarStock">
          <label> Show Similar Stocks </label>
          <input
            type="checkbox"
            checked={showSimilarStocks}
            onChange={() => {
              setShowSimilarStocks((prev) => {
                return !prev;
              });
            }}
          />
        </div>
      </div>
      <div className="searchResults">
        {suggestedResults.map((stock) => {
          return (
            <ul
              onClick={() => {
                setTicker(() => stock[0]);
                setSuggestedResults(() => []);
              }}
            >
              Symbol: {stock[0]} Name: {stock[1]}
            </ul>
          );
        })}
      </div>
    </form>
  );
};

export default StockSearch;
