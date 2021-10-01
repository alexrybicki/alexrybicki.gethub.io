GetSevere();
//**

rp(options)
  .then(($) => {
    let warning = $('#governmentAlert').text();
    let current = $('span.summary.swap').text();
    let weather = $('span.currently__summary.next.swap').text();
    let high = $('span.high-temp-text').text();
    let low = $('span.low-temp-text').text();
    let humidity = $('span.humidity__value').text();
    let summary = $('#week > div.summary').text();

    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    let timeNow = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

    function res() {
      console.clear();
      //aqi = parseInt(aqi);
      //AQI_Forecast = AQI_Forecast.slice(0,-7);
      if (loadTime != '0' ) {console.log(colors.grey('Load Time: ' + (loadTime * 50 ) + ' ms'));}
      console.log(colors.grey(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds));
      console.log("\n\t" + colors.cyan(weather.replace(/          /gm, '').replace(/\n/gm, '')));
      console.log("\n\t" + colors.cyan(summary.replace(/          /gm, '').replace(/\n/gm, '')));
      if (warning) { (console.log("\t" + colors.brightRed(warning.replace(/          /gm, '').replace(/        /gm, '').replace(/\n/gm, ''))));}
      else {console.log('')};
      console.log(colors.cyan("\n\t\t" + guideline_text));
      if ( aqi <= 50 ) {console.log(colors.cyan("\n\t\tMeasured AQI: ") + chalk.greenBright(aqi + " Good" ));}
      else if (( aqi >= 51 ) && (aqi <= 100 ))  {console.log(colors.cyan("\n\t\tMeasured AQI: ") + colors.brightYellow(aqi + " Moderate")); }
      else if (( aqi >= 101 ) && (aqi <= 150 )) {console.log(colors.cyan("\n\t\tMeasured AQI: ") + chalk.keyword('orange').underline(aqi + " Unhealthy for Sensitive Groups")); }
      else if (( aqi >= 151 ) && (aqi <= 200 )) {console.log(colors.cyan("\n\t\tMeasured AQI: ") + colors.brightRed.underline.bold(aqi + " Unhealthy")); }
      else if (( aqi >= 201 ) && (aqi <= 300 )) {console.log(colors.cyan("\n\t\tMeasured AQI: ") + chalk.keyword('purple').underline.bold(aqi+ " Very Unhealthy")); }
      else if ( aqi >= 300 ) { console.log(colors.cyan("\n\t\tMeasured AQI: ")+  chalk.keyword('indigo').underline.bold(aqi + " Hazardous" ));}
      else {console.log(colors.cyan("\n\t\tMeasured AQI: ")+ colors.brightCyan(aqi));}
      // console.log(colors.white(AQI_Date));
      console.log(colors.cyan("\t\tAQI Updated at:" + aqi_time));

      if ( AQI_Forecast <= 50 ) {console.log(colors.cyan("\t\tForecasted: ") + colors.brightGreen(AQI_Forecast + " Good" ));}
      else if (( AQI_Forecast >= 51 ) &&  (AQI_Forecast <= 100 )) {console.log(colors.cyan("\t\tForecasted: ") + colors.brightYellow(AQI_Forecast + " Moderate")); }
      else if (( AQI_Forecast >= 101 ) && (AQI_Forecast <= 150 )) {console.log(colors.cyan("\t\tForecasted: ") + chalk.keyword('orange').underline(AQI_Forecast + " Unhealthy for Sensitive Groups")); }
      else if (( AQI_Forecast >= 151 ) && (AQI_Forecast <= 200 )) {console.log(colors.cyan("\t\tForecasted: ") + colors.brightRed.underline(AQI_Forecast + " Unhealthy")); }
      else if (( AQI_Forecast >= 201 ) && (AQI_Forecast <= 300 )) {console.log(colors.cyan("\t\tForecasted: ") + chalk.keyword('purple').underline.bold(AQI_Forecast + " Very Unhealthy")); }
      else if ( aqi >= 300 ) { console.log(colors.cyan("\t\tMeasured AQI: ") + chalk.keyword('indigo').underline(aqi + " Hazardous" ));}
      else {console.log(colors.cyan("\t\tMeasured AQI: ")+ colors.brightCyan(aqi));}

      console.log(colors.cyan("\t\tHumidity: ") + colors.brightCyan(humidity + colors.cyan("%")));

      console.log(colors.white("\n\tHigh: ") + colors.brightRed(high) +
        colors.white("\n\tNow:  ") + colors.brightYellow(current) +
        colors.white("\n\tLow:  ") + colors.brightCyan(low) + "\n");
      severeWeather = (severeWeather).replace(/\n/gm, " ");
        console.log(colors.dim(colors.grey(severeWeather).replace(/\u002A/gm, "\n *")));

      console.log(colors.dim(colors.grey("\nPress any key to exit...")));
      process.stdin.setRawMode(true);
      process.stdin.resume();
      process.stdin.on('data', process.exit.bind(process, 0));
      if (warning.length == 0) {
        var fileWarning = '';
      } else {
        var fileWarning = '\n\t' + warning.replace(/          /gm, '').replace(/        /gm, '').replace(/\n/gm, '').replace(/      /gm, '');
      }
      let fileContent = (timeNow + fileWarning + '\n' + current + '\n' + (weather).replace(/          /gm, '').replace(/        /gm, '').replace(/\n/gm, ''));
      fs.writeFile('weather.txt', fileContent, (err) => {
        if (err) throw err;
      });
    }

    function Check() {
      var checkInterval = 50;
      var checkTimeout = 50;
      if (isNaN(parseInt(aqi))) { 
        let waitForResponse = setTimeout(Check, checkInterval); 
        checkItt = checkItt + 1; 
        loadTime = checkItt;
        if (checkItt >= checkTimeout) { 
          clearTimeout(waitForResponse);
          console.log("Timeout");
          console.log(colors.dim(colors.grey("\nPress any key to exit...")));
          process.stdin.setRawMode(true);
          process.stdin.resume();
          process.stdin.on('data', process.exit.bind(process, 0));
        }
      }
      else { res(); }
    }
    Check();
  })
  .catch((err) => {
    console.log(err);
  });
