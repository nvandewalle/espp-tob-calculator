import PDFNL from "../assets/tob-nl.pdf";
import PDFFR from "../assets/tob-fr.pdf";
import PDFEN from "../assets/tob-en.pdf";
import { useEffect, useState } from "react";
import generatePDF from "../helper/pdfGenerator";

const Form = ({
  language,
  purchaseDate,
  euroPurchasePrice,
  tob,
  activeStep,
  setActiveStep,
}) => {
  const [pdf, setPdf] = useState(
    language === "nl" ? PDFNL : language === "fr" ? PDFFR : PDFEN
  );
  useEffect(() => {
    generatePDF(setPdf, language, purchaseDate, euroPurchasePrice, tob);
  }, [language, tob, purchaseDate, euroPurchasePrice]);

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
        <iframe
          src={pdf}
          type="application/pdf"
          title="pdf"
          className="w-full aspect-square"
        />
      </div>
    </div>
  );
};

export default Form;
