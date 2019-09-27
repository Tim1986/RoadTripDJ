// mongoexport -h ds211368.mlab.com:11368 -d heroku_7k8rf6zz -c norwalkconnecticut -u dreamteam -p getgudjawbs4 -o norwalkconnecticut.json

const birminghamALArtists = require("./birminghamalabama.js")

const restructure = artistArray => {
    let newArray = []
    for (let i = 0; i < artistArray.length; i++) {
        artistArray[i] = {
            artist: artistArray[i].artist,
            spotifyID: artistArray[i].spotifyID,
            popularity: artistArray[i].popularity
        }
        newArray.push(artistArray[i])
    }
    return newArray
}
console.log(restructure(birminghamALArtists))

module.exports = restructure
