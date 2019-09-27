//==============================================================
// Function to convert JSON object to JS object
//--------------------------------------------------------------

const jsonCleaner = require("../lib/artisthelperfunction/commands");

//==============================================================
// Artist Lists that can be imported normally
//--------------------------------------------------------------

const akronOHArtists = require("../lib/artistsdata/akronohio"),
  albanyNYArtists = require("../lib/artistsdata/albanynewyork"),
  albuquerqueNMArtists = require("../lib/artistsdata/albuquerquenewmexico"),
  ashevilleNCArtists = require("../lib/artistsdata/ashevillenorthcarolina"),
  atlanticCityNJArtists = require("../lib/artistsdata/atlanticcitynewjersey"),
  bayonneNJArtists = require("../lib/artistsdata/bayonnenewjersey"),
  buffaloNYArtists = require("../lib/artistsdata/buffalonewyork"),
  camdenNJArtists = require("../lib/artistsdata/camdennewjersey"),
  charlotteNCArtists = require("../lib/artistsdata/charlottenorthcarolina"),
  columbiaMOArtists = require("../lib/artistsdata/columbiamissouri"),
  eastOrangeNJArtists = require("../lib/artistsdata/eastorangenewjersey"),
  hobokenNJArtists = require("../lib/artistsdata/hobokennewjersey"),
  ithacaNYArtists = require("../lib/artistsdata/ithacanewyork"),
  jerseyCityNJArtists = require("../lib/artistsdata/jerseycitynewjersey"),
  kansasCityMOArtists = require("../lib/artistsdata/kansascitymissouri"),
  kingstonNYArtists = require("../lib/artistsdata/kingstonnewyork"),
  lasVegasNVArtists = require("../lib/artistsdata/lasvegas"),
  lincolnNEArtists = require("../lib/artistsdata/lincolnnebraska"),
  missoulaMTArtists = require("../lib/artistsdata/missoulamontana"),
  mountVernonNYArtists = require("../lib/artistsdata/mountvernonnewyork"),
  newarkNJArtists = require("../lib/artistsdata/newarknewjersey"),
  newBrunswickNJArtists = require("../lib/artistsdata/newbrunswicknewjersey"),
  newRochelleNYArtists = require("../lib/artistsdata/newrochellenewyork"),
  niagaraFallsNYArtists = require("../lib/artistsdata/niagarafallsnewyork"),
  omahaNEArtists = require("../lib/artistsdata/omahanebraska"),
  passaicNJArtists = require("../lib/artistsdata/passaicnewjersey"),
  patersonNJArtists = require("../lib/artistsdata/patersonnewjersey"),
  plainfieldNJArtists = require("../lib/artistsdata/plainfieldnewjersey"),
  poughkeepsieNYArtists = require("../lib/artistsdata/poughkeepsienewyork"),
  renoNVArtists = require("../lib/artistsdata/renonevada"),
  rochesterNYArtists = require("../lib/artistsdata/rochesternewyork"),
  santaFeNMArtists = require("../lib/artistsdata/santafenewmexico"),
  stLouisMOArtists = require("../lib/artistsdata/stlouis"),
  summitNJArtists = require("../lib/artistsdata/summitnewjersey"),
  syracuseNYArtists = require("../lib/artistsdata/syracusenewyork"),
  trentonNJArtists = require("../lib/artistsdata/trentonnewjersey"),
  troyNYArtists = require("../lib/artistsdata/troynewyork"),
  uticaNYArtists = require("../lib/artistsdata/uticanewyork");

//==============================================================
// Artist Lists that must be imported and passed to jsonCleaner
//--------------------------------------------------------------

