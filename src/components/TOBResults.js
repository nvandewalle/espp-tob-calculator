import { useEffect, useState } from "react";
import { getExchangeRate, roundToTwoDecimals } from "../helper/helpers";

import WaitImage from "../assets/warning.svg";

const TOBResults = ({
  purchaseDate,
  purchasePrice,
  tob,
  setTob,
  euroPurchasePrice,
  setEuroPurchasePrice,
}) => {
  const [exchangeRate, setExchangeRate] = useState(1);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    getExchangeRate(purchaseDate).then((ex) => {
      setExchangeRate(ex);
    });
  }, [purchaseDate]);

  useEffect(() => {
    setEuroPurchasePrice(roundToTwoDecimals(purchasePrice / exchangeRate));
  }, [purchasePrice, exchangeRate, setEuroPurchasePrice]);

  useEffect(() => {
    setTob(roundToTwoDecimals(euroPurchasePrice * 0.0035));
  }, [euroPurchasePrice, setTob]);

  if (purchasePrice === 0 || exchangeRate === null) {
    return (
      <>
        <img src={WaitImage} alt="Loading..." className="w-1/2 mx-auto my-8" />
        <p className="m-auto text-center">
          Please, fill in the form on the left and make sure to select a valid
          transaction date.
        </p>
      </>
    );
  }

  return (
    <>
      <h2 className="text-2xl mb-4 mx-auto">TOB to be paid</h2>

      <p className="text-6xl mx-auto mt-4">
        <strong>{tob}€</strong>
      </p>

      <button
        className="mt-12 text-gray-500 underline hover:no-underline"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? "Hide details" : "Show details"}
      </button>
      {showDetails && (
        <div className="text-gray-400">
          <p>Details:</p>
          <ul className="list-disc list-inside ">
            <li>Purchase price: {purchasePrice}$</li>
            <li>Exchange rate on purchase date: {exchangeRate}</li>
            <li>Purchase price in EUR: {euroPurchasePrice}€</li>
            <li>
              TOB to be paid: {euroPurchasePrice} x 0.35% = {tob}€
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default TOBResults;
