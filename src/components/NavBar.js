import React from "react";

const NavBar = ({ language = "fr", setLanguage }) => {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <h1 className="text-xl">ESPP TOB Calculator</h1>
          <div>
            <button
              className={`px-2 py-1 rounded mx-1 ${
                language === "fr" ? "bg-gray-600" : ""
              }`}
              onClick={() => setLanguage("fr")}
            >
              FR
            </button>
            <button
              className={`px-2 py-1 mx-1 rounded ${
                language === "nl" ? "bg-gray-600" : ""
              }`}
              onClick={() => setLanguage("nl")}
            >
              NL
            </button>
            <button
              className={`px-2 py-1 mx-1 rounded ${
                language === "en" ? "bg-gray-600" : ""
              }`}
              onClick={() => setLanguage("en")}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
