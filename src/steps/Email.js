import translations from "../helper/translations";
import AttachmentImage from "../assets/attach-file.png";

const Email = ({ language, purchaseDate, tob }) => {
  return (
    <div className="md:w-2/3  rounded-2xl shadow-md mx-auto flex-col ">
      <div className="bg-gray-100 rounded-t-xl py-2 px-4">
        <strong>New email</strong>
      </div>
      <div className="py-1 px-4 border-b-2">From: You</div>
      <div className="py-1 px-4 border-b-2">
        To: <strong>CPIC.TAXDIV@minfin.fed.be</strong>
      </div>
      <div className="py-1 px-4 border-b-2">
        Subject: <strong>{translations.emailSubject[language]}</strong>
      </div>
      <div className="py-2 px-4">
        {translations.dear[language]},
        <br />
        <br />
        {translations.emailIntro[language]}
        {"  "}
        {translations.months[purchaseDate.getMonth() + 1][language]}{" "}
        {purchaseDate.getFullYear()}
        {language === "nl" && " "}
        {translations.emailIntroContinued[language]}.
        <br />
        {translations.ssn[language]}:{" "}
        <span className="text-red-600">[Your Social Security Number]</span>
        <br />
        {translations.name[language]}:{" "}
        <span className="text-red-600">[Your full name]</span>
        <br />
        {translations.address[language]}:{" "}
        <span className="text-red-600">[Your address]</span>
        <br />
        {translations.amount[language]}: {tob}€
        <br />
        {translations.communication[language]}: TOB{" "}
        <span className="text-red-600">[Your Social Security Number]</span>{" "}
        {purchaseDate.getMonth() + 1}/{purchaseDate.getFullYear()} (
        {translations.seeAttached[language]})
        <br />
        <br />
        <span className="text-red-600">[Your signature]</span>
        <br />
      </div>
      <div className="py-2 px-4 mt-4">
        Attachments:
        <ul className="flex flex-row my-2">
          <li className="bg-slate-100 px-4 py-2 rounded-md me-2 shadow hover:bg-slate-200 flex flex-row items-center">
            <img src={AttachmentImage} alt="attachment" className="h-6 me-2" />
            TOB declaration
          </li>
          <li className="bg-slate-100 px-4 py-2 rounded-md me-2 shadow hover:bg-slate-200 flex flex-row items-center">
            <img src={AttachmentImage} alt="attachment" className="h-6 me-2" />
            <span>Proof of payment</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Email;
