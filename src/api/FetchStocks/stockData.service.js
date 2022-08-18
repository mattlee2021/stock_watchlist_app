import axios from "axios";
class StockData {
  constructor() {
    this.instance = axios.create({
      baseURL: "https://www.alphavantage.co",
    });
  }

  async fetchStocks(ticker) {
    const result = await this.instance.get("/query", {
      function: "OVERVIEW",
      symbol: ticker,
      apikey: "ZY9GZNYZQM8C1MQC",
    });
    console.log(result);
  }
}

export default new StockData();

// const FetchStocks = (ticker) => {
//   return fetch(
//     `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${process.env.REACT_APP_ALPHA_VANTAGE_KEY}`
//   )
//     .then((response) => {
//       if (response) {
//         console.log("Sending a response");
//         return response.json();
//       } else {
//         console.log("Reached rate limit");
//         throw new Error("Error here!!");
//       }
//     })
//     .then((data) => {
//       if (data.Name === undefined) {
//         throw new Error("Invalid Ticker");
//       }
//       return {
//         Ticker: data.Symbol,
//         Name: data.Name,
//         "P/E": data.PERatio,
//         "P/B": data.PriceToBookRatio,
//         EPS: data.EPS,
//         "EV/EBITDA": data.EVToEBITDA,
//         "EV/Revenue": data.EVToRevenue,
//         "Profit Margin": data.ProfitMargin,
//         Sector: data.Sector,
//       };
//     })
//     .catch((error) => {
//       alert(error);
//     });
// };

// export default FetchStocks;
