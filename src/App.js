import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { lastESPPDay } from "./helper/helpers";
import Stepper from "./components/Stepper";
import Transaction from "./steps/Transaction";
import Form from "./steps/Form";
import Payment from "./steps/Payment";
import Email from "./steps/Email";

function App() {
  const [language, setLanguage] = useState("fr");
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [purchaseDate, setPurchaseDate] = useState(lastESPPDay(new Date()));
  const [tob, setTob] = useState(0);
  const [euroPurchasePrice, setEuroPurchasePrice] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const [isValid, setIsValid] = useState(false);

  return (
    <>
      <NavBar
        language={language}
        setLanguage={setLanguage}
        activeStep={activeStep}
      />
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 m-4">
        {/* <div className="bg-red-200 rounded px-4 py-2">
          None of the data you enter on this website is retained. If you refresh
          the page, everything will be lost.
        </div> */}
        <Stepper
          steps={[
            {
              title: "Transaction",
              content: (
                <Transaction
                  purchasePrice={purchasePrice}
                  setPurchasePrice={setPurchasePrice}
                  purchaseDate={purchaseDate}
                  setPurchaseDate={setPurchaseDate}
                  tob={tob}
                  setTob={setTob}
                  euroPurchasePrice={euroPurchasePrice}
                  setEuroPurchasePrice={setEuroPurchasePrice}
                  isValid={isValid}
                  setIsValid={setIsValid}
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                />
              ),
              disable: false,
            },
            {
              title: "Form",
              content: (
                <Form
                  language={language}
                  purchaseDate={purchaseDate}
                  euroPurchasePrice={euroPurchasePrice}
                  tob={tob}
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                />
              ),
              disable: !isValid,
            },
            {
              title: "Payment",
              content: (
                <Payment
                  tob={tob}
                  language={language}
                  purchaseDate={purchaseDate}
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                />
              ),
              disable: !isValid,
            },
            {
              title: "Email",
              content: (
                <Email
                  language={language}
                  purchaseDate={purchaseDate}
                  tob={tob}
                />
              ),
              disable: !isValid,
            },
          ]}
          active={activeStep}
          setActive={setActiveStep}
        />
      </div>
    </>
  );
}

export default App;
