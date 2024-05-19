import translations from "../helper/translations";
import AttachmentImage from "../assets/attach-file.png";
import { handleCopy } from "../helper/helpers";

const EmailView = ({ language, purchaseDate, tob, ssn, address, name }) => {
  const CopyToClipboard = (element) => {
    var doc = document,
      text = doc.getElementById(element),
      range,
      selection;

    if (doc.body.createTextRange) {
      range = doc.body.createTextRange();
      range.moveToElementText(text);
      range.select();
    } else if (window.getSelection) {
      selection = window.getSelection();
      range = doc.createRange();
      range.selectNodeContents(text);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
  };

  return (
    <div className="rounded-2xl shadow-md mx-auto flex-col ">
      <div className="bg-gray-100 rounded-t-xl py-2 px-4">
        <strong>New email</strong>
      </div>
      <div className="py-1 px-4 border-b-2">From: You</div>
      <div className="py-1 px-4 border-b-2">
        To:{" "}
        <strong
          className="cursor-pointer hover:text-gray-600"
          onClick={handleCopy("CPIC.TAXDIV@minfin.fed.be")}
        >
          CPIC.TAXDIV@minfin.fed.be
        </strong>
      </div>
      <div className="py-1 px-4 border-b-2">
        Subject:{" "}
        <strong
          className="cursor-pointer hover:text-gray-600"
          onClick={handleCopy(translations.emailSubject[language])}
        >
          {translations.emailSubject[language]}
        </strong>
      </div>
      <div
        className="py-2 px-4"
        id="emailBody"
        onClick={() => CopyToClipboard("emailBody")}
      >
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
        {ssn.length > 0 ? (
          ssn
        ) : (
          <span className="text-red-600">[Your Social Security Number]</span>
        )}
        <br />
        {translations.name[language]}:{" "}
        {name.length > 0 ? (
          name
        ) : (
          <span className="text-red-600">[Your full name]</span>
        )}
        <br />
        {translations.address[language]}:{" "}
        {address.length > 0 ? (
          address
        ) : (
          <span className="text-red-600">[Your address]</span>
        )}
        <br />
        {translations.amount[language]}: {tob}€
        <br />
        {translations.communication[language]}: TOB{" "}
        {ssn.length > 0 ? (
          ssn.replace(/[.-\s]/g, "")
        ) : (
          <span className="text-red-600">[Your Social Security Number]</span>
        )}{" "}
        {purchaseDate.getMonth() + 1}/{purchaseDate.getFullYear()} (
        {translations.seeAttached[language]}).
      </div>
      <span className="text-red-600 px-4">[Your signature]</span>
      <br />
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

export default EmailView;
