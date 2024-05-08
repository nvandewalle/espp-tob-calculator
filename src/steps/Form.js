import ESPPFR from "../assets/espp-fr.png";
import ESPPNL from "../assets/espp-nl.png";
import ESPPEN from "../assets/espp-en.png";

const Form = ({
  language,
  purchaseDate,
  euroPurchasePrice,
  tob,
  activeStep,
  setActiveStep,
}) => {
  return (
    <div className="flex mt-4 md:space-x-12 flex-col md:flex-row">
      <div className="md:w-1/2 flex flex-col">
        <div className="bg-blue-50 shadow-md rounded-xl p-4 flex flex-col">
          <h2 className="text-2xl mb-4 mx-auto">Filling in the form</h2>
          <div>
            Download the form:
            <a
              href="https://finances.belgium.be/sites/default/files/TD-OB1-FR.pdf"
              className="bg-blue-700 text-white rounded py-1 px-2 mx-2 hover:bg-blue-900 inline-block"
              target="_blank"
              rel="noreferrer noopener"
            >
              FR
            </a>
            <a
              href="https://finances.belgium.be/sites/default/files/TD-OB1-NL.pdf"
              className="bg-blue-700 text-white rounded py-1 px-2 mx-2 hover:bg-blue-900 inline-block"
              target="_blank"
              rel="noreferrer noopener"
            >
              NL
            </a>
            <a
              href="https://finance.belgium.be/sites/default/files/Changement%20de%20compte%20formulaire%20TOB%20EN.pdf"
              className="bg-blue-700 text-white rounded py-1 px-2 mx-2 hover:bg-blue-900 inline-block"
              target="_blank"
              rel="noreferrer noopener"
            >
              EN
            </a>
          </div>

          <div className="mt-8">
            Fill it in with the following information:
            <ul className="list-disc list-inside">
              <li>
                A:{" "}
                <strong>
                  {purchaseDate.getMonth() + 1}/
                  {purchaseDate.getFullYear().toString().slice(-2)}
                </strong>
              </li>
              <li>
                B: <strong>{euroPurchasePrice}</strong>€
              </li>
              <li>
                C: <strong>{tob}</strong>€
              </li>
            </ul>
          </div>
        </div>

        <button
          className="bg-blue-700 text-white rounded py-1 px-4 hover:bg-blue-900 inline-block self-center mt-4"
          onClick={() => setActiveStep(activeStep + 1)}
        >
          Next: Tax Paiement &rarr;
        </button>
      </div>
      <div className="md:w-1/2 mt-4 md:mt-0">
        {language === "fr" && (
          <img src={ESPPFR} alt="ESPP Français" className="w-full" />
        )}
        {language === "nl" && (
          <img src={ESPPNL} alt="ESPP Nederlands" className="w-full" />
        )}
        {language === "en" && (
          <img src={ESPPEN} alt="ESPP English" className="w-full" />
        )}
      </div>
    </div>
  );
};

export default Form;
