import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { lastESPPDay } from "./helper/helpers";
import Stepper from "./components/Stepper";
import Transaction from "./steps/Transaction";
import Form from "./steps/Form";

function App() {
  const [language, setLanguage] = useState("fr");
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [purchaseDate, setPurchaseDate] = useState(lastESPPDay(new Date()));
  const [tob, setTob] = useState(0);
  const [euroPurchasePrice, setEuroPurchasePrice] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  return (
    <>
      <NavBar language={language} setLanguage={setLanguage} />
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
                />
              ),
            },
            { title: "Form", content: <Form /> },
            { title: "Payment" },
            { title: "Email" },
          ]}
          active={activeStep}
          setActive={setActiveStep}
        />
      </div>
    </>
  );
}

export default App;
