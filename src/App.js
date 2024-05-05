import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";

function App() {
  const [language, setLanguage] = useState("fr");
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [purchaseDate, setPurchaseDate] = useState(lastESPPDay(new Date()));
  const [exchangeRate, setExchangeRate] = useState(1);
  const [euroPurchasePrice, setEuroPurchasePrice] = useState(0);

  useEffect(() => {
    console.log(purchaseDate);
    getExchangeRate(purchaseDate).then((ex) => {
      console.log("In use effect", ex);
      setExchangeRate(ex);
    });
  }, [purchaseDate]);

  useEffect(() => {
    setEuroPurchasePrice(purchasePrice / exchangeRate);
  }, [purchasePrice, exchangeRate]);

  return (
    <>
      <NavBar language={language} setLanguage={setLanguage} />
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 m-4">
        <div className="bg-red-200 rounded px-4 py-2">
          None of the data you enter on this website is retained. If you refresh
          the page, everything will be lost.
        </div>

        <div className="flex mt-4 space-x-12">
          <div className="w-1/2">
            <h2 className="text-2xl mb-4">Transaction details</h2>
            <div className="my-4">
              <label htmlFor="purchasePrice">
                Accumulated contributions (USD)
              </label>
              <input
                type="number"
                name="purchasePrice"
                id="purchasePrice"
                className="w-full bg-slate-100 rounded h-12 px-2 my-2"
                placeholder="1234.56"
                onChange={(e) => setPurchasePrice(e.target.value)}
              />
            </div>
            <div className="my-4">
              <label htmlFor="purchaseDate">
                Purchase date (Last ESPP date:{" "}
                {formatDate(lastESPPDay(new Date()))})
              </label>
              <input
                type="date"
                name="purchaseDate"
                id="purchaseDate"
                className={`w-full bg-slate-100 rounded h-12 px-2 my-2`}
                value={formatDate(purchaseDate)}
                onChange={(e) => {
                  setPurchaseDate(new Date(e.target.value));
                }}
                max={formatDate(new Date())}
              />
            </div>
          </div>
          <div className="w-1/2 bg-blue-50 shadow-md rounded-xl p-4 flex flex-col">
            <h2 className="text-2xl mb-4">Results</h2>
            <p>
              Exchange rate on {purchaseDate.getDate()}/
              {purchaseDate.getMonth() + 1}/{purchaseDate.getFullYear()}: 1€ ={" "}
              {exchangeRate}$
            </p>
            <p>
              Euro purchase price: {Math.round(euroPurchasePrice * 100) / 100}€
            </p>
            <div>
              <p className="text-4xl mx-auto">
                <strong>
                  {Math.round(euroPurchasePrice * 0.0035 * 100) / 100}€
                </strong>
              </p>
              <span>TOB</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function lastESPPDay(currentDate) {
  const previousMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    1
  );
  const lastDayOfPreviousMonth = new Date(
    previousMonth.getFullYear(),
    previousMonth.getMonth() + 1,
    0
  );
  let lastWorkingDate = new Date(lastDayOfPreviousMonth);

  while (
    lastWorkingDate.getDay() === 0 ||
    lastWorkingDate.getDay() === 6 ||
    ![2, 5, 8, 11].includes(lastWorkingDate.getMonth())
  ) {
    lastWorkingDate.setDate(lastWorkingDate.getDate() - 1);
  }

  return lastWorkingDate;
}

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
}

function getExchangeRate(date) {
  const startPeriod = formatDate(date);
  const endPeriod = formatDate(date);
  const url = `https://data-api.ecb.europa.eu/service/data/EXR/D.USD.EUR.SP00.A?startPeriod=${startPeriod}&endPeriod=${endPeriod}`;

  return fetch(url, {
    headers: {
      Accept: "application/xml", // Add the Accept header to accept XML response
    },
  })
    .then((response) => response.text()) // Use response.text() instead of response.json() to parse XML response
    .then((data) => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, "application/xml");
      const resultExRate = xml
        .getElementsByTagName("generic:ObsValue")[0]
        .getAttribute("value");
      return resultExRate;
    })
    .catch((error) => {
      console.error(
        "There was an error when retriving the exchange rate from ECB:",
        error
      );
      return "??";
    });
}

export default App;
