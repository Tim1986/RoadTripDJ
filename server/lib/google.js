const googleMapsClient = require('@google/maps').createClient({
  key     : process.env.GOOGLEAPI,
  Promise : Promise
});

const google = {
  // -----------------------------------------
  // STEP 3: Pass our city points to geoDataLoop
  // -----------------------------------------

  startGeo    : (start, end) => {
    console.log(start, end);
    return google.geoDataLoop([start, end]).then((posData) => {
      return Promise.all([posData, google.getDistance(posData[0], posData[1])]);
    });
  },

  // -----------------------------------------
  // STEP 5: Pass an address to to google & get geo data
  // -----------------------------------------

  getGeoData  : (address) => {
    return googleMapsClient.geocode({ address: address }).asPromise().then((response) => {
      const cityIndex = response.json.results[0].address_components.findIndex(
        (components) => {
          return components.types.includes('locality');
        }
      );

      const stateIndex = response.json.results[0].address_components.findIndex(
        (components) => {
          return components.types.includes('administrative_area_level_1');
        }
      );

      // The object that is returned to us for each city
      let geoRes = {
        input            : address,
        city             : 'N/A',
        state            : 'N/A',
        formattedAddress : response.json.results[0].formatted_address,
        latLng           : `${response.json.results[0].geometry.location.lat}, ${response
          .json.results[0].geometry.location.lng}`
      };

      if (cityIndex > -1) {
        geoRes.city = response.json.results[0].address_components[cityIndex].short_name;
      } else {
        if (
          response.json.results[0].formatted_address === 'New York Metropolitan Area, USA'
        ) {
          geoRes.city = 'the New York metropolitan area';
        }
      }

      if (stateIndex > -1) {
        geoRes.state = response.json.results[0].address_components[stateIndex].short_name;
      } else {
        if (
          response.json.results[0].formatted_address === 'New York Metropolitan Area, USA'
        ) {
          geoRes.state = 'NY';
        }
      }

      return geoRes;
    });
  },

  // -----------------------------------------
  // STEP 4: Pass each address to getGeoData
  // -----------------------------------------

  geoDataLoop : (array) => {
    const geoPromises = [];
    // Uses an array so that multiple cities can
    // eventually be passed into this function
    for (let i = 0; i < array.length; i++) {
      geoPromises.push(google.getGeoData(array[i]));
    }
    return Promise.all(geoPromises);
  },

  getDistance : (from, to) => {
    //requires the lat lng
    return googleMapsClient
      .distanceMatrix({ origins: from.latLng, destinations: to.latLng, mode: 'driving' })
      .asPromise()
      .then((response) => {
        let resultObj = {
          to           : to.input,
          name         : to.city,
          state        : to.state,
          to_formatted : to.formattedAddress,
          from         : from.input,
          tripMinutes  : response.json.rows[0].elements[0].duration.value / 60,
          howClose     : {
            value      : response.json.rows[0].elements[0].distance.value,
            unitString : response.json.rows[0].elements[0].distance.text
          }
        };
        return resultObj;
      })
      .catch((error) => {
        console.log(
          '\nERROR | google | getDistance method: to ' +
            to.formattedAddress +
            ' from ' +
            from.formattedAddress +
            ' | ' +
            error
        );
      });
  }
};
module.exports = google;
