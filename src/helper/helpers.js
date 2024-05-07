function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
}

function lastESPPDay(currentDate) {
  const previousMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    1
  );
  const lastDayOfPreviousMonth = new Date(
    previousMonth.getFullYear(),
    previousMonth.getMonth() + 1,
    0
  );
  let lastWorkingDate = new Date(lastDayOfPreviousMonth);

  while (
    lastWorkingDate.getDay() === 0 ||
    lastWorkingDate.getDay() === 6 ||
    ![2, 5, 8, 11].includes(lastWorkingDate.getMonth())
  ) {
    lastWorkingDate.setDate(lastWorkingDate.getDate() - 1);
  }

  if (lastWorkingDate === new Date("2024-03-29")) {
    lastWorkingDate = new Date("2024-03-28");
  }

  return lastWorkingDate;
}

function getExchangeRate(date) {
  const startPeriod = formatDate(date);
  const endPeriod = formatDate(date);
  const url = `https://data-api.ecb.europa.eu/service/data/EXR/D.USD.EUR.SP00.A?startPeriod=${startPeriod}&endPeriod=${endPeriod}`;

  return fetch(url, {
    headers: {
      Accept: "application/xml", // Add the Accept header to accept XML response
    },
  })
    .then((response) => response.text()) // Use response.text() instead of response.json() to parse XML response
    .then((data) => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, "application/xml");
      const resultExRate = xml
        .getElementsByTagName("generic:ObsValue")[0]
        .getAttribute("value");
      return resultExRate;
    })
    .catch(() => {
      return null;
    });
}

function roundToTwoDecimals(num) {
  return Math.round(num * 100) / 100;
}

module.exports = {
  formatDate,
  lastESPPDay,
  getExchangeRate,
  roundToTwoDecimals,
};
