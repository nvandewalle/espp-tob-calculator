import { useState } from "react";
import EmailView from "../components/EmailView";
import PIIForm from "../components/PIIForm";

const Email = ({ language, purchaseDate, tob }) => {
  const [ssn, setSsn] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  return (
    <div className="flex mt-4 md:space-x-12 flex-col md:flex-row">
      <div className="md:w-1/3">
        <PIIForm
          ssn={ssn}
          setSsn={setSsn}
          name={name}
          setName={setName}
          address={address}
          setAddress={setAddress}
        />
      </div>
      <div className="md:w-2/3">
        <EmailView
          language={language}
          purchaseDate={purchaseDate}
          tob={tob}
          ssn={ssn}
          address={address}
          name={name}
        />
      </div>
    </div>
  );
};

export default Email;
