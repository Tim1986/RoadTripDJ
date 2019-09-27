let test = [
    [1, 2, 3, 4, 5],
    [6, 7, 8],
    [9, 10, 11, 12, 13, 14, 15, 16],
    [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    [31]
]

// let test = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]]

// let test = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]]

// let test2 = [
//     [
//         { "artist": "Steve Barton" },
//         { "artist": "Bobby Bones" },
//         { "artist": "Henry Glover" },
//         { "artist": "Randy Goodrum" },
//         { "artist": "Billy Bob Thornton" },
//         { "artist": "David Ruffin" },
//         { "artist": "Roseanna Vitro" }
//     ],
//     [
//         { "artist": "Jordin Sparks" },
//         { "artist": "Knights of the Abyss" },
//         { "artist": "Craig Mabbitt" },
//         { "artist": "Nate Ruess" },
//         { "artist": "Marty Robbins" },
//         { "artist": "David Hernandez" }
//     ],
//     [
//         { "artist": "Yelawolf" },
//         { "artist": "Danny Mayo" },
//         { "artist": "Aimee Mayo" },
//         { "artist": "Bradley Gaskin" },
//         { "artist": "Jean Cox" },
//         { "artist": "Grant Langston" },
//         { "artist": "Jerry McCain" },
//         { "artist": "Tommy Stewart" },
//         { "artist": "Gordon Mote" },
//         { "artist": "Gold City" }
//     ],
//     [
//         { "artist": "The Butler Twins" },
//         { "artist": "Autry Inman" },
//         { "artist": "Sam Phillips" },
//         { "artist": "Donna Jean Godchaux" },
//         { "artist": "Jerry Carrigan" },
//         { "artist": "Donnie Fritts" },
//         { "artist": "Buddy Killen" },
//         { "artist": "W. C. Handy" },
//         { "artist": "Melba Montgomery" },
//         { "artist": "Lenny LeBlanc" },
//         { "artist": "Roger Briggs" },
//         { "artist": "B. Cooper" },
//     ],
//     [
//         { "artist": "Quinn Christopherson" },
//         { "artist": "Starship Amazing" },
//         { "artist": "Mythological Horses" },
//         { "artist": "Khleo Thomas" },
//         { "artist": "Olga Bell" },
//         { "artist": "Kate Earl" },
//         { "artist": "Libby Roderick" },
//         { "artist": "Pamyua" },
//         { "artist": "Lane McCray" },
//         { "artist": "Alan Paul" },
//         { "artist": "Carmel Buckingham" },
//         { "artist": "Marcus Shelby" }
//     ]
// ]

const pickTwenty = array => {
    const justTwenty = []
    searchCity(array, justTwenty, 0)
    if (justTwenty.length < 20) {
        searchCity(array, justTwenty, 1)
    }
    if (justTwenty.length < 20) {
        searchCity(array, justTwenty, 2)
    }
    if (justTwenty.length < 20) {
        searchCity(array, justTwenty, 3)
    }
    if (justTwenty.length < 20) {
        searchCity(array, justTwenty, 4)
    }
    return justTwenty
}

const searchCity = (array, justTwenty, city) => {
    let songsLeft = 20 - justTwenty.length
    if (array[city].length >= songsLeft) {
        // randomly push 20 from this array into justTwenty
        return getRandom(array, justTwenty, city)
    } else {
        for (let i = 0; i < array[city].length; i++) {
            // console.log(array[city][i])
            justTwenty.push(array[city][i])
        }
    }
}

const getRandom = (array, justTwenty, city) => {
    let usedRandomNumbers = []
    while (justTwenty.length < 20) {
        let randomNum = Math.floor(Math.random() * array[city].length)
        // console.log("randomNum is: " + randomNum)
        if (!usedRandomNumbers.includes(randomNum)) {
            justTwenty.push(array[city][randomNum])
            usedRandomNumbers.push(randomNum)
            // console.log(usedRandomNumbers)
        }
    }
    return justTwenty
}

console.log(pickTwenty(test))
console.log(pickTwenty(test).length)

// let songsLeft = 20 - justTwenty.length
// if (array[1].length >= songsLeft) {
//     // randomly push songsLeft songs into justTwenty
//     return getRandom(array, justTwenty, 1)
// } else {
//     for (let i = 0; i < array[1].length; i++) {
//         justTwenty.push(array[1][i])
//     }
//     let songsLeft = 20 - justTwenty.length
//     if (array[2].length >= songsLeft) {
//         // randomly push songsLeft songs into justTwenty
//         return getRandom(array, justTwenty, 2)
//     } else {
//         for (let i = 0; i < array[2].length; i++) {
//             justTwenty.push(array[2][i])
//         }
//         let songsLeft = 20 - justTwenty.length
//         if (array[3].length >= songsLeft) {
//             // randomly push songsLeft songs into justTwenty
//             return getRandom(array, justTwenty, 3)
//         } else {
//             for (let i = 0; i < array[3].length; i++) {
//                 justTwenty.push(array[3][[i]])
//             }
//             let songsLeft = 20 - justTwenty.length
//             // randomly push songsLeft songs into justTwenty
//             return getRandom(array, justTwenty, 4)
//         }
//     }

// }
