import PDFNL from "../assets/tob-nl.pdf";
import PDFFR from "../assets/tob-fr.pdf";
import PDFEN from "../assets/tob-en.pdf";
import { useEffect, useState } from "react";
import generatePDF from "../helper/pdfGenerator";
import { IMaskInput } from "react-imask";

const Form = ({
  language,
  purchaseDate,
  euroPurchasePrice,
  tob,
  activeStep,
  setActiveStep,
  name,
  setName,
  ssn,
  setSsn,
  address,
  setAddress,
  location,
  setLocation,
}) => {
  const [pdf, setPdf] = useState(
    language === "nl" ? PDFNL : language === "fr" ? PDFFR : PDFEN
  );

  useEffect(() => {
    generatePDF(
      setPdf,
      language,
      purchaseDate,
      euroPurchasePrice,
      tob,
      ssn,
      name,
      address,
      location
    );
  }, [
    language,
    tob,
    purchaseDate,
    euroPurchasePrice,
    ssn,
    name,
    address,
    location,
  ]);

  return (
    <div className="flex mt-4 md:space-x-12 flex-col md:flex-row">
      <div className="md:w-1/2 flex flex-col">
        <h2 className="text-2xl mb-4">
          Autofill personal info in the PDF
          <span className="text-red-500 my-0 text-xs">(Optional)</span>
        </h2>

        <div className="my-1">
          <label htmlFor="purchasePrice">Social Security Number (SSN)</label>
          <IMaskInput
            mask="00.00.00-000.00"
            name="ssn"
            id="ssn"
            className="w-full bg-slate-100 rounded h-12 px-2 my-2"
            placeholder="##.##.##-###.##"
            onChange={(e) => setSsn(e.target.value)}
            value={ssn}
          />
        </div>
        <div className="my-1">
          <label htmlFor="purchaseDate">Full name</label>
          <input
            name="name"
            id="name"
            className={`w-full bg-slate-100 rounded h-12 px-2 my-2`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="my-1">
          <label htmlFor="purchaseDate">
            Address (separate lines with a coma ",")
          </label>
          <input
            name="address"
            id="address"
            className={`w-full bg-slate-100 rounded h-12 px-2 my-2`}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="my-1">
          <label htmlFor="currentLocation">
            Current location (for signature)
          </label>
          <input
            name="location"
            id="location"
            className={`w-full bg-slate-100 rounded h-12 px-2 my-2`}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="my-1 bg-red-500 text-white px-4 py-2 rounded">
          Do not forget to <strong>validate</strong> and <strong>sign</strong>{" "}
          the form.
        </div>

        <a
          className="bg-blue-700 text-white rounded py-1 px-4 hover:bg-blue-900 inline-block self-center mt-4"
          href={pdf}
          download="tob-form.pdf"
          target="_blank"
          rel="noreferrer"
          onClick={() => setActiveStep(activeStep + 1)}
        >
          Download and move to next step &rarr;
        </a>
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
