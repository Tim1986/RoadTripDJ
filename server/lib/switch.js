const _ = require('lodash')

const search =
    {
    citySearch: (state) => {
        switch (state) {
            // 1
            case "AL":
                this.giveCities([
                    this.AL,
                    this.MS,
                    this.TN,
                    this.GA,
                    this.FL
                ])
                break;
    
            case "AK":
                this.giveCities([
                    this.AK
                ])
                break;
    
            case "AZ":
                this.giveCities([
                    this.AZ,
                    this.CA,
                    this.NV,
                    this.UT,
                    this.CO,
                    this.NM])
                break;
    
            case "AR":
                this.giveCities([
                    this.AR,
                    this.LA,
                    this.TX,
                    this.OK,
                    this.KS,
                    this.MO,
                    this.TN,
                    this.MS])
                break;
    
            // 5
            case "CA":
                this.giveCities([
                    this.CA,
                    this.OR,
                    this.NV,
                    this.AZ
                ])
                break;
    
            case "CO":
                this.giveCities([
                    this.CO,
                    this.UT,
                    this.WY,
                    this.NE,
                    this.KS,
                    this.OK,
                    this.TX,
                    this.NM,
                    this.AZ])
                break;
    
            case "CT":
                this.giveCities([
                    this.CT,
                    this.RI,
                    this.MA,
                    this.NY,
                    this.NJ])
                break;
    
            case "DE":
                this.giveCities([
                    this.DE,
                    this.MD,
                    this.VA,
                    this.PA,
                    this.DC,
                    this.NJ])
                break;
    
            case "FL":
                this.giveCities([
                    this.GA,
                    this.FL,
                    this.AL])
                break;
    
            // 10
            case "GA":
                this.giveCities([
                    this.GA,
                    this.FL,
                    this.AL,
                    this.TN,
                    this.NC,
                    this.SC])
                break;
    
            case "HI":
                this.giveCities([
                    this.HI])
                break;
    
            case "ID":
                this.giveCities([
                    this.ID,
                    this.WA,
                    this.OR,
                    this.NV,
                    this.UT,
                    this.WY,
                    this.MT])
                break;
    
            case "IL":
                this.giveCities([
                    this.IL,
                    this.WI,
                    this.IA,
                    this.MO,
                    this.KY,
                    this.IN])
                break;
    
            case "IN":
                this.giveCities([
                    this.IN,
                    this.MI,
                    this.OH,
                    this.KY,
                    this.IL])
                break;
    
            // 15
            case "IA":
                this.giveCities([
                    this.IA,
                    this.MN,
                    this.WI,
                    this.IL,
                    this.MO,
                    this.NE,
                    this.SD])
                break;
    
            case "KS":
                this.giveCities([
                    this.KS,
                    this.NE,
                    this.MO,
                    this.AR,
                    this.OK,
                    this.TX,
                    this.CO])
                break;
    
            case "KY":
                this.giveCities([
                    this.KY,
                    this.IN,
                    this.OH,
                    this.WV,
                    this.VA,
                    this.TN,
                    this.MO,
                    this.IL])
                break;
    
            case "LA":
                this.giveCities([
                    this.LA,
                    this.TX,
                    this.AR,
                    this.MS])
                break;
    
            case "ME":
                this.giveCities([
                    this.ME,
                    this.NH,
                    this.VT,
                    this.MA,
                    this.NY])
                break;
    
            // 20
            case "MD":
                this.giveCities([
                    this.MD,
                    this.DC,
                    this.DE,
                    this.PA,
                    this.VA])
                break;
    
            case "MA":
                this.giveCities([
                    this.MA,
                    this.NH,
                    this.VT,
                    this.NY,
                    this.CT,
                    this.RI])
                break;
    
            case "MI":
                this.giveCities([
                    this.MI,
                    this.IN,
                    this.OH])
                break;
    
            case "MN":
                this.giveCities([
                    this.MN,
                    this.ND,
                    this.SD,
                    this.IA,
                    this.WI])
                break;
    
            case "MS":
                this.giveCities([
                    this.MS,
                    this.LA,
                    this.AR,
                    this.TN,
                    this.AL])
                break;
    
            // 25
            case "MO":
                this.giveCities([
                    this.MO,
                    this.KS,
                    this.NE,
                    this.IA,
                    this.IL,
                    this.KY,
                    this.TN,
                    this.AR,
                    this.OK])
                break;
    
            case "MT":
                this.giveCities([
                    this.MT,
                    this.ID,
                    this.WY,
                    this.SD,
                    this.ND])
                break;
    
            case "NE":
                this.giveCities([
                    this.NE,
                    this.SD,
                    this.IA,
                    this.MO,
                    this.KS,
                    this.CO,
                    this.WY])
                break;
    
            case "NV":
                this.giveCities([
                    this.NV,
                    this.CA,
                    this.OR,
                    this.ID,
                    this.UT,
                    this.AZ])
                break;
    
            case "NH":
                this.giveCities([
                    this.NH,
                    this.ME,
                    this.VT,
                    this.MA])
                break;
    
            // 30
            case "NJ":
                this.giveCities([
                    this.NJ,
                    this.DE,
                    this.PA,
                    this.NY])
                break;
    
            case "NM":
                this.giveCities([
                    this.NM,
                    this.TX,
                    this.OK,
                    this.CO,
                    this.AZ,
                    this.UT])
                break;
    
            case "NY":
                this.giveCities([
                    this.NY,
                    this.PA,
                    this.NJ,
                    this.CT,
                    this.MA,
                    this.VT])
                break;
    
            case "NC":
                this.giveCities([
                    this.NC,
                    this.SC,
                    this.GA,
                    this.TN,
                    this.VA])
                break;
    
            case "ND":
                this.giveCities([
                    this.ND,
                    this.MT,
                    this.WY,
                    this.SD,
                    this.MN])
                break;
    
            // 35
            case "OH":
                this.giveCities([
                    this.OH,
                    this.MI,
                    this.IN,
                    this.KY,
                    this.WV,
                    this.PA])
                break;
    
            case "OK":
                this.giveCities([
                    this.OK,
                    this.TX,
                    this.KS,
                    this.NM,
                    this.CO,
                    this.MO,
                    this.AR,
                    this.LA])
                break;
    
            case "OR":
                this.giveCities([
                    this.OR,
                    this.WA,
                    this.ID,
                    this.NV,
                    this.CA])
                break;
    
            case "PA":
                this.giveCities([
                    this.PA,
                    this.NY,
                    this.NJ,
                    this.DE,
                    this.MD,
                    this.DC,
                    this.WV,
                    this.OH])
                break;
    
            case "RI":
                this.giveCities([
                    this.RI,
                    this.CT,
                    this.MA])
                break;
    
            // 40
            case "SC":
                this.giveCities([
                    this.SC,
                    this.NC,
                    this.GA])
                break;
    
            case "SD":
                this.giveCities([
                    this.SD,
                    this.ND,
                    this.MT,
                    this.WY,
                    this.NE,
                    this.IA,
                    this.MN])
                break;
    
            case "TN":
                this.giveCities([
                    this.TN,
                    this.KY,
                    this.VA,
                    this.NC,
                    this.GA,
                    this.AL,
                    this.MS,
                    this.AR,
                    this.MO])
                break;
    
            case "TX":
                this.giveCities([
                    this.TX,
                    this.NM,
                    this.OK,
                    this.AR,
                    this.LA])
                break;
    
            case "UT":
                this.giveCities([
                    this.UT,
                    this.ID,
                    this.WY,
                    this.CO,
                    this.NM,
                    this.AZ,
                    this.NV])
                break;
    
            // 45
            case "VT":
                this.giveCities([
                    this.VT,
                    this.NH,
                    this.MA,
                    this.NY])
                break;
    
            case "VA":
                this.giveCities([
                    this.VA,
                    this.DC,
                    this.KY,
                    this.KY,
                    this.TN,
                    this.NC])
                break;
    
            case "WA":
                this.giveCities([
                    this.WA,
                    this.OR,
                    this.ID])
                break;
    
            case "WV":
                this.giveCities([
                    this.WV,
                    this.DC,
                    this.VA,
                    this.KY,
                    this.OH,
                    this.PA])
                break;
    
            case "WI":
                this.giveCities([
                    this.WI,
                    this.MN,
                    this.IA,
                    this.IL])
                break;
    
            // 50
            case "WY":
                this.giveCities([
                    this.WY,
                    this.MT,
                    this.ID,
                    this.UT,
                    this.CO,
                    this.NE,
                    this.SD])
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
        return _.flattenDeep(array)
     },
}

module.exports = search