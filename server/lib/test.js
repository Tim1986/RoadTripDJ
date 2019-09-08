const algorithm = require("../lib/algorithm")

const test = () => {
    const start = "Clarksville,TN"
    end = "Denver, CO",
    isPopular = true,
    userID = null,
    accessToken = null,
    playlistName = null

return algorithm.tracks(start, end, isPopular, userID, accessToken)
}

test()