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
console.log(countryMappedData)
  const renderTemplate = (countryList) => {
    return `
    <h1>Country List</h1>
    <ul class="country-list">
      ${countryList.map(country => `
        <li class="country-list__card ${country.region}">
          <div class="country-list__flag">
            <div class="country-list__flag--front">
              <img src="${country.flags.svg}"/>
            </div>
            <div class="country-list__flag--flipped">
              <span>${country.name.common}</span>
              <span>${country.name.official}</span>
              <span>${country.capital}</span>
              <span>${country.region}</span>
              <span>${country.subregion}</span>
            </div>
          </div>
        </li>
      `).join("")}
    </ul>`
  }
  
  setContainerInnerHtml(renderTemplate(countryMappedData));
})();
