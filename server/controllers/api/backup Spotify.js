router.post("/playlist/new/:userID/:accessToken", (req, res) => {
  console.log(req.body)
  const start = req.body.startPoint,
        end = req.body.endPoint,
        isPopular = req.body.isPopular,
    //  const start = "test",
    //     end = "test",
    //     isPopular = false,
        userID = req.params.userID,
        accessToken = req.params.accessToken,
        playlistName = start + " to " + end
  
  const axiosPromise = axios({
        url: `https://api.spotify.com/v1/users/${userID}/playlists`,
        method: "POST",
        data: {
        name: playlistName,
        description: "A playlist for your trip from " + playlistName + ".",
        public: "false"
      },
        headers: {
        Authorization: "Bearer " + accessToken
      }
      })
    return Promise.all([
      start,
      end,
      isPopular,
      axiosPromise
    ])
    
    .then(result => {
    const start = result[0],
            end = result[1],
            isPopular = result[2],
            newPlaylistID = result[3].data.id
    return algorithm.tracks(start, end, isPopular, userID, accessToken, newPlaylistID)