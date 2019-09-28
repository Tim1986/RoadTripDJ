const _ = require('lodash')

const search =
    {
    citySearch: (state) => {
        switch (state) {
            // 1
            case "AL":
                search.giveCities([
                    search.AL,
                    search.MS,
                    search.TN,
                    search.GA,
                    search.FL
                ])
                break;
    
            case "AK":
                search.giveCities([
                    search.AK
                ])
                break;
    
            case "AZ":
                search.giveCities([
                    search.AZ,
                    search.CA,
                    search.NV,
                    search.UT,
                    search.CO,
                    search.NM])
                break;
    
            case "AR":
                search.giveCities([
                    search.AR,
                    search.LA,
                    search.TX,
                    search.OK,
                    search.KS,
                    search.MO,
                    search.TN,
                    search.MS])
                break;
    
            // 5
            case "CA":
                search.giveCities([
                    search.CA,
                    search.OR,
                    search.NV,
                    search.AZ
                ])
                break;
    
            case "CO":
                search.giveCities([
                    search.CO,
                    search.UT,
                    search.WY,
                    search.NE,
                    search.KS,
                    search.OK,
                    search.TX,
                    search.NM,
                    search.AZ])
                break;
    
            case "CT":
                search.giveCities([
                    search.CT,
                    search.RI,
                    search.MA,
                    search.NY,
                    search.NJ])
                break;
    
            case "DE":
                search.giveCities([
                    search.DE,
                    search.MD,
                    search.VA,
                    search.PA,
                    search.DC,
                    search.NJ])
                break;
    
            case "FL":
                search.giveCities([
                    search.GA,
                    search.FL,
                    search.AL])
                break;
    
            // 10
            case "GA":
                search.giveCities([
                    search.GA,
                    search.FL,
                    search.AL,
                    search.TN,
                    search.NC,
                    search.SC])
                break;
    
            case "HI":
                search.giveCities([
                    search.HI])
                break;
    
            case "ID":
                search.giveCities([
                    search.ID,
                    search.WA,
                    search.OR,
                    search.NV,
                    search.UT,
                    search.WY,
                    search.MT])
                break;
    
            case "IL":
                search.giveCities([
                    search.IL,
                    search.WI,
                    search.IA,
                    search.MO,
                    search.KY,
                    search.IN])
                break;
    
            case "IN":
                search.giveCities([
                    search.IN,
                    search.MI,
                    search.OH,
                    search.KY,
                    search.IL])
                break;
    
            // 15
            case "IA":
                search.giveCities([
                    search.IA,
                    search.MN,
                    search.WI,
                    search.IL,
                    search.MO,
                    search.NE,
                    search.SD])
                break;
    
            case "KS":
                search.giveCities([
                    search.KS,
                    search.NE,
                    search.MO,
                    search.AR,
                    search.OK,
                    search.TX,
                    search.CO])
                break;
    
            case "KY":
                search.giveCities([
                    search.KY,
                    search.IN,
                    search.OH,
                    search.WV,
                    search.VA,
                    search.TN,
                    search.MO,
                    search.IL])
                break;
    
            case "LA":
                search.giveCities([
                    search.LA,
                    search.TX,
                    search.AR,
                    search.MS])
                break;
    
            case "ME":
                search.giveCities([
                    search.ME,
                    search.NH,
                    search.VT,
                    search.MA,
                    search.NY])
                break;
    
            // 20
            case "MD":
                search.giveCities([
                    search.MD,
                    search.DC,
                    search.DE,
                    search.PA,
                    search.VA])
                break;
    
            case "MA":
                search.giveCities([
                    search.MA,
                    search.NH,
                    search.VT,
                    search.NY,
                    search.CT,
                    search.RI])
                break;
    
            case "MI":
                search.giveCities([
                    search.MI,
                    search.IN,
                    search.OH])
                break;
    
            case "MN":
                search.giveCities([
                    search.MN,
                    search.ND,
                    search.SD,
                    search.IA,
                    search.WI])
                break;
    
            case "MS":
                search.giveCities([
                    search.MS,
                    search.LA,
                    search.AR,
                    search.TN,
                    search.AL])
                break;
    
            // 25
            case "MO":
                search.giveCities([
                    search.MO,
                    search.KS,
                    search.NE,
                    search.IA,
                    search.IL,
                    search.KY,
                    search.TN,
                    search.AR,
                    search.OK])
                break;
    
            case "MT":
                search.giveCities([
                    search.MT,
                    search.ID,
                    search.WY,
                    search.SD,
                    search.ND])
                break;
    
            case "NE":
                search.giveCities([
                    search.NE,
                    search.SD,
                    search.IA,
                    search.MO,
                    search.KS,
                    search.CO,
                    search.WY])
                break;
    
            case "NV":
                search.giveCities([
                    search.NV,
                    search.CA,
                    search.OR,
                    search.ID,
                    search.UT,
                    search.AZ])
                break;
    
            case "NH":
                search.giveCities([
                    search.NH,
                    search.ME,
                    search.VT,
                    search.MA])
                break;
    
            // 30
            case "NJ":
                search.giveCities([
                    search.NJ,
                    search.DE,
                    search.PA,
                    search.NY])
                break;
    
            case "NM":
                search.giveCities([
                    search.NM,
                    search.TX,
                    search.OK,
                    search.CO,
                    search.AZ,
                    search.UT])
                break;
    
            case "NY":
                search.giveCities([
                    search.NY,
                    search.PA,
                    search.NJ,
                    search.CT,
                    search.MA,
                    search.VT])
                break;
    
            case "NC":
                search.giveCities([
                    search.NC,
                    search.SC,
                    search.GA,
                    search.TN,
                    search.VA])
                break;
    
            case "ND":
                search.giveCities([
                    search.ND,
                    search.MT,
                    search.WY,
                    search.SD,
                    search.MN])
                break;
    
            // 35
            case "OH":
                search.giveCities([
                    search.OH,
                    search.MI,
                    search.IN,
                    search.KY,
                    search.WV,
                    search.PA])
                break;
    
            case "OK":
                search.giveCities([
                    search.OK,
                    search.TX,
                    search.KS,
                    search.NM,
                    search.CO,
                    search.MO,
                    search.AR,
                    search.LA])
                break;
    
            case "OR":
                search.giveCities([
                    search.OR,
                    search.WA,
                    search.ID,
                    search.NV,
                    search.CA])
                break;
    
            case "PA":
                search.giveCities([
                    search.PA,
                    search.NY,
                    search.NJ,
                    search.DE,
                    search.MD,
                    search.DC,
                    search.WV,
                    search.OH])
                break;
    
            case "RI":
                search.giveCities([
                    search.RI,
                    search.CT,
                    search.MA])
                break;
    
            // 40
            case "SC":
                search.giveCities([
                    search.SC,
                    search.NC,
                    search.GA])
                break;
    
            case "SD":
                search.giveCities([
                    search.SD,
                    search.ND,
                    search.MT,
                    search.WY,
                    search.NE,
                    search.IA,
                    search.MN])
                break;
    
            case "TN":
                search.giveCities([
                    search.TN,
                    search.KY,
                    search.VA,
                    search.NC,
                    search.GA,
                    search.AL,
                    search.MS,
                    search.AR,
                    search.MO])
                break;
    
            case "TX":
                search.giveCities([
                    search.TX,
                    search.NM,
                    search.OK,
                    search.AR,
                    search.LA])
                break;
    
            case "UT":
                search.giveCities([
                    search.UT,
                    search.ID,
                    search.WY,
                    search.CO,
                    search.NM,
                    search.AZ,
                    search.NV])
                break;
    
            // 45
            case "VT":
                search.giveCities([
                    search.VT,
                    search.NH,
                    search.MA,
                    search.NY])
                break;
    
            case "VA":
                search.giveCities([
                    search.VA,
                    search.DC,
                    search.KY,
                    search.KY,
                    search.TN,
                    search.NC])
                break;
    
            case "WA":
                search.giveCities([
                    search.WA,
                    search.OR,
                    search.ID])
                break;
    
            case "WV":
                search.giveCities([
                    search.WV,
                    search.DC,
                    search.VA,
                    search.KY,
                    search.OH,
                    search.PA])
                break;
    
            case "WI":
                search.giveCities([
                    search.WI,
                    search.MN,
                    search.IA,
                    search.IL])
                break;
    
            // 50
            case "WY":
                search.giveCities([
                    search.WY,
                    search.MT,
                    search.ID,
                    search.UT,
                    search.CO,
                    search.NE,
                    search.SD])
                break;
    
        }},
    
    AL : ["Birmingham, Alabama", "Florence, Alabama", "Gadsden, Alabama", "Huntsville, Alabama", "Mobile, Alabama",
            "Montgomery, Alabama"],
    
    AK : ["Anchorage, Alaska"],
    
    AZ : ["Glendale, Arizona", "Mesa, Arizona", "Phoenix, Arizona", "Scottsdale, Arizona", "Tucson, Arizona"],
    
    AR : ["Hot Springs, Arkansas", "Little Rock, Arkansas"],
    
    CA : ["Anaheim, California", "Bakersfield, California", "Berkeley, California", "Beverly Hills, California",
            "Burbank, California", "Compton, California", "Downey, California", "Fresno, California", "Fullerton, California",
            "Glendale, California", "Hawthorne, California", "Inglewood, California", "Long Beach, California", "Los Angeles",
            "Manhattan Beach, California", "Modesto, California", "Newport Beach, California", "Oakland, California",
            "Oxnard, California", "Palm Springs, California", "Palo Alto, California", "Pasadena, California",
            "Redondo Beach, California", "Richmond, California", "Riverside, California", "Sacramento, California",
            "San Bernardino, California", "San Diego", "San Francisco", "San Jose, California", "San Rafael, California",
            "Santa Barbara, California", "Santa Cruz, California", "Santa Monica, California", "Santa Rosa, California",
            "Stockton, California", "Torrance, California", "Vallejo, California", "Vista, California", "Whittier,  California"],
    
    CO : ["Boulder, Colorado", "Colorado Springs, Colorado", "Denver"],
    
    CT : ["Bridgeport, Connecticut", "Greenwich, Connecticut", "Hartford, Connecticut", "New Haven, Connecticut",
            "New London, Connecticut", "Norwalk, Connecticut", "Stamford, Connecticut"],
    
    DE : ["Wilmington,  Delaware"],
    
    FL : ["Coral Springs, Florida", "Daytona Beach, Florida", "Fort Lauderdale, Florida", "Gainesville, Florida",
            "Jacksonville, Florida", "Lakeland, Florida", "Miami", "Ocala, Florida", "Orlando, Florida", "Pensacola, Florida",
            "St. Petersburg, Florida", "Tallahassee, Florida", "Tampa, Florida"],
    
    GA : ["Albany, Georgia", "Athens, Georgia", "Atlanta", "Augusta, Georgia", "Columbus, Georgia", "Macon, Georgia",
            "Marietta, Georgia", "Savannah, Georgia"],
    
    HI : ["Honolulu"],
    
    ID : ["Boise, Idaho"],
    
    IL : ["Champaign, Illinois", "Chicago", "Decatur, Illinois", "Evanston, Illinois", "Joliet, Illinois", "Oak Park, Illinois",
            "Peoria, Illinois", "Rockford, Illinois"],
    
    IN : ["Anderson, Indiana", "Bloomington, Indiana", "Evansville, Indiana", "Fort Wayne, Indiana", "Gary, Indiana",
            "Indianapolis", "Richmond, Indiana", "South Bend, Indiana"],
    
    IA : ["Cedar Rapids, Iowa", "Des Moines, Iowa", "Iowa City, Iowa"],
    
    KS : ["Kansas City, Kansas", "Lawrence, Kansas", "Wichita,  Kansas", "Topeka, Kansas"],
    
    KY : ["Ashland, Kentucky", "Bowling Green, Kentucky", "Lexington, Kentucky", "Louisville, Kentucky", "Paducah, Kentucky"],
    
    LA : ["Baton Rouge, Louisiana", "Lafayette, Louisiana", "Lake Charles, Louisiana", "Monroe, Louisiana",
            "New Orleans", "Shreveport, Louisiana"],
    
    ME : ["Bangor, Maine", "Portland, Maine"],
    
    MD : ["Baltimore", "Rockville, Maryland"],
    
    MA : ["Boston", "Brockton, Massachusetts", "Cambridge, Massachusetts", "Lowell, Massachusetts", "Newton, Massachusetts",
            "Somerville, Massachusetts", "Springfield, Massachusetts", "Worcester, Massachusetts"],
    
    MI : ["Ann Arbor, Michigan", "Detroit", "Flint, Michigan", "Lansing, Michigan", "Pontiac, Michigan", "Saginaw, Michigan"],
    
    MN : ["Duluth, Minnesota", "Minneapolis", "Saint Paul, Minnesota"],
    
    MS : ["Clarksdale, Mississippi", "Greenville, Mississippi", "Hattiesburg, Mississippi", "Jackson, Mississippi",
            "Meridian, Mississippi", "Natchez, Mississippi", "Vicksburg, Mississippi"],
    
    MO : ["Columbia, Missouri", "Kansas City, Missouri", "Springfield, Missouri", "St. Louis"],
    
    MT : ["Missoula, Montana"],
    
    NE : ["Lincoln, Nebraska", "Omaha, Nebraska"],
    
    NV : ["Las Vegas", "Reno, Nevada"],
    
    NH : [],
    
    NJ : ["Atlantic City, New Jersey", "Bayonne, New Jersey", "Camden, New Jersey", "East Orange, New Jersey", "Hoboken, New Jersey",
            "Jersey City, New Jersey", "New Brunswick, New Jersey", "Newark, New Jersey", "Passaic, New Jersey", "Paterson, New Jersey",
            "Plainfield, New Jersey", "Summit, New Jersey", "Trenton, New Jersey"],
    
    NM : ["Albuquerque, New Mexico", "Santa Fe, New Mexico"],
    
    NY : ["Albany, New York", "Buffalo, New York", "Ithaca, New York", "Kingston, New York", "Mount Vernon, New York",
            "New Rochelle, New York", "New York City", "the New York metropolitan area", "Niagara Falls, New York",
            "Poughkeepsie, New York", "Rochester, New York", "Syracuse, New York", "Troy, New York", "Utica, New York"],
    
    NC : ["Asheville, North Carolina", "Charlotte, North Carolina", "Durham, North Carolina", "Fayetteville, North Carolina",
            "Greensboro, North Carolina", "Raleigh, North Carolina", "Winston-Salem, North Carolina"],
    
    ND : [],
    
    OH : ["Akron, Ohio", "Canton, Ohio", "Cincinnati", "Cleveland", "Dayton, Ohio", "Columbus, Ohio", "Shaker Heights, Ohio",
            "Springfield, Ohio", "Toledo, Ohio", "Youngstown, Ohio"],
    
    OK : ["Enid, Oklahoma", "Norman, Oklahoma", "Oklahoma City", "Tulsa, Oklahoma"],
    
    OR : ["Corvallis, Oregon", "Eugene, Oregon", "Hillsboro, Oregon", "Portland, Oregon", "Salem, Oregon"],
    
    PA : ["Allentown, Pennsylvania", "Easton, Pennsylvania", "Erie, Pennsylvania", "Harrisburg, Pennsylvania",
            "Lancaster, Pennsylvania", "Philadelphia", "Pittsburgh", "Reading, Pennsylvania", "Scranton, Pennsylvania",
            "York, Pennsylvania"],
    
    RI : ["Newport, Rhode Island", "Providence, Rhode Island"],
    
    SC : ["Charleston, South Carolina", "Columbia, South Carolina", "Greenville, South Carolina", "Spartanburg, South Carolina"],
    
    SD : [],
    
    TN : ["Knoxville, Tennessee", "Memphis, Tennessee", "Nashville, Tennessee"],
    
    TX : ["Amarillo, Texas", "Austin, Texas", "Dallas", "Houston", "San Antonio"],
    
    UT : ["Ogden, Utah", "Provo, Utah", "Salt Lake City"],
    
    VT : ["Burlington, Vermont"],
    
    VA : ["Alexandria, Virginia", "Charlottesville, Virginia", "Hampton, Virginia", "Lynchburg, Virginia", "Newport News, Virginia",
            "Norfolk, Virginia", "Portsmouth, Virginia", "Richmond, Virginia", "Virginia Beach, Virginia"],
    
    WA : ["Bainbridge Island, Washington", "Kirkland, Washington", "Olympia, Washington", "Seattle", "Spokane, Washington"],
    
    WV : ["Charleston, West Virginia", "Huntington, West Virginia", "Wheeling, West Virginia"],
    
    WI : ["Green Bay, Wisconsin", "Kenosha, Wisconsin", "Madison, Wisconsin", "Milwaukee", "Racine, Wisconsin"],
    
    WY : [],
    
    DC : ["Washington, D.C."],

    giveCities : array => {
        const mergedArray = _.flattenDeep(array)
        // console.log(mergedArray)
        return mergedArray
     },
}

module.exports = search