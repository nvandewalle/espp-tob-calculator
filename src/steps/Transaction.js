import TOBResults from "../components/TOBResults";
import TransactionDetails from "../components/TransactionDetails";

const Transaction = ({
  purchasePrice,
  setPurchasePrice,
  purchaseDate,
  setPurchaseDate,
  tob,
  setTob,
  euroPurchasePrice,
  setEuroPurchasePrice,
  isValid,
  setIsValid,
  activeStep,
  setActiveStep,
}) => {
  return (
    <div className="flex mt-4 md:space-x-12 flex-col md:flex-row">
      <div className="md:w-1/2">
        <TransactionDetails
          setPurchasePrice={setPurchasePrice}
          purchasePrice={purchasePrice}
          setPurchaseDate={setPurchaseDate}
          purchaseDate={purchaseDate}
        />
      </div>
      <div className="md:w-1/2 flex flex-col">
        <div className=" bg-blue-50 shadow-md rounded-xl p-4 flex flex-col">
          <TOBResults
            purchaseDate={purchaseDate}
            purchasePrice={purchasePrice}
            tob={tob}
            setTob={setTob}
            euroPurchasePrice={euroPurchasePrice}
            setEuroPurchasePrice={setEuroPurchasePrice}
            isValid={isValid}
            setIsValid={setIsValid}
          />
        </div>
        {isValid && (
          <button
            className="bg-blue-700 text-white rounded py-1 px-4 hover:bg-blue-900 inline-block self-end mt-4"
            onClick={() => setActiveStep(activeStep + 1)}
          >
            Next: TOB Form &rarr;
          </button>
        )}
      </div>
    </div>
  );
};

export default Transaction;
