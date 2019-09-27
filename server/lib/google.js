const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GOOGLEAPI,
    Promise: Promise
});

const google = {

    startGeo : (start, end) => {
        return google.geoDataLoop([start,end],0) //
        .then(posData => {
            return Promise.all([
                posData,
                google.getDistance(posData[0], posData[1])
            ])
        })
    },
    


    getGeoData : address => {
        return googleMapsClient.geocode({ address: address })
            .asPromise()
            .then((response) => {
                const cityIndex = response.json.results[0].address_components.findIndex(components => {
                    return components.types.includes("locality")
                })
                const stateIndex = response.json.results[0].address_components.findIndex(components => {
                    return components.types.includes("administrative_area_level_1")
                })
                let geoRes = {
                    input: address,
                    city:response.json.results[0].address_components[cityIndex],
                    state:response.json.results[0].address_components[stateIndex],
                    formattedAddress: response.json.results[0].formatted_address,
                    latLng: `${response.json.results[0].geometry.location.lat}, ${response.json.results[0].geometry.location.lng}`,
                }
                return geoRes
            })
    },

    geoDataLoop : (array, startIndex) => { //set startIndex to 3 to avoid undefined wiki category calls
        const geoPromises = [];
        for (let i = startIndex; i < array.length; i++) { 
            geoPromises.push(google.getGeoData(array[i]))
        }
        return Promise.all(geoPromises)
    },

    getDistance : (from, to) => {  //requires the lat lng
        return googleMapsClient.distanceMatrix({ origins: from.latLng, destinations: to.latLng, mode: 'driving' })
            .asPromise()
            .then((response) => {
                let resultObj = {
                    to: to.input,
                    to_formatted: to.formattedAddress,
                    from: from.input,
                    tripMinutes: response.json.rows[0].elements[0].duration.value * 60,
                    howClose: {
                        value: response.json.rows[0].elements[0].distance.value ,
                        unitString: response.json.rows[0].elements[0].distance.text
                    }
                }
                return resultObj
            })
            .catch((error) => {
                console.log("\nERROR | google | getDistance method: to " + to.input + " from " + from.input +  " | " + error)
            })
    },
    
}
module.exports = google