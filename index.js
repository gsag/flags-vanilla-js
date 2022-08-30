(async () => {
  const setContainerInnerHtml = (str) => document.querySelector(".country-list-container").innerHTML = str;
  setContainerInnerHtml("Loading...");

  const countryRawData = await (await fetch("https://restcountries.com/v3.1/all")).json();
  const countryMappedData = countryRawData.map(country => ({
    name: country.name,
    region: country.region,
    subregion: country.subregion,
    capital: country.capital,
    flags: country.flags 
  }))

  const renderTemplate = (countryList) => {
    return `
    <h1>Country List</h1>
    <ul class="country-list">
      ${countryList.map(country => `
        <li class="country-list__item">
          <img src="${country.flags.png}"/>
          <span class="${country.region}">${country.name.common}</span>
        </li>
      `).join("")}
    </ul>`
  }
  
  setContainerInnerHtml(renderTemplate(countryMappedData));
})();
