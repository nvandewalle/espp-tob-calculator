import PDFNL from "../assets/tob-nl.pdf";
import PDFFR from "../assets/tob-fr.pdf";
import PDFEN from "../assets/tob-en.pdf";
import { PDFDocument, rgb } from "pdf-lib";
import translations from "./translations";

const today = new Date();
const color = rgb(0.1, 0.33, 0.6);
const position = {
  titleDate: {
    fr: {
      x: 278,
      y: 689,
    },
    nl: {
      x: 268,
      y: 689,
    },
    en: {
      x: 271,
      y: 724,
    },
  },
  ssn: {
    fr: {
      x: 305,
      y: 586,
    },
    nl: {
      x: 305,
      y: 586,
    },
    en: {
      x: 302,
      y: 656,
    },
  },
  name: {
    fr: {
      x: 305,
      y: 574,
    },
    nl: {
      x: 305,
      y: 574,
    },
    en: {
      x: 302,
      y: 643,
    },
  },
  addressLine1: {
    fr: {
      x: 305,
      y: 550,
    },
    nl: {
      x: 305,
      y: 550,
    },
    en: {
      x: 302,
      y: 619,
    },
  },
  addressLine2: {
    fr: {
      x: 305,
      y: 538,
    },
    nl: {
      x: 305,
      y: 538,
    },
    en: {
      x: 302,
      y: 607,
    },
  },
  amount: {
    fr: {
      x: 245,
      y: 458,
    },
    nl: {
      x: 250,
      y: 435,
    },
    en: {
      x: 240,
      y: 458,
    },
  },
  euroAmount: {
    fr: {
      x: 285,
      y: 458,
    },
    nl: {
      x: 300,
      y: 435,
    },
    en: {
      x: 300,
      y: 458,
    },
  },
  euroAmountRect: {
    fr: { x: 270, y: 454, width: 124, height: 21 },
    nl: { x: 276, y: 431, width: 124, height: 20 },
    en: { x: 270, y: 454, width: 124, height: 21 },
  },
  tob: {
    fr: {
      x: 450,
      y: 458,
    },
    nl: {
      x: 450,
      y: 435,
    },
    en: {
      x: 450,
      y: 458,
    },
  },
  tobRect: {
    fr: { x: 405, y: 454, width: 124, height: 21 },
    nl: { x: 410, y: 431, width: 124, height: 20 },
    en: { x: 405, y: 454, width: 124, height: 21 },
  },
  subTotal: {
    fr: {
      x: 450,
      y: 380,
    },
    nl: {
      x: 450,
      y: 335,
    },
    en: {
      x: 450,
      y: 325,
    },
  },
  subTotalRect: {
    fr: { x: 405, y: 374, width: 124, height: 21 },
    nl: { x: 410, y: 327, width: 124, height: 20 },
    en: { x: 405, y: 320, width: 124, height: 21 },
  },
  total: {
    fr: {
      x: 350,
      y: 452,
    },
    nl: {
      x: 360,
      y: 410,
    },
    en: {
      x: 360,
      y: 365,
    },
  },
  totalRect: {
    fr: { x: 320, y: 448, width: 124, height: 21 },
    nl: { x: 325, y: 405, width: 124, height: 21 },
    en: { x: 320, y: 360, width: 124, height: 21 },
  },
  location: {
    fr: {
      x: 80,
      y: 311,
    },
    nl: {
      x: 84,
      y: 266,
    },
    en: {
      x: 85,
      y: 255,
    },
  },
  date: {
    fr: {
      x: 380,
      y: 311,
    },
    nl: {
      x: 384,
      y: 266,
    },
    en: {
      x: 200,
      y: 255,
    },
  },
  nameForSignature: {
    fr: {
      x: 75,
      y: 285,
    },
    nl: {
      x: 80,
      y: 246,
    },
    en: {
      x: 285,
      y: 295,
    },
  },
  quality: {
    fr: {
      x: 75,
      y: 265,
    },
    nl: {
      x: 80,
      y: 230,
    },
    en: {
      x: 285,
      y: 280,
    },
  },
};

async function generatePdf(
  setPdf,
  language,
  date,
  euroAmount,
  tob,
  ssn,
  name,
  address,
  location
) {
  let PDF;
  switch (language) {
    case "nl":
      PDF = PDFNL;
      break;
    case "fr":
      PDF = PDFFR;
      break;
    case "en":
      PDF = PDFEN;
      break;
    default:
      PDF = PDFNL;
  }

  const existingPdfBytes = await fetch(PDF).then((res) => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const secondPage = pages[1];

  let month = date.getMonth() + 1;
  month = month < 10 ? "0" + month : month;
  const year = date.getFullYear().toString().substr(-2);

  // Date on top
  firstPage.drawText(month + " " + year, {
    ...position.titleDate[language],
    size: 13,
    color: color,
  });

  // SSN
  firstPage.drawText(ssn, {
    ...position.ssn[language],
    size: 13,
    color: color,
  });

  // Name
  firstPage.drawText(name, {
    ...position.name[language],
    size: 13,
    color: color,
  });

  // Address line 1
  firstPage.drawText(address.split(",")[0], {
    ...position.addressLine1[language],
    size: 13,
    color: color,
  });

  if (address.split(",").length > 1) {
    // Address line 2
    firstPage.drawText(address.split(",")[1].trim(), {
      ...position.addressLine2[language],
      size: 13,
      color: color,
    });
  }

  // 1 in 1st column
  firstPage.drawText("1", {
    ...position.amount[language],
    size: 16,
    color: color,
  });

  // Euro full amount
  firstPage.drawRectangle({
    ...position.euroAmountRect[language],
    color: rgb(1, 1, 1),
  });

  firstPage.drawText(euroAmount.toString(), {
    ...position.euroAmount[language],
    size: 16,
    color: color,
  });

  // Tob amount
  firstPage.drawRectangle({
    ...position.tobRect[language],
    color: rgb(1, 1, 1),
  });

  firstPage.drawText(tob.toString(), {
    ...position.tob[language],
    size: 16,
    color: color,
  });

  // Sub-total below table
  firstPage.drawRectangle({
    ...position.subTotalRect[language],
    color: rgb(1, 1, 1),
  });

  firstPage.drawText(tob.toString(), {
    ...position.subTotal[language],
    size: 16,
    color: color,
  });

  // Total amount on page 2
  secondPage.drawRectangle({
    ...position.totalRect[language],
    color: rgb(1, 1, 1),
  });

  secondPage.drawText(tob.toString(), {
    ...position.total[language],
    size: 16,
    color: color,
  });

  // Location of the user
  secondPage.drawText(location, {
    ...position.location[language],
    size: 13,
    color: color,
  });

  // Today's date in the DD/MM/YYYY format
  secondPage.drawText(
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear(),
    {
      ...position.date[language],
      size: 13,
      color: color,
    }
  );

  // Name for signature
  secondPage.drawText(name, {
    ...position.nameForSignature[language],
    size: 13,
    color: color,
  });

  // Quality of the user
  secondPage.drawText(translations.userQuality[language], {
    ...position.quality[language],
    size: 13,
    color: color,
  });

  const pdfBytes = await pdfDoc.save();
  const bytes = new Uint8Array(pdfBytes);
  const blob = new Blob([bytes], { type: "application/pdf" });
  const docUrl = URL.createObjectURL(blob);
  setPdf(docUrl);
}

export default generatePdf;
