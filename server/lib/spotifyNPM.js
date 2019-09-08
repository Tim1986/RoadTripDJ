const Spotify = require('node-spotify-api');
const spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET,
});

const spotifyNPM = {
    getSpotifyGenres : (artist) => {
        return spotify.search({ type: 'artist', query: artist })
        .then(data =>{
            if (data && data.artists.items.length > 0) {
                return newObj = {
                        artist: artist,
                        id: data.artists.items[0].id,
                        popularity: data.artists.items[0].popularity
                    }
            }}
        )
        .catch(err => {
            return undefined
        })
    },

    getSpotifyForArray : (array, num, isPopular) => {
        const vows = []
        // console.log(array)
        for (let i = 0; i < array.length; i++){
            vows.push(spotifyNPM.getSpotifyGenres(array[i]))
        }
        return Promise.all(vows)
        .then(res => res.filter(resolved => 
            resolved !== undefined))
        .then(filtered => {
            if (isPopular) {
            return filtered.sort((a,b) => parseFloat(b.popularity) - parseFloat(a.popularity)).slice(0, num-1)
            } else {
            return filtered.sort((a,b) => parseFloat(a.popularity) - parseFloat(b.popularity)).slice(0, num-1)
            }
        })
        .catch(err => console.log("\ngetSpotifyForArray Error: " + err))
    },
}

module.exports = spotifyNPM