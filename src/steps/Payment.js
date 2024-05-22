import translations from "../helper/translations";
import WireImage from "../assets/undraw-transfer-money.svg";

const Payment = ({
  tob,
  language,
  purchaseDate,
  activeStep,
  setActiveStep,
  ssn,
}) => {
  return (
    <div className="flex mt-4 md:space-x-12 flex-col md:flex-row">
      <div className="md:w-1/2 flex flex-col">
        <div className="bg-blue-50 shadow-md rounded-xl p-4 flex flex-col">
          <h2 className="text-2xl mb-4 mx-auto">Wire the TOB tax</h2>
          <div className="mt-8">
            <ul className="list-disc list-inside">
              <li>
                Account holder:{" "}
                <strong>{translations.accountHolder[language]}</strong>
              </li>
              <li>
                Bank account: <strong>BE39 6792 0022 9319</strong>
              </li>
              <li>
                Amount: <strong>{tob}€</strong>
              </li>
              <li>
                Communication:{" "}
                <strong>
                  TOB{" "}
                  {ssn.length > 0 ? (
                    ssn.replace(/[.-\s]/g, "")
                  ) : (
                    <span className="text-red-600">
                      [Your Social Security Number]
                    </span>
                  )}{" "}
                  {purchaseDate.getMonth() + 1}/{purchaseDate.getFullYear()}
                </strong>
              </li>
            </ul>
          </div>
        </div>
        <button
          className="bg-blue-700 text-white rounded py-1 px-4 hover:bg-blue-900 inline-block self-center mt-4"
          onClick={() => setActiveStep(activeStep + 1)}
        >
          Next: Email &rarr;
        </button>
      </div>
      <div className="md:w-1/2 hidden md:block">
        <img
          src={WireImage}
          alt="Wire the TOB"
          className="w-1/2 mx-auto my-8"
        />
      </div>
    </div>
  );
};

export default Payment;
