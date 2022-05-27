import React, { useState } from "react";
import Card from "./components/Card";
import StockSearch from "./components/StockSearch";

function App() {
  const [stockData, setStockData] = useState([]);
  const getStockData = (newStock, isAutoGenerated) => {
    for (const stock of stockData) {
      if (!isAutoGenerated && newStock.Ticker === stock.Ticker) {
        // alert(newStock.Ticker + " is already on your list!");
        return;
      } else if (newStock.Ticker === stock.Ticker) {
        return;
      }
    }

    setStockData((prev) => {
      return [...prev, newStock];
    });
  };

  return (
    <React.Fragment>
      <StockSearch getStockData={getStockData} />
      <Card stockData={stockData} setStockData={setStockData} />
    </React.Fragment>
  );
}

export default App;