const albanyGAArtists = require("../lib/functionartists/albanygeorgia"),
  alexandriaVAArtists = require("../lib/functionartists/alexandriavirginia"),
  allentownPAArtists = require("../lib/functionartists/allentownpennsylvania"),
  amarilloTXArtists = require("../lib/functionartists/amarillotexas"),
  anaheimCAArtists = require("../lib/functionartists/anaheimcalifornia"),
  anchorageAKArtists = require("../lib/functionartists/anchoragealaska"),
  andersonINArtists = require("../lib/functionartists/andersonindiana"),
  annArborMIArtists = require("../lib/functionartists/annarbormichigan"),
  ashlandKYArtists = require("../lib/functionartists/ashlandkentucky"),
  athensGAArtists = require("../lib/functionartists/athensgeorgia"),
  atlantaGAArtists = require("../lib/functionartists/atlanta"),
  augustaGAArtists = require("../lib/functionartists/augustageorgia"),
  austinTXArtists = require("../lib/functionartists/austintexas"),
  bainbridgeIslandWAArtists = require("../lib/functionartists/bainbridgeislandwashington"),
  bakersfieldCAArtists = require("../lib/functionartists/bakersfieldcalifornia"),
  baltimoreMDArtists = require("../lib/functionartists/baltimore"),
  bangorMEArtists = require("../lib/functionartists/bangormaine"),
  batonRougeLAArtists = require("../lib/functionartists/batonrougelouisiana"),
  berkeleyCAArtists = require("../lib/functionartists/berkeleycalifornia"),
  beverlyHillsCAArtists = require("../lib/functionartists/beverlyhillscalifornia"),
  birminghamALArtists = require("../lib/functionartists/birminghamalabama"),
  bloomingtonINArtists = require("../lib/functionartists/bloomingtonindiana"),
  boiseIDArtists = require("../lib/functionartists/boiseidaho"),
  bostonMAArtists = require("../lib/functionartists/boston"),
  boulderCOArtists = require("../lib/functionartists/bouldercolorado"),
  bowlingGreenKYArtists = require("../lib/functionartists/bowlinggreenkentucky"),
  bridgeportCTArtists = require("../lib/functionartists/bridgeportconnecticut"),
  brocktonMAArtists = require("../lib/functionartists/brocktonmassachusetts"),
  burbankCAArtists = require("../lib/functionartists/burbankcalifornia"),
  burlingtonVTArtists = require("../lib/functionartists/burlingtonvermont"),
  cambridgeMAArtists = require("../lib/functionartists/cambridgemassachusetts"),
  cantonOHArtists = require("../lib/functionartists/cantonohio"),
  cedarRapidsIAArtists = require("../lib/functionartists/cedarrapidsiowa"),
  champaignILArtists = require("../lib/functionartists/champaignillinois"),
  charlestonSCArtists = require("../lib/functionartists/charlestonsouthcarolina"),
  charlestonWVArtists = require("../lib/functionartists/charlestonwestvirginia"),
  charlottesvilleVAArtists = require("../lib/functionartists/charlottesvillevirginia"),
  chicagoILArtists = require("../lib/functionartists/chicago"),
  cincinnatiOHArtists = require("../lib/functionartists/cincinnati"),
  clarksdaleMSArtists = require("../lib/functionartists/clarksdalemississippi"),
  clevelandOHArtists = require("../lib/functionartists/cleveland"),
  coloradoSpringsCOArtists = require("../lib/functionartists/coloradospringscolorado"),
  columbiaSCArtists = require("../lib/functionartists/columbiasouthcarolina"),
  columbusOHArtists = require("../lib/functionartists/columbusohio"),
  comptonCAArtists = require("../lib/functionartists/comptoncalifornia"),
  coralSpringsFLArtists = require("../lib/functionartists/coralspringsflorida"),
  corvallisORArtists = require("../lib/functionartists/corvallisoregon"),
  dallasTXArtists = require("../lib/functionartists/dallas"),
  daytonaBeachFLArtists = require("../lib/functionartists/daytonabeachflorida");

