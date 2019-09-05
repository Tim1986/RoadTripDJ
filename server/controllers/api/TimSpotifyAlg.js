// Future sorting options: from least popular / random

let daddyArray1A = [{
    "name": "Trenton, New Jersey",
    "array": [
        "George Antheil",
        "Carman",
        "Charles Chapman",
        "John Coates Jr.",
        "Richie Cole",
        "Johnny Coles",
        "Richard Crooks",
        "John Curley",
        "Sarah Dash",
        "Philippe Djokic",
        "Jonathan Dunford",
        "Orrin Evans",
        "Linda Gerard",
        "Steve Gilmore",
        "John A. Gosling",
        "Drew Gress",
        "Richard Hazard",
        "Nona Hendryx",
        "Simone Hines",
        "Hodgy",
        "Brenda Hutchinson",
        "Tim Kelly",
        "Gloria Lane",
        "Scott Metzger",
        "Jerzee Monét",
        "Maury Muehleisen",
        "Michael Ray",
        "Willie Robinson",
        "Bob Sheppard",
        "T.J. Tindall",
        "Jake Weary",
        "Marion Zarzeczna"
    ]
},
{
    "name": "Atlantic City, New Jersey",
    "array": [
        "Joe Albany",
        "Chris Arena",
        "Joseph Carleton Beal",
        "Harry Carroll",
        "Rosalind Cash",
        "Eddie Collins",
        "Bruce Ditmas",
        "Nancy Falkow",
        "Helen Forrest",
        "Anatole Friedland",
        "Patsy Garrett",
        "Paul Goldberg",
        "Gary M. Green",
        "Jack Haley",
        "Celestine Tate Harrington",
        "Jack Harrold",
        "Tasha Holiday",
        "Seth Justman",
        "Harvey Mason",
        "Vincent McDermott",
        "Joe McGinty",
        "Bob Merrill",
        "Sam Most",
        "Alfredo Silipigni",
        "Jeremy Slate",
        "Mary Stafford"
    ]
},
{
    "name": "Wilmington, Delaware",
    "array": [
        "Dennis Brockenborough",
        "Clifford Brown",
        "Stephen Bruton",
        "Kathleen Cassello",
        "John Gallagher Jr.",
        "Michael Gibson",
        "Cisco Houston",
        "Bob Marley",
        "Stephen Marley",
        "Johnny Neel",
        "Alex Otey",
        "Betty Roché",
        "Don Schiff",
        "Matthew Shipp",
        "The Spinto Band",
        "George Thorogood",
        "Tom Verlaine",
        "Gloria Warren",
        "Lem Winchester",
        "DJ Yonny",
        "Jennifer Zetlan"
    ]
},
{
    "name": "Camden, New Jersey",
    "array": [
        "Graham Alexander",
        "Christine Andreas",
        "Butch Ballard",
        "Paul Baloche",
        "Carla L. Benson",
        "Cindy Birdsong",
        "Nelson Boyd",
        "Vedra Chandler",
        "Russ Columbo",
        "Buddy DeFranco",
        "Wayne Dockery",
        "Nick Douglas",
        "Lola Falana",
        "Cary Gilbert",
        "Rachel Gould",
        "Heather Henderson",
        "Richard Holmes",
        "William Hung",
        "Barbara Ingram",
        "Jersey Surf Drum and Bugle Corps",
        "Jus Allah",
        "Lady Crush",
        "Eric Lewis",
        "Michael Lisicky",
        "Ann Pennington",
        "Jim Perry",
        "James E. Pugh",
        "Ronny J",
        "Anna Sosenko",
        "Richard Sterban",
        "Frank Tiberi",
        "Tye Tribbett",
        "Julia Udine",
        "Jack Vees",
        "Buster Williams"
    ]
},
{
    "name": "Macon, Georgia",
    "array": [
        "Jason Aldean",
        "Chris Bartlett",
        "Bill Berry",
        "Emmett Berry",
        "Pearly Brown",
        "Brad Carter",
        "Claudine Clark",
        "Randy Crawford",
        "Joe Galkin",
        "Buddy Greene",
        "Mark Heard",
        "Lucille Hegamin",
        "Johnny Jenkins",
        "Ben Johnston",
        "Rosa King",
        "Sidney Lanier",
        "Little Richard",
        "Robert McDuffie",
        "Emmett Miller",
        "Jane Pickens",
        "Donald Pippin",
        "Otis Redding",
        "Howard Tate",
        "Torres"
    ]
}
]


const artistsToTracks = (daddyArray1A, travelTime) => {
    let daddyArray1B = [

    ]
    let daddyArray1C = [

    ]

    // ********************************API call

    // ********************************Step 1: Remove artists depending on which genres are selected, put the rest in daddyArray1B

    // Step 2: Get number of songs we need. Get travelTime from Max
    let songNumber = Math.round(travelTime / 3.5)

    // Step 3: Get number of artists in first object
    let artistNumberFirstGroup = daddyArray1B[0].array.length

    // Step 4: Get how many songs per artist (1-3)
    // How many artistNumberFirstGroup does it take to have more than songNumber
    let songsPerArtist = getSongsPerArtist(songNumber, artistNumberFirstGroup)

    // ********************************Step 5: Grab that number of top songs of each artist and push those in daddyArray1C sorted by popularity

    // Step 6: Check to see if we need more songs
    doWeNeedMoreSongs(daddyArray1C, songNumber)
}

const getSongsPerArtist = (songNumber, artistNumberFirstGroup) => {
    if (Math.ceil(songNumber / artistNumberFirstGroup) >= 3) {
        return 3;
    } else if (Math.ceil(songNumber / artistNumberFirstGroup) <= 1) {
        return 1;
    } else {
        return 2;
    }
}

const doWeNeedMoreSongs = (daddyArray1C, songNumber) => {
    if (daddyArray1C >= songNumber) {
        console.log("return daddyArray1C")
    } else {
        getMoreSongs(daddyArray1C, songNumber);
    }
}

const getMoreSongs = (daddyArray1C, songNumber) => {
    for (let i = 1; i < 5; i++) {
        let remainingSongNumber = songNumber - daddyArray1C.length
        if (remainingSongNumber < 1) {
            console.log("return daddyArray1C")
        } else {
            let artistNumberNextGroup = daddyArray1B[i].array.length
            let songsPerArtistNextGroup = getSongsPerArtist(remainingSongNumber, artistNumberNextGroup)
            // Step 5: Grab that number of top songs of each artist and push those in daddyArray1C sorted by popularity
        }
    }
}
