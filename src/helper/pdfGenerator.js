import PDFNL from "../assets/tob-nl.pdf";
import PDFFR from "../assets/tob-fr.pdf";
import PDFEN from "../assets/tob-en.pdf";
import { PDFDocument, rgb } from "pdf-lib";

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
};

async function generatePdf(setPdf, language, date, euroAmount, tob) {
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

  firstPage.drawText(month + " " + year, {
    ...position.titleDate[language],
    size: 13,
    color: color,
  });

  firstPage.drawText("1", {
    ...position.amount[language],
    size: 16,
    color: color,
  });

  firstPage.drawRectangle({
    ...position.euroAmountRect[language],
    color: rgb(1, 1, 1),
  });

  firstPage.drawText(euroAmount.toString(), {
    ...position.euroAmount[language],
    size: 16,
    color: color,
  });

  firstPage.drawRectangle({
    ...position.tobRect[language],
    color: rgb(1, 1, 1),
  });

  firstPage.drawText(tob.toString(), {
    ...position.tob[language],
    size: 16,
    color: color,
  });

  firstPage.drawRectangle({
    ...position.subTotalRect[language],
    color: rgb(1, 1, 1),
  });

  firstPage.drawText(tob.toString(), {
    ...position.subTotal[language],
    size: 16,
    color: color,
  });

  secondPage.drawRectangle({
    ...position.totalRect[language],
    color: rgb(1, 1, 1),
  });

  secondPage.drawText(tob.toString(), {
    ...position.total[language],
    size: 16,
    color: color,
  });

  const pdfBytes = await pdfDoc.save();
  const bytes = new Uint8Array(pdfBytes);
  const blob = new Blob([bytes], { type: "application/pdf" });
  const docUrl = URL.createObjectURL(blob);
  setPdf(docUrl);
}

export default generatePdf;
