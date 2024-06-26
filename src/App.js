import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { lastESPPDay } from "./helper/helpers";
import Stepper from "./components/Stepper";
import Transaction from "./steps/Transaction";
import Payment from "./steps/Payment";
import Email from "./steps/Email";
// import OldForm from "./steps/OldForm";
import Form from "./steps/Form";

function App() {
  const [language, setLanguage] = useState("en");
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [purchaseDate, setPurchaseDate] = useState(lastESPPDay(new Date()));
  const [tob, setTob] = useState(0);
  const [euroPurchasePrice, setEuroPurchasePrice] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [ssn, setSsn] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");

  const [isValid, setIsValid] = useState(false);

  return (
    <>
      <NavBar
        language={language}
        setLanguage={setLanguage}
        activeStep={activeStep}
      />
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 m-4 mb-16">
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
                  name={name}
                  setName={setName}
                  address={address}
                  setAddress={setAddress}
                  ssn={ssn}
                  setSsn={setSsn}
                  location={location}
                  setLocation={setLocation}
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
                  ssn={ssn}
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
                  ssn={ssn}
                  setSsn={setSsn}
                  name={name}
                  setName={setName}
                  address={address}
                  setAddress={setAddress}
                />
              ),
              disable: !isValid,
            },
          ]}
          active={activeStep}
          setActive={setActiveStep}
        />
      </div>
      <footer className="text-center py-2 fixed bottom-0 w-full bg-gray-200">
        None of the data you enter on this website is retained. If you refresh
        the page, everything will be lost. For any question or feedback, reach out to Nicolas van de Walle.
      </footer>
    </>
  );
}

export default App;
