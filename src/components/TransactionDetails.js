import {useEffect, useState} from "react";
import {formatDate, isESPPDateValid} from "../helper/helpers";

const TransactionDetails = ({
  setPurchasePrice,
  setPurchaseDate,
  purchaseDate,
  purchasePrice,
}) => {
  const [isValidDate, setIsValidDate] = useState(true);

  useEffect(() => {
    setIsValidDate(isESPPDateValid(purchaseDate));
  }, [purchaseDate]);

  return (
    <>
      <h2 className="text-2xl mb-4">Transaction details</h2>
      <div className="my-4">
        <label htmlFor="purchasePrice">Total purchase amount (USD)</label>
        <input
          type="number"
          name="purchasePrice"
          id="purchasePrice"
          className="w-full bg-slate-100 rounded h-12 px-2 my-2"
          placeholder="1234.56"
          onChange={(e) => setPurchasePrice(e.target.value)}
          value={purchasePrice}
        />
      </div>
      <div className="my-4">
        <label htmlFor="purchaseDate">Purchase date</label>
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
        {!isValidDate && (
          <p className="text-red-500 text-sm">
            Purchase date cannot be a weekend or a bank holiday
          </p>
        )}
      </div>
    </>
  );
};

export default TransactionDetails;
