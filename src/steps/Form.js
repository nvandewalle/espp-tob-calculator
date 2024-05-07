import ESPPFR from "../assets/espp-fr.png";
import ESPPNL from "../assets/espp-nl.png";

const Form = ({ language, purchaseDate, euroPurchasePrice, tob }) => {
  return (
    <div className="flex mt-4 md:space-x-12 flex-col md:flex-row">
      <div className="md:w-1/2 bg-blue-50 shadow-md rounded-xl p-4 flex flex-col">
        <h2 className="text-2xl mb-4 mx-auto">Filling in the form</h2>
        <div>
          Download the form:
          <a
            href="https://finances.belgium.be/sites/default/files/TD-OB1-FR.pdf"
            className="bg-blue-700 text-white rounded py-1 px-2 mx-2 hover:bg-blue-900 inline-block"
            target="_blank"
            rel="noreferrer noopener"
          >
            French version
          </a>
          <a
            href="https://finances.belgium.be/sites/default/files/TD-OB1-NL.pdf"
            className="bg-blue-700 text-white rounded py-1 px-2 mx-2 hover:bg-blue-900 inline-block"
            target="_blank"
            rel="noreferrer noopener"
          >
            Dutch version
          </a>
        </div>
        Information to provide:
        <ul className="list-disc list-inside">
          <li>
            A:{" "}
            <strong>
              {purchaseDate.getMonth() + 1}/{purchaseDate.getFullYear()}
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
      <div className="md:w-1/2">
        {language === "fr" && (
          <img src={ESPPFR} alt="ESPP Français" className="w-full" />
        )}
        {language === "nl" && (
          <img src={ESPPNL} alt="ESPP Nederlands" className="w-full" />
        )}
      </div>
    </div>
  );
};

export default Form;
