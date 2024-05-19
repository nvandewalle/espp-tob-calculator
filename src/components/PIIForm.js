import { IMaskInput } from "react-imask";

const PIIForm = ({ ssn, setSsn, name, setName, address, setAddress }) => {
  return (
    <>
      <h2 className="text-2xl mb-4">
        Autofill info{" "}
        <span className="text-red-500 my-0 text-xs">(Optional)</span>
      </h2>

      <div className="my-4">
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
      <div className="my-4">
        <label htmlFor="purchaseDate">Full name</label>
        <input
          name="name"
          id="name"
          className={`w-full bg-slate-100 rounded h-12 px-2 my-2`}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="my-4">
        <label htmlFor="purchaseDate">Address</label>
        <input
          name="address"
          id="address"
          className={`w-full bg-slate-100 rounded h-12 px-2 my-2`}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
    </>
  );
};

export default PIIForm;
