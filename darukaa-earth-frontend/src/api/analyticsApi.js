export const fetchCarbonData = async () => {
  const res = await fetch(
    "https://api.worldbank.org/v2/country/IND/indicator/EN.ATM.CO2E.KT?format=json"
  );
  const json = await res.json();

  return json[1]
    .filter(d => d.value !== null)
    .slice(0, 10)
    .reverse();
};