const seedData = [
  {
    name: "Alabama",
    abbr: "AL",
    wikiCities: [
      {
        name: "Birmingham",
        artists: []
      },
      {
        name: "Florence",
        artists: []
      },
      {
        name: "Gadsden",
        artists: []
      },
      {
        name: "Huntsville",
        artists: []
      },
      {
        name: "Mobile",
        artists: []
      },
      {
        name: "Montgomery",
        artists: []
      }
    ]
  },
  {
    name: "Alaska",
    abbr: "AK",
    wikiCities: [
      {
        name: "Anchorage",
        artists: []
      }
    ]
  },
  {
    name: "Arizona",
    abbr: "AZ",
    wikiCities: [
      {
        name: "Glendale",
        artists: []
      },
      {
        name: "Mesa",
        artists: []
      },
      {
        name: "Phoenix",
        artists: []
      },
      {
        name: "Scottsdale",
        artists: []
      },
      {
        name: "Tucson",
        artists: []
      }
    ]
  },
  {
    name: "Arkansas",
    abbr: "AR",
    wikiCities: [
      {
        name: "Hot Springs",
        artists: []
      },
      {
        name: "Little Rock",
        artists: []
      }
    ]
  },
  {
    name: "California",
    abbr: "CA",
    wikiCities: [
      {
        name: "Anaheim",
        artists: []
      },
      {
        name: "Bakersfield",
        artists: []
      },
      {
        name: "Berkeley",
        artists: []
      },
      {
        name: "Beverly Hills",
        artists: []
      },
      {
        name: "Burbank",
        artists: []
      },
      {
        name: "Compton",
        artists: []
      },
      {
        name: "Downey",
        artists: []
      },
      {
        name: "Fresno",
        artists: []
      },
      {
        name: "Fullerton",
        artists: []
      },
      {
        name: "Glendale",
        artists: []
      },
      {
        name: "Hawthorne",
        artists: []
      },
      {
        name: "Inglewood",
        artists: []
      },
      {
        name: "Long Beach",
        artists: []
      },
      {
        name: "Los Angeles",
        artists: []
      },
      {
        name: "Manhatten Beach",
        artists: []
      },
      {
        name: "Modesto",
        artists: []
      },
      {
        name: "Newport Beach",
        artists: []
      },
      {
        name: "Oakland",
        artists: []
      },
      {
        name: "Oxnard",
        artists: []
      },
      {
        name: "Palm Springs",
        artists: []
      },
      {
        name: "Palo Alto",
        artists: []
      },
      {
        name: "Pasadena",
        artists: []
      },
      {
        name: "Redondo Beach",
        artists: []
      },
      {
        name: "Richmond",
        artists: []
      },
      {
        name: "Riverside",
        artists: []
      },
      {
        name: "Sacramento",
        artists: []
      },
      {
        name: "San Bernardino",
        artists: []
      },
      {
        name: "San Diego",
        artists: []
      },
      {
        name: "San Francisco",
        artists: []
      },
      {
        name: "San Jose",
        artists: []
      },
      {
        name: "San Rafael",
        artists: []
      },
      {
        name: "Santa Barbarbara",
        artists: []
      },
      {
        name: "Santa Cruz",
        artists: []
      },
      {
        name: "Santa Monica",
        artists: []
      },
      {
        name: "Santa Rosa",
        artists: []
      },
      {
        name: "Stockton",
        artists: []
      },
      {
        name: "Torrance",
        artists: []
      },
      {
        name: "Vallejo",
        artists: []
      },
      {
        name: "Vista",
        artists: []
      },
      {
        name: "Whittier",
        artists: []
      }
    ]
  },
  {
    name: "Colorado",
    abbr: "CO",
    wikiCities: [
      {
        name: "Boulder",
        artists: []
      },
      {
        name: "Colorado Springs",
        artists: []
      },
      {
        name: "Denver",
        artists: []
      }
    ]
  },
  {
    name: "Connecticut",
    abbr: "CT",
    wikiCities: [
      {
        name: "Bridgeport",
        artists: []
      },
      {
        name: "Greenwich",
        artists: []
      },
      {
        name: "Hartford",
        artists: []
      },
      {
        name: "New Haven",
        artists: []
      },
      {
        name: "New London",
        artists: []
      },
      {
        name: "Norwalk",
        artists: []
      },
      {
        name: "Stamford",
        artists: []
      }
    ]
  },
  {
    name: "Delaware",
    abbr: "DE",
    wikiCities: [
      {
        name: "Wilmington",
        artists: []
      }
    ]
  },
  {
    name: "Florida",
    abbr: "FL",
    wikiCities: [
      {
        name: "Coral Springs",
        artists: []
      },
      {
        name: "Daytona Beach",
        artists: []
      },
      {
        name: "Fort Lauderdale",
        artists: []
      },
      {
        name: "Gainesville",
        artists: []
      },
      {
        name: "Jacksonville",
        artists: []
      },
      {
        name: "Lakeland",
        artists: []
      },
      {
        name: "Miami",
        artists: []
      },
      {
        name: "Ocala",
        artists: []
      },
      {
        name: "Orlando",
        artists: []
      },
      {
        name: "Pensacola",
        artists: []
      },
      {
        name: "St. Petersburg",
        artists: []
      },
      {
        name: "Tallahassee",
        artists: []
      },
      {
        name: "Tampa",
        artists: []
      }
    ]
  },
  {
    name: "Georgia",
    abbr: "GA",
    wikiCities: [
      {
        name: "Albany",
        artists: []
      },
      {
        name: "Athens",
        artists: []
      },
      {
        name: "Atlanta",
        artists: []
      },
      {
        name: "Augusta",
        artists: []
      },
      {
        name: "Columbus",
        artists: []
      },
      {
        name: "Macon",
        artists: []
      },
      {
        name: "Marietta",
        artists: []
      },
      {
        name: "Savannah",
        artists: []
      }
    ]
  },
  {
    name: "Hawaii",
    abbr: "HI",
    wikiCities: [
      {
        name: "Honolulu",
        artists: []
      }
    ]
  },
  {
    name: "Idaho",
    abbr: "ID",
    wikiCities: [
      {
        name: "Boise",
        artists: []
      }
    ]
  },
  {
    name: "Illinois",
    abbr: "IL",
    wikiCities: [
      {
        name: "Champaign",
        artists: []
      },
      {
        name: "Chicago",
        artists: []
      },
      {
        name: "Decatur",
        artists: []
      },
      {
        name: "Evanston",
        artists: []
      },
      {
        name: "Joliet",
        artists: []
      },
      {
        name: "Oak Park",
        artists: []
      },
      {
        name: "Peoria",
        artists: []
      },
      {
        name: "Rockford",
        artists: []
      }
    ]
  },
  {
    name: "Indiana",
    abbr: "IN",
    wikiCities: [
      {
        name: "Anderson",
        artists: []
      },
      {
        name: "Bloomington",
        artists: []
      },
      {
        name: "Evansville",
        artists: []
      },
      {
        name: "Fort Wayne",
        artists: []
      },
      {
        name: "Gary",
        artists: []
      },
      {
        name: "Indianapolis",
        artists: []
      },
      {
        name: "Richmond",
        artists: []
      },
      {
        name: "South Bend",
        artists: []
      }
    ]
  },
  {
    name: "Iowa",
    abbr: "IA",
    wikiCities: [
      {
        name: "Cedar Rapids",
        artists: []
      },
      {
        name: "Des Moines",
        artists: []
      },
      {
        name: "Iowa City",
        artists: []
      }
    ]
  },
  {
    name: "Kansas",
    abbr: "KS",
    wikiCities: [
      {
        name: "Kansas City",
        artists: []
      },
      {
        name: "Lawrence",
        artists: []
      },
      {
        name: "Wichita",
        artists: []
      },
      {
        name: "Topeka",
        artists: []
      }
    ]
  },
  {
    name: "Kentucky",
    abbr: "KY",
    wikiCities: [
      {
        name: "Ashland",
        artists: []
      },
      {
        name: "Bowling Green",
        artists: []
      },
      {
        name: "Lexington",
        artists: []
      },
      {
        name: "Louisville",
        artists: []
      },
      {
        name: "Paducah",
        artists: []
      }
    ]
  },
  {
    name: "Louisiana",
    abbr: "LA",
    wikiCities: [
      {
        name: "Baton Rouge",
        artists: []
      },
      {
        name: "Lafayette",
        artists: []
      },
      {
        name: "Lake Charles",
        artists: []
      },
      {
        name: "Monroe",
        artists: []
      },
      {
        name: "New Orleans",
        artists: []
      },
      {
        name: "Shreveport",
        artists: []
      }
    ]
  },
  {
    name: "Maine",
    abbr: "ME",
    wikiCities: [
      {
        name: "Bangor",
        artists: []
      },
      {
        name: "Portland",
        artists: []
      }
    ]
  },
  {
    name: "Maryland",
    abbr: "MD",
    wikiCities: [
      {
        name: "Baltimore",
        artists: []
      },
      {
        name: "Rockville",
        artists: []
      }
    ]
  },
  {
    name: "Massachusetts",
    abbr: "MA",
    wikiCities: [
      {
        name: "Boston",
        artists: []
      },
      {
        name: "Brockton",
        artists: []
      },
      {
        name: "Cambridge",
        artists: []
      },
      {
        name: "Lowell",
        artists: []
      },
      {
        name: "Newton",
        artists: []
      },
      {
        name: "Somerville",
        artists: []
      },
      {
        name: "Springfield",
        artists: []
      },
      {
        name: "Worcester",
        artists: []
      }
    ]
  },
  {
    name: "Michigan",
    abbr: "MI",
    wikiCities: [
      {
        name: "Ann Arbor",
        artists: []
      },
      {
        name: "Detroit",
        artists: []
      },
      {
        name: "Flint",
        artists: []
      },
      {
        name: "Lansing",
        artists: []
      },
      {
        name: "Pontiac",
        artists: []
      },
      {
        name: "Saginaw",
        artists: []
      }
    ]
  },
  {
    name: "Minnesota",
    abbr: "MN",
    wikiCities: [
      {
        name: "Duluth",
        artists: []
      },
      {
        name: "Minneapolis",
        artists: []
      },
      {
        name: "Saint Paul",
        artists: []
      }
    ]
  },
  {
    name: "Mississippi",
    abbr: "MS",
    wikiCities: [
      {
        name: "Clarksdale",
        artists: []
      },
      {
        name: "Greenville",
        artists: []
      },
      {
        name: "Hattiesburg",
        artists: []
      },
      {
        name: "Jackson",
        artists: []
      },
      {
        name: "Meridian",
        artists: []
      },
      {
        name: "Natchez",
        artists: []
      },
      {
        name: "Vicksburg",
        artists: []
      }
    ]
  },

  {
    name: "Missouri",
    abbr: "MO",
    wikiCities: [
      {
        name: "Columbia",
        artists: columbiaMOArtists
      },
      {
        name: "Kansas City",
        artists: kansasCityMOArtists
      },
      {
        name: "Springfield",
        artists: []
      },
      {
        name: "St. Louis",
        artists: stLouisMOArtists
      }
    ]
  },
  {
    name: "Montana",
    abbr: "MT",
    wikiCities: [
      {
        name: "Missoula",
        artists: missoulaMTArtists
      }
    ]
  },
  {
    name: "Nebraska",
    abbr: "NE",
    wikiCities: [
      {
        name: "Lincoln",
        artists: lincolnNEArtists
      },
      {
        name: "Omaha",
        artists: omahaNEArtists
      }
    ]
  },
  {
    name: "Nevada",
    abbr: "NV",
    wikiCities: [
      {
        name: "Las Vegas",
        artists: lasVegasNVArtists
      },
      {
        name: "Reno",
        artists: renoNVArtists
      }
    ]
  },
  {
    name: "New Hampshire",
    abbr: "NH",
    wikiCities: []
  },
  {
    name: "New Jersey",
    abbr: "NJ",
    wikiCities: [
      {
        name: "Atlantic City",
        artists: atlanticCityNJArtists
      },
      {
        name: "Bayonne",
        artists: bayonneNJArtists
      },
      {
        name: "Camden",
        artists: camdenNJArtists
      },
      {
        name: "East Orange",
        artists: eastOrangeNJArtists
      },
      {
        name: "Hoboken",
        artists: hobokenNJArtists
      },
      {
        name: "Jersey City",
        artists: jerseyCityNJArtists
      },
      {
        name: "New Brunswick",
        artists: newBrunswickNJArtists
      },
      {
        name: "Newark",
        artists: newarkNJArtists
      },
      {
        name: "Passaic",
        artists: passaicNJArtists
      },
      {
        name: "Paterson",
        artists: patersonNJArtists
      },
      {
        name: "Plainfield",
        artists: plainfieldNJArtists
      },
      {
        name: "Summit",
        artists: summitNJArtists
      },
      {
        name: "Trenton",
        artists: trentonNJArtists
      }
    ]
  },
  {
    name: "New Mexico",
    abbr: "NM",
    wikiCities: [
      {
        name: "Albuquerque",
        artists: albuquerqueNMArtists
      },
      {
        name: "Santa Fe",
        artists: santaFeNMArtists
      }
    ]
  },
  {
    name: "New York",
    abbr: "NY",
    wikiCities: [
      {
        name: "Albany",
        artists: albanyNYArtists
      },
      {
        name: "Buffalo",
        artists: buffaloNYArtists
      },
      {
        name: "Ithaca",
        artists: ithacaNYArtists
      },
      {
        name: "Kingston",
        artists: kingstonNYArtists
      },
      {
        name: "Mount Vernon",
        artists: mountVernonNYArtists
      },
      {
        name: "New Rochelle",
        artists: newRochelleNYArtists
      },
      {
        name: "New York City",
        artists: []
      },
      {
        name: "the New York metropolitan area",
        artists: []
      },
      {
        name: "Niagara Falls",
        artists: niagaraFallsNYArtists
      },
      {
        name: "Poughkeepsie",
        artists: poughkeepsieNYArtists
      },
      {
        name: "Rochester",
        artists: rochesterNYArtists
      },
      {
        name: "Syracuse",
        artists: syracuseNYArtists
      },
      {
        name: "Troy",
        artists: troyNYArtists
      },
      {
        name: "Utica",
        artists: uticaNYArtists
      }
    ]
  },
  {
    name: "North Carolina",
    abbr: "NC",
    wikiCities: [
      {
        name: "Asheville",
        artists: ashevilleNCArtists
      },
      {
        name: "Charlotte",
        artists: charlotteNCArtists
      },
      {
        name: "Durham",
        artists: []
      },
      {
        name: "Fayetteville",
        artists: []
      },
      {
        name: "Greensboro",
        artists: []
      },
      {
        name: "Raleigh",
        artists: []
      },
      {
        name: "Winston-Salem",
        artists: []
      }
    ]
  },
  {
    name: "North Dakota",
    abbr: "ND",
    wikiCities: []
  },
  {
    name: "Ohio",
    abbr: "OH",
    wikiCities: [
      {
        name: "Akron",
        artists: akronOHArtists
      },
      {
        name: "Canton",
        artists: []
      },
      {
        name: "Cincinnati",
        artists: []
      },
      {
        name: "Cleveland",
        artists: []
      },
      {
        name: "Dayton",
        artists: []
      },
      {
        name: "Columbus",
        artists: []
      },
      {
        name: "Shaker Heights",
        artists: []
      },
      {
        name: "Springfield",
        artists: []
      },
      {
        name: "Toledo",
        artists: []
      },
      {
        name: "Youngstown",
        artists: []
      }
    ]
  },
  {
    name: "Oklahoma",
    abbr: "OK",
    wikiCities: [
      {
        name: "Enid",
        artists: []
      },
      {
        name: "Norman",
        artists: []
      },
      {
        name: "Oklahoma City",
        artists: []
      },
      {
        name: "Tulsa",
        artists: []
      }
    ]
  },
  {
    name: "Oregon",
    abbr: "OR",
    wikiCities: [
      {
        name: "Corvallis",
        artists: []
      },
      {
        name: "Eugene",
        artists: []
      },
      {
        name: "Hillsboro",
        artists: []
      },
      {
        name: "Portland",
        artists: []
      },
      {
        name: "Salem",
        artists: []
      }
    ]
  },
  {
    name: "Pennsylvania",
    abbr: "PA",
    wikiCities: [
      {
        name: "Allentown",
        artists: []
      },
      {
        name: "Easton",
        artists: []
      },
      {
        name: "Erie",
        artists: []
      },
      {
        name: "Harrisburg",
        artists: []
      },
      {
        name: "Lancaster",
        artists: []
      },
      {
        name: "Philadelphia",
        artists: []
      },
      {
        name: "Pittsburgh",
        artists: []
      },
      {
        name: "Reading",
        artists: []
      },
      {
        name: "Scranton",
        artists: []
      },
      {
        name: "York",
        artists: []
      }
    ]
  },
  {
    name: "Rhode Island",
    abbr: "RI",
    wikiCities: [
      {
        name: "Newport",
        artists: []
      },
      {
        name: "Providence",
        artists: []
      }
    ]
  },
  {
    name: "South Carolina",
    abbr: "SC",
    wikiCities: [
      {
        name: "Charleston",
        artists: []
      },
      {
        name: "Columbia",
        artists: []
      },
      {
        name: "Greenville",
        artists: []
      },
      {
        name: "Spartanburg",
        artists: []
      }
    ]
  },
  {
    name: "South Dakota",
    abbr: "SD",
    wikiCities: []
  },
  {
    name: "Tennessee",
    abbr: "TN",
    wikiCities: [
      {
        name: "Knoxville",
        artists: []
      },
      {
        name: "Memphis",
        artists: []
      },
      {
        name: "Nashville",
        artists: []
      }
    ]
  },
  {
    name: "Texas",
    abbr: "TX",
    wikiCities: [
      {
        name: "Amarillo",
        artists: []
      },
      {
        name: "Austin",
        artists: []
      },
      {
        name: "Dallas",
        artists: []
      },
      {
        name: "Houston",
        artists: []
      },
      {
        name: "San Antonio",
        artists: []
      }
    ]
  },
  {
    name: "Utah",
    abbr: "UT",
    wikiCities: [
      {
        name: "Ogden",
        artists: []
      },
      {
        name: "Provo",
        artists: []
      },
      {
        name: "Salt Lake City",
        artists: []
      }
    ]
  },
  {
    name: "Vermont",
    abbr: "VT",
    wikiCities: [
      {
        name: "Burlington",
        artists: []
      }
    ]
  },
  {
    name: "Viriginia",
    abbr: "VA",
    wikiCities: [
      {
        name: "Alexandria",
        artists: []
      },
      {
        name: "Charlottesville",
        artists: []
      },
      {
        name: "Hampton",
        artists: []
      },
      {
        name: "Lynchburg",
        artists: []
      },
      {
        name: "Newport News",
        artists: []
      },
      {
        name: "Norfolk",
        artists: []
      },
      {
        name: "Portsmouth",
        artists: []
      },
      {
        name: "Richmond",
        artists: []
      },
      {
        name: "Virginia Beach",
        artists: []
      }
    ]
  },
  {
    name: "Washington",
    abbr: "WA",
    wikiCities: [
      {
        name: "Bainbridge Island",
        artists: []
      },
      {
        name: "Kirkland",
        artists: []
      },
      {
        name: "Olympia",
        artists: []
      },
      {
        name: "Seattle",
        artists: []
      },
      {
        name: "Spokane",
        artists: []
      }
    ]
  },
  {
    name: "West Virginia",
    abbr: "WV",
    wikiCities: [
      {
        name: "Charleston",
        artists: []
      },
      {
        name: "Huntington",
        artists: []
      },
      {
        name: "Wheeling",
        artists: []
      }
    ]
  },
  {
    name: "Wisconsin",
    abbr: "WI",
    wikiCities: [
      {
        name: "Green Bay",
        artists: []
      },
      {
        name: "Kenosha",
        artists: []
      },
      {
        name: "Madison",
        artists: []
      },
      {
        name: "Milwaukee",
        artists: []
      },
      {
        name: "Racine",
        artists: []
      }
    ]
  },
  {
    name: "Wyoming",
    abbr: "WY",
    wikiCities: []
  },
  {
    name: "D.C.",
    abbr: "DC",
    wikiCities: [
      {
        name: "Washington",
        artists: []
      }
    ]
  }
];

module.exports = seedData;
