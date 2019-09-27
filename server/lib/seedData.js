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
  santaFeNMArtists = require("../lib/artists/data/santafenewmexico"),
  stLouisMOArtists = require("../lib/artistsdata/stlouis"),
  summitNJArtists = require("../lib/artistsdata/summitnewjersey"),
  syracuseNYArtists = require("../lib/artistsdata/syracusenewyork"),
  trentonNJArtists = require("../lib/artistsdata/trentonnewjersey"),
  troyNYArtists = require("../lib/artistsdata/troynewyork"),
  uticaNYArtists = require("../lib/artistsdata/uticanewyork")

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
  columbusGAArtists = require("../lib/functionartists/columbusgeorgia")
  columbusOHArtists = require("../lib/functionartists/columbusohio"),
  comptonCAArtists = require("../lib/functionartists/comptoncalifornia"),
  coralSpringsFLArtists = require("../lib/functionartists/coralspringsflorida"),
  corvallisORArtists = require("../lib/functionartists/corvallisoregon"),
  dallasTXArtists = require("../lib/functionartists/dallas"),
  daytonaBeachFLArtists = require("../lib/functionartists/daytonabeachflorida"),
  daytonOHArtists = require("../lib/functionartists/daytonohio"),
  decaturILArtists = require("../lib/functionartists/decaturillinois"),
  denverCOArtists = require("../lib/functionartists"),
  desMoinesIAArtists = require("../lib/functionartists/desmoinesiowa"),
  detroitMIArtists = require("../lib/functionartists/detroit"),
  downeyCAArtists = require("../lib/functionartists/downeycalifornia"),
  duluthMNArtists = require("../lib/functionartists/duluthminnesota"),
  durhamNCArtists = require("../lib/functionartists/durhamnorthcarolina"),
  eastonPAArtists = require("../lib/functionartists/eastonpennsylvania"),
  enidOKArtists = require("../lib/functionartists/enidoklahoma"),
  eriePAArtists = require("../lib/functionartists/eriepennsylvania"),
  eugeneORArtists = require("../lib/functionartists/eugeneoregon"),
  evanstonILArtists = require("../lib/functionartists/evanstonillinois"),
  evansvilleINArtists = require("../lib/functionartists/evansvilleindiana"),
  fayettevilleNCArtists = require("../lib/functionartists/fayettevillenorthcarolina"),
  flintMIArtists = require("../lib/functionartists/flintmichigan"),
  florenceALArtists = require("../lib/functionartists/florencealabama"),
  fortLauderdaleFLArtists = require("../lib/functionartists/fortlauderdaleflorida"),
  fortWayneINArtists = require("../lib/functionartists/fortwayneindiana"),
  fresnoCAArtists = require("../lib/functionartists/fresnocalifornia"),
  fullertonCAArtists = require("../lib/functionartists/fullertoncalifornia"),
  gadsdenALArtists = require("../lib/functionartists/gadsdenalabama"),
  gainesvilleFLArtists = require("../lib/functionartists/gainesvilleflorida"),
  garyINArtists = require("../lib/functionartists/garyindiana"),
  glendaleAZArtists = require("../lib/functionartists/glendalearizona"),
  glendaleCAArtists = require("../lib/functionartists/glendalecalifornia"),
  greenbayWIArtists = require("../lib/functionartists/greenbaywisconsin"),
  greensboroNCArtists = require("../lib/functionartists/greensboronorthcarolina"),
  greenvilleMSArtists = require("../lib/functionartists/greenvillemississippi"),
  greenvilleSCArtists = require("../lib/functionartists/greenvillesouthcarolina"),
  greenwichCTArtists = require("../lib/functionartists/greenwichconnecticut"),
  hamptonVAArtists = require("../lib/functionartists/hamptonvirginia"),
  harrisburgPAArtists = require("../lib/functionartists/harrisburgpennsylvania"),
  hartfordCTArtists = require("../lib/functionartists/hartfordconnecticut"),
  hattiesburgMSArtists = require("../lib/functionartists/hattiesburgmississippi"),
  hawthorneCAArtists = require("../lib/functionartists/hawthornecalifornia"),
  hillsboroOR = require("../lib/functionartists/hillsborooregon"),
  honoluluHIArtists = require("../lib/functionartists/honoluluhawaii"),
  hotspringsARArtists = require("../lib/functionartists/hotspringsarkansas"),
  houstonTXArtists = require("../lib/functionartists/houston"),
  huntingtonWVArtists = require("../lib/functionartists/huntingtonwestvirginia"),
  huntsvilleALArtists = require("../lib/functionartists/huntsvillealabama"),
  indianapolisINArtists = require("../lib/functionartists/indianapolis"),
  inglewoodCAArtists = require("../lib/functionartists/inglewoodcalifornia"),
  iowaCityIAArtists = require("../lib/functionartists/iowacityiowa"),
  jacksonMSArtists = require("../lib/functionartists/jacksonmississippi"),
  jacksonvilleFLArtists = require("../lib/functionartists/jacksonvilleflorida"),
  jolietILArtists = require("../lib/functionartists/jolietillinois"),
  kansasCityKSArtists = require("../lib/functionartists/kansascitykansas"),
  kenoshaWIArtists = require("../lib/functionartists/kenoshawisconsin"),
  kirklandWAArtists = require("../lib/functionartists/kirklandwashington"),
  knoxvilleTNArtists = require("../lib/functionartists/knoxvilletennessee"),
  lafayetteLAArtists = require("../lib/functionartists/lafayettelouisiana"),
  lakeCharlesLAArtists = require("../lib/functionartists/lakecharleslouisiana"),
  lakelandFLArtists = require("../lib/functionartists/lakelandflorida"),
  lancasterPAArtists = require("../lib/functionartists/lancasterpennsylvania"),
  lansingMIArtists = require("../lib/functionartists/lansingmichigan"),
  lawrenceKSArtists = require("../lib/functionartists/lawrencekansas"),
  lexingtonKYArtists = require("../lib/functionartists/lexingtonkentucky"),
  littleRockARArtists = require("../lib/functionartists/littlerockarkansas"),
  longBeachCAArtists = require("../lib/functionartists/longbeachcalifornia"),
  losAngelesCAArtists = require("../lib/functionartists/losangeles"),
  louisvilleKYArtists = require("../lib/functionartists/louisvillekentucky"),
  lowellMAArtists = require("../lib/functionartists/lowellmassachusetts"),
  lynchburgVAArtists = require("../lib/functionartists/lynchburgvirginia"),
  maconGAArtists = require("../lib/functionartists/macongeorgia"),
  madisonWIArtists = require("../lib/functionartists/madisonwisconsin"),
  manhattanBeachCAArtists = require("../lib/functionartists/manhattanbeachcalifornia"),
  mariettaGAArtists = require("../lib/functionartists/mariettageorgia"),
  memphisTNArtists = require("../lib/functionartists/memphistennessee"),
  meridianMSArtists = require("../lib/functionartists/meridianmississippi"),
  mesaAZArtists = require("../lib/functionartists/mesaarizona"),
  miamiFLArtists = require("../lib/functionartists/miami"),
  milwaukeeWIArtists = require("../lib/functionartists/milwaukee"),
  minneapolisMNArtists = require("../lib/functionartists/minneapolis"),
  mobileALArtists = require("../lib/functionartists/mobilealabama"),
  modestoCAArtists = require("../lib/functionartists/modestocalifornia"),
  monroeLAArtists = require("../lib/functionartists/monroelouisiana"),
  montgomeryALArtists = require("../lib/functionartists/montgomeryalabama"),
  nashvilleTNArtists = require("../lib/functionartists/nashvilletennessee"),
  natchezMSArtists = require("../lib/functionartists/natchezmississippi"),
  newHavenCTArtists = require("../lib/functionartists/newhavenconnecticut"),
  newLondonCTArtists = require("../lib/functionartists/newlondonconnecticut"),
  newOrleansLAArtists = require("../lib/functionartists/neworleans"),
  newportBeachCAArtists = require("../lib/functionartists/newportbeachcalifornia"),
  newportNewsVAArtists = require("../lib/functionartists/newportnewsvirginia"),
  newportRIArtists = require("../lib/functionartists/newportrhodeisland"),
  newtonMAArtists = require("../lib/functionartists/newtonmassachusetts"),
  newYorkCityNYArtists = require("../lib/functionartists/newyorkcitynewyork"),
  norfolkVAArtists = require("../lib/functionartists/norfolkvirginia"),
  normanOKArtists = require("../lib/functionartists/normanoklahoma"),
  norwalkCTArtists = require("../lib/functionartists/norwalkconnecticut"),
  oaklandCAArtists = require("../lib/functionartists/oaklandcalifornia"),
  oakParkILArtists = require("../lib/functionartists/oakparkillinois"),
  ocalaFLArtists = require("../lib/functionartists/ocalaflorida"),
  ogdenUTArtists = require("../lib/functionartists/ogdenutah"),
  okalahomaCityOKArtists = require("../lib/functionartists/oklahomacity"),
  olympiaWAArtists = require("../lib/functionartists/olympiawashington"),
  orlandoFLArtists = require("../lib/functionartists/orlandoflorida"),
  oxnardCAArtists = require("../lib/functionartists/oxnardcalifornia"),
  paducahKYArtists = require("../lib/functionartists/paducahkentucky"),
  palmSpringsCAArtists = require("../lib/functionartists/palmspringscalifornia"),
  paloaltoCAArtists = require("../lib/functionartists/paloaltocalifornia"),
  pasadenaCAArtists = require("../lib/functionartists/pasadenacalifornia"),
  pensacolaFLArtists = require("../lib/functionartists/pensacolaflorida"),
  peoriaILArtists = require("../lib/functionartists/peoriaillinois"),
  philadelphiaPAArtists = require("../lib/functionartists/philadelphia"),
  phoenixAZArtists = require("../lib/functionartists/phoenixarizona"),
  pittsburghPAArtists = require("../lib/functionartists/pittsburgh"),
  pontiacMIArtists = require("../lib/functionartists/pontiacmichigan"),
  portlandMEArtists = require("../lib/functionartists/portlandmaine"),
  portlandORArtists = require("../lib/functionartists/portlandoregon"),
  portsmouthVAArtists = require("../lib/functionartists/portsmouthvirginia"),
  providenceRIArtists = require("../lib/functionartists/providencerhodeisland"),
  provoUTArtists = require("../lib/functionartists/provoutah"),
  racineWIArtists = require("../lib/functionartists/racinewisconsin"),
  raleighNCArtists = require("../lib/functionartists/raleighnorthcarolina"),
  readingPAArtists = require("../lib/functionartists/readingpennsylvania"),
  redondoBeachCAArtists = require("../lib/functionartists/redondobeachcalifornia"),
  richmondCAArtists = require("../lib/functionartists/richmondcalifornia"),
  richmondINArtists = require("../lib/functionartists/richmondindiana"),
  richmondVAArtists = require("../lib/functionartists/richmondvirginia"),
  riversideCAArtists = require("../lib/functionartists/riversidecalifornia"),
  rockfordILArtists = require("../lib/functionartists/rockfordillinois"),
  rockvilleMDArtists = require("../lib/functionartists/rockvillemaryland"),
  sacramentoCAArtists = require("../lib/functionartists/sacramentocalifornia"),
  saginawMIArtists = require("../lib/functionartists/saginawmichigan"),
  saintPaulMNArtists = require("../lib/functionartists/saintpaulminnesota"),
  salemORArtists = require("../lib/functionartists/salemoregon"),
  saltLakeCityUTArtists = require("../lib/functionartists/saltlakecity"),
  sanAntonioTXArtists = require("../lib/functionartists/sanantonio"),
  sanBernardinoCAArtists = require("../lib/functionartists/sanbernardinocalifornia"),
  sanDiegoCAArtists = require("../lib/functionartists/sandiego"),
  sanFranciscoCAArtists = require("../lib/functionartists/sanfrancisco"),
  sanJoseCAArtists = require("../lib/functionartists/sanjosecalifornia"),
  sanRafaelCAArtists = require("../lib/functionartists/sanrafaelcalifornia"),
  santaBarbaraCAArtists = require("../lib/functionartists/santabarbaracalifornia"),
  santaCruzCAArtists = require("../lib/functionartists/santacruzcalifornia"),
  santaMonicaCAArtists = require("../lib/functionartists/santamonicacalifornia"),
  santaRosaCAArtists = require("../lib/functionartists/santarosacalifornia"),
  savannahGAArtists = require("../lib/functionartists/savannahgeorgia"),
  scottsdaleAZArtists = require("../lib/functionartists/scottsdalearizona"),
  scrantonPAArtists = require("../lib/functionartists/scrantonpennsylvania"),
  seattleWAArtists = require("../lib/functionartists/seattle"),
  shakerHeightsOHArtists = require("../lib/functionartists/shakerheightsohio"),
  shreveportLAArtists = require("../lib/functionartists/shreveportlouisiana"),
  somervilleMAArtists = require("../lib/functionartists/somervillemassachusetts"),
  southbendINArtists = require("../lib/functionartists/southbendindiana"),
  spartanburgSCArtists = require("../lib/functionartists/spartanburgsouthcarolina"),
  spokaneWAArtists = require("../lib/functionartists/spokanewashington"),
  springfieldMAArtists = require("../lib/functionartists/springfieldmassachusetts"),
  springfieldMOArtists = require("../lib/functionartists/springfieldmissouri"),
  springfieldOHArtists = require("../lib/functionartists/springfieldohio"),
  stamfordCTArtists = require("../lib/functionartists/stamfordconnecticut"),
  stocktonCAArtists = require("../lib/functionartists/stocktoncalifornia"),
  stPetersburgFLArtists = require("../lib/functionartists/stpetersburgflorida"),
  tallahasseeFLArtists = require("../lib/functionartists/tallahasseeflorida"),
  tampaFLArtists = require("../lib/functionartists/tampaflorida"),
  theNewYorkMetropolitanAreaArtists = require("../lib/functionartists/thenewyorkmetropolitanarea"),
  toledoOHArtists = require("../lib/functionartists/toledoohio"),
  topekaKSArtists = require("../lib/functionartists/topekakansas"),
  torranceCAArtists = require("../lib/functionartists/torrancecalifornia"),
  tucsonAZArtists = require("../lib/functionartists/tucsonarizona"),
  tulsaOKArtists = require("../lib/functionartists/tulsaoklahoma"),
  vallejoCAArtists = require("../lib/functionartists/vallejocalifornia"),
  vicksburgMSArtists = require("../lib/functionartists/vicksburgmississippi"),
  virginiaBeachVAArtists = require("../lib/functionartists/virginiabeachvirginia"),
  vistaCAArtists = require("../lib/functionartists/vistacalifornia"),
  washingtonDCArtists = require("../lib/functionartists/washingtondc"),
  wheelingWVArtists = require("../lib/functionartists/wheelingwestvirginia"),
  whittierCAArtists = require("../lib/functionartists/whittiercalifornia"),
  wichitaKSArtists = require("../lib/functionartists/wichitakansas"),
  wilmingtonDEArtists = require("../lib/functionartists/wilmingtondelaware"),
  winstonSalemNCArtists = require("../lib/functionartists/winstonsalemnorthcarolina"),
  worcesterMAArtists = require("../lib/functionartists/worcestermassachusetts"),
  yorkPAArtists = require("../lib/functionartists/yorkpennsylvania"),
  youngstownOHArtists = require("../lib/functionartists/youngstownohioyoungs");



const seedData = [
  {
    name: "Alabama",
    abbr: "AL",
    wikiCities: [
      {
        name: "Birmingham",
        artists: birminghamALArtists
      },
      {
        name: "Florence",
        artists: florenceALArtists
      },
      {
        name: "Gadsden",
        artists: gadsdenALArtists
      },
      {
        name: "Huntsville",
        artists: huntsvilleALArtists
      },
      {
        name: "Mobile",
        artists: mobileALArtists
      },
      {
        name: "Montgomery",
        artists: montgomeryALArtists
      }
    ]
  },
  {
    name: "Alaska",
    abbr: "AK",
    wikiCities: [
      {
        name: "Anchorage",
        artists: anchorageAKArtists
      }
    ]
  },
  {
    name: "Arizona",
    abbr: "AZ",
    wikiCities: [
      {
        name: "Glendale",
        artists: glendaleAZArtists
      },
      {
        name: "Mesa",
        artists: mesaAZArtists
      },
      {
        name: "Phoenix",
        artists: phoenixAZArtists
      },
      {
        name: "Scottsdale",
        artists: scottsdaleAZArtists
      },
      {
        name: "Tucson",
        artists: tucsonAZArtists
      }
    ]
  },
  {
    name: "Arkansas",
    abbr: "AR",
    wikiCities: [
      {
        name: "Hot Springs",
        artists: hotspringsARArtists
      },
      {
        name: "Little Rock",
        artists: littleRockARArtists
      }
    ]
  },
  {
    name: "California",
    abbr: "CA",
    wikiCities: [
      {
        name: "Anaheim",
        artists: anaheimCAArtists
      },
      {
        name: "Bakersfield",
        artists: bakersfieldCAArtists
      },
      {
        name: "Berkeley",
        artists: berkeleyCAArtists
      },
      {
        name: "Beverly Hills",
        artists: beverlyHillsCAArtists
      },
      {
        name: "Burbank",
        artists: burbankCAArtists
      },
      {
        name: "Compton",
        artists: comptonCAArtists
      },
      {
        name: "Downey",
        artists: downeyCAArtists
      },
      {
        name: "Fresno",
        artists: fresnoCAArtists
      },
      {
        name: "Fullerton",
        artists: fullertonCAArtists
      },
      {
        name: "Glendale",
        artists: glendaleCAArtists
      },
      {
        name: "Hawthorne",
        artists: hawthorneCAArtists
      },
      {
        name: "Inglewood",
        artists: inglewoodCAArtists
      },
      {
        name: "Long Beach",
        artists: longBeachCAArtists
      },
      {
        name: "Los Angeles",
        artists: losAngelesCAArtists
      },
      {
        name: "Manhatten Beach",
        artists: manhattanBeachCAArtists
      },
      {
        name: "Modesto",
        artists: modestoCAArtists
      },
      {
        name: "Newport Beach",
        artists: newportBeachCAArtists
      },
      {
        name: "Oakland",
        artists: oaklandCAArtists
      },
      {
        name: "Oxnard",
        artists: oxnardCAArtists
      },
      {
        name: "Palm Springs",
        artists: palmSpringsCAArtists
      },
      {
        name: "Palo Alto",
        artists: paloaltoCAArtists
      },
      {
        name: "Pasadena",
        artists: pasadenaCAArtists
      },
      {
        name: "Redondo Beach",
        artists: redondoBeachCAArtists
      },
      {
        name: "Richmond",
        artists: richmondCAArtists
      },
      {
        name: "Riverside",
        artists: riversideCAArtists
      },
      {
        name: "Sacramento",
        artists: sacramentoCAArtists
      },
      {
        name: "San Bernardino",
        artists: sanBernardinoCAArtists
      },
      {
        name: "San Diego",
        artists: sanDiegoCAArtists
      },
      {
        name: "San Francisco",
        artists: sanFranciscoCAArtists
      },
      {
        name: "San Jose",
        artists: sanJoseCAArtists
      },
      {
        name: "San Rafael",
        artists: sanRafaelCAArtists
      },
      {
        name: "Santa Barbarbara",
        artists: santaBarbaraCAArtists
      },
      {
        name: "Santa Cruz",
        artists: santaCruzCAArtists
      },
      {
        name: "Santa Monica",
        artists: santaMonicaCAArtists
      },
      {
        name: "Santa Rosa",
        artists: santaRosaCAArtists
      },
      {
        name: "Stockton",
        artists: stocktonCAArtists
      },
      {
        name: "Torrance",
        artists: torranceCAArtists
      },
      {
        name: "Vallejo",
        artists: vallejoCAArtists
      },
      {
        name: "Vista",
        artists: vistaCAArtists
      },
      {
        name: "Whittier",
        artists: whittierCAArtists
      }
    ]
  },
  {
    name: "Colorado",
    abbr: "CO",
    wikiCities: [
      {
        name: "Boulder",
        artists: boulderCOArtists
      },
      {
        name: "Colorado Springs",
        artists: coloradoSpringsCOArtists
      },
      {
        name: "Denver",
        artists: denverCOArtists
      }
    ]
  },
  {
    name: "Connecticut",
    abbr: "CT",
    wikiCities: [
      {
        name: "Bridgeport",
        artists: bridgeportCTArtists
      },
      {
        name: "Greenwich",
        artists: greenwichCTArtists
      },
      {
        name: "Hartford",
        artists: hartfordCTArtists
      },
      {
        name: "New Haven",
        artists: newHavenCTArtists
      },
      {
        name: "New London",
        artists: newLondonCTArtists
      },
      {
        name: "Norwalk",
        artists: norwalkCTArtists
      },
      {
        name: "Stamford",
        artists: stamfordCTArtists
      }
    ]
  },
  {
    name: "Delaware",
    abbr: "DE",
    wikiCities: [
      {
        name: "Wilmington",
        artists: wilmingtonDEArtists
      }
    ]
  },
  {
    name: "Florida",
    abbr: "FL",
    wikiCities: [
      {
        name: "Coral Springs",
        artists: coralSpringsFLArtists
      },
      {
        name: "Daytona Beach",
        artists: daytonaBeachFLArtists
      },
      {
        name: "Fort Lauderdale",
        artists: fortLauderdaleFLArtists
      },
      {
        name: "Gainesville",
        artists: gainesvilleFLArtists
      },
      {
        name: "Jacksonville",
        artists: jacksonvilleFLArtists
      },
      {
        name: "Lakeland",
        artists: lakelandFLArtists
      },
      {
        name: "Miami",
        artists: miamiFLArtists
      },
      {
        name: "Ocala",
        artists: ocalaFLArtists
      },
      {
        name: "Orlando",
        artists: orlandoFLArtists
      },
      {
        name: "Pensacola",
        artists: pensacolaFLArtists
      },
      {
        name: "St. Petersburg",
        artists: stPetersburgFLArtists
      },
      {
        name: "Tallahassee",
        artists: tallahasseeFLArtists
      },
      {
        name: "Tampa",
        artists: tampaFLArtists
      }
    ]
  },
  {
    name: "Georgia",
    abbr: "GA",
    wikiCities: [
      {
        name: "Albany",
        artists: albanyGAArtists
      },
      {
        name: "Athens",
        artists: athensGAArtists
      },
      {
        name: "Atlanta",
        artists: atlantaGAArtists
      },
      {
        name: "Augusta",
        artists: augustaGAArtists
      },
      {
        name: "Columbus",
        artists: columbusGAArtists
      },
      {
        name: "Macon",
        artists: maconGAArtists
      },
      {
        name: "Marietta",
        artists: mariettaGAArtists
      },
      {
        name: "Savannah",
        artists: savannahGAArtists
      }
    ]
  },
  {
    name: "Hawaii",
    abbr: "HI",
    wikiCities: [
      {
        name: "Honolulu",
        artists: honoluluHIArtists
      }
    ]
  },
  {
    name: "Idaho",
    abbr: "ID",
    wikiCities: [
      {
        name: "Boise",
        artists: boiseIDArtists
      }
    ]
  },
  {
    name: "Illinois",
    abbr: "IL",
    wikiCities: [
      {
        name: "Champaign",
        artists: champaignILArtists
      },
      {
        name: "Chicago",
        artists: chicagoILArtists
      },
      {
        name: "Decatur",
        artists: decaturILArtists
      },
      {
        name: "Evanston",
        artists: evanstonILArtists
      },
      {
        name: "Joliet",
        artists: jolietILArtists
      },
      {
        name: "Oak Park",
        artists: oakParkILArtists
      },
      {
        name: "Peoria",
        artists: peoriaILArtists
      },
      {
        name: "Rockford",
        artists: rockfordILArtists
      }
    ]
  },
  {
    name: "Indiana",
    abbr: "IN",
    wikiCities: [
      {
        name: "Anderson",
        artists: andersonINArtists
      },
      {
        name: "Bloomington",
        artists: bloomingtonINArtists
      },
      {
        name: "Evansville",
        artists: evansvilleINArtists
      },
      {
        name: "Fort Wayne",
        artists: fortWayneINArtists
      },
      {
        name: "Gary",
        artists: garyINArtists
      },
      {
        name: "Indianapolis",
        artists: indianapolisINArtists
      },
      {
        name: "Richmond",
        artists: richmondINArtists
      },
      {
        name: "South Bend",
        artists: southbendINArtists
      }
    ]
  },
  {
    name: "Iowa",
    abbr: "IA",
    wikiCities: [
      {
        name: "Cedar Rapids",
        artists: cedarRapidsIAArtists
      },
      {
        name: "Des Moines",
        artists: desMoinesIAArtists
      },
      {
        name: "Iowa City",
        artists: iowaCityIAArtists
      }
    ]
  },
  {
    name: "Kansas",
    abbr: "KS",
    wikiCities: [
      {
        name: "Kansas City",
        artists: kansasCityKSArtists
      },
      {
        name: "Lawrence",
        artists: lawrenceKSArtists
      },
      {
        name: "Wichita",
        artists: wichitaKSArtists
      },
      {
        name: "Topeka",
        artists: topekaKSArtists
      }
    ]
  },
  {
    name: "Kentucky",
    abbr: "KY",
    wikiCities: [
      {
        name: "Ashland",
        artists: ashlandKYArtists
      },
      {
        name: "Bowling Green",
        artists: bowlingGreenKYArtists
      },
      {
        name: "Lexington",
        artists: lexingtonKYArtists
      },
      {
        name: "Louisville",
        artists: louisvilleKYArtists
      },
      {
        name: "Paducah",
        artists: paducahKYArtists
      }
    ]
  },
  {
    name: "Louisiana",
    abbr: "LA",
    wikiCities: [
      {
        name: "Baton Rouge",
        artists: batonRougeLAArtists
      },
      {
        name: "Lafayette",
        artists: lafayetteLAArtists
      },
      {
        name: "Lake Charles",
        artists: lakeCharlesLAArtists
      },
      {
        name: "Monroe",
        artists: monroeLAArtists
      },
      {
        name: "New Orleans",
        artists: newOrleansLAArtists
      },
      {
        name: "Shreveport",
        artists: shreveportLAArtists
      }
    ]
  },
  {
    name: "Maine",
    abbr: "ME",
    wikiCities: [
      {
        name: "Bangor",
        artists: bangorMEArtists
      },
      {
        name: "Portland",
        artists: portlandMEArtists
      }
    ]
  },
  {
    name: "Maryland",
    abbr: "MD",
    wikiCities: [
      {
        name: "Baltimore",
        artists: baltimoreMDArtists
      },
      {
        name: "Rockville",
        artists: rockvilleMDArtists
      }
    ]
  },
  {
    name: "Massachusetts",
    abbr: "MA",
    wikiCities: [
      {
        name: "Boston",
        artists: bostonMAArtists
      },
      {
        name: "Brockton",
        artists: brocktonMAArtists
      },
      {
        name: "Cambridge",
        artists: cambridgeMAArtists
      },
      {
        name: "Lowell",
        artists: lowellMAArtists
      },
      {
        name: "Newton",
        artists: newtonMAArtists
      },
      {
        name: "Somerville",
        artists: somervilleMAArtists
      },
      {
        name: "Springfield",
        artists: springfieldMAArtists
      },
      {
        name: "Worcester",
        artists: worcesterMAArtists
      }
    ]
  },
  {
    name: "Michigan",
    abbr: "MI",
    wikiCities: [
      {
        name: "Ann Arbor",
        artists: annArborMIArtists
      },
      {
        name: "Detroit",
        artists: detroitMIArtists
      },
      {
        name: "Flint",
        artists: flintMIArtists
      },
      {
        name: "Lansing",
        artists: lansingMIArtists
      },
      {
        name: "Pontiac",
        artists: pontiacMIArtists
      },
      {
        name: "Saginaw",
        artists: saginawMIArtists
      }
    ]
  },
  {
    name: "Minnesota",
    abbr: "MN",
    wikiCities: [
      {
        name: "Duluth",
        artists: duluthMNArtists
      },
      {
        name: "Minneapolis",
        artists: minneapolisMNArtists
      },
      {
        name: "Saint Paul",
        artists: saintPaulMNArtists
      }
    ]
  },
  {
    name: "Mississippi",
    abbr: "MS",
    wikiCities: [
      {
        name: "Clarksdale",
        artists: clarksdaleMSArtists
      },
      {
        name: "Greenville",
        artists: greenvilleMSArtists
      },
      {
        name: "Hattiesburg",
        artists: hattiesburgMSArtists
      },
      {
        name: "Jackson",
        artists: jacksonMSArtists
      },
      {
        name: "Meridian",
        artists: meridianMSArtists
      },
      {
        name: "Natchez",
        artists: natchezMSArtists
      },
      {
        name: "Vicksburg",
        artists: vicksburgMSArtists
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
        artists: springfieldMOArtists
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
    wikiCities: [] // Empty
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
        artists: newYorkCityNYArtists
      },
      {
        name: "the New York metropolitan area",
        artists: theNewYorkMetropolitanAreaArtists
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
        artists: durhamNCArtists
      },
      {
        name: "Fayetteville",
        artists: fayettevilleNCArtists
      },
      {
        name: "Greensboro",
        artists: greensboroNCArtists
      },
      {
        name: "Raleigh",
        artists: raleighNCArtists
      },
      {
        name: "Winston-Salem",
        artists: winstonSalemNCArtists
      }
    ]
  },
  {
    name: "North Dakota",
    abbr: "ND",
    wikiCities: [] // Empty
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
        artists: cantonOHArtists
      },
      {
        name: "Cincinnati",
        artists: cincinnatiOHArtists
      },
      {
        name: "Cleveland",
        artists: clevelandOHArtists
      },
      {
        name: "Dayton",
        artists: daytonOHArtists
      },
      {
        name: "Columbus",
        artists: columbusOHArtists
      },
      {
        name: "Shaker Heights",
        artists: shakerHeightsOHArtists
      },
      {
        name: "Springfield",
        artists: springfieldOHArtists
      },
      {
        name: "Toledo",
        artists: toledoOHArtists
      },
      {
        name: "Youngstown",
        artists: youngstownOHArtists
      }
    ]
  },
  {
    name: "Oklahoma",
    abbr: "OK",
    wikiCities: [
      {
        name: "Enid",
        artists: enidOKArtists
      },
      {
        name: "Norman",
        artists: normanOKArtists
      },
      {
        name: "Oklahoma City",
        artists: okalahomaCityOKArtists
      },
      {
        name: "Tulsa",
        artists: tulsaOKArtists
      }
    ]
  },
  {
    name: "Oregon",
    abbr: "OR",
    wikiCities: [
      {
        name: "Corvallis",
        artists: corvallisORArtists
      },
      {
        name: "Eugene",
        artists: eugeneORArtists
      },
      {
        name: "Hillsboro",
        artists: hillsboroOR
      },
      {
        name: "Portland",
        artists: portlandORArtists
      },
      {
        name: "Salem",
        artists: salemORArtists
      }
    ]
  },
  {
    name: "Pennsylvania",
    abbr: "PA",
    wikiCities: [
      {
        name: "Allentown",
        artists: allentownPAArtists
      },
      {
        name: "Easton",
        artists: eastonPAArtists
      },
      {
        name: "Erie",
        artists: eriePAArtists
      },
      {
        name: "Harrisburg",
        artists: harrisburgPAArtists
      },
      {
        name: "Lancaster",
        artists: lancasterPAArtists
      },
      {
        name: "Philadelphia",
        artists: philadelphiaPAArtists
      },
      {
        name: "Pittsburgh",
        artists: pittsburghPAArtists
      },
      {
        name: "Reading",
        artists: readingPAArtists
      },
      {
        name: "Scranton",
        artists: scrantonPAArtists
      },
      {
        name: "York",
        artists: yorkPAArtists
      }
    ]
  },
  {
    name: "Rhode Island",
    abbr: "RI",
    wikiCities: [
      {
        name: "Newport",
        artists: newportRIArtists
      },
      {
        name: "Providence",
        artists: providenceRIArtists
      }
    ]
  },
  {
    name: "South Carolina",
    abbr: "SC",
    wikiCities: [
      {
        name: "Charleston",
        artists: charlestonSCArtists
      },
      {
        name: "Columbia",
        artists: columbiaSCArtists
      },
      {
        name: "Greenville",
        artists: greenvilleSCArtists
      },
      {
        name: "Spartanburg",
        artists: spartanburgSCArtists
      }
    ]
  },
  {
    name: "South Dakota",
    abbr: "SD",
    wikiCities: [] // Empty
  },
  {
    name: "Tennessee",
    abbr: "TN",
    wikiCities: [
      {
        name: "Knoxville",
        artists: knoxvilleTNArtists
      },
      {
        name: "Memphis",
        artists: memphisTNArtists
      },
      {
        name: "Nashville",
        artists: nashvilleTNArtists
      }
    ]
  },
  {
    name: "Texas",
    abbr: "TX",
    wikiCities: [
      {
        name: "Amarillo",
        artists: amarilloTXArtists
      },
      {
        name: "Austin",
        artists: austinTXArtists
      },
      {
        name: "Dallas",
        artists: dallasTXArtists
      },
      {
        name: "Houston",
        artists: houstonTXArtists
      },
      {
        name: "San Antonio",
        artists: sanAntonioTXArtists
      }
    ]
  },
  {
    name: "Utah",
    abbr: "UT",
    wikiCities: [
      {
        name: "Ogden",
        artists: ogdenUTArtists
      },
      {
        name: "Provo",
        artists: provoUTArtists
      },
      {
        name: "Salt Lake City",
        artists: saltLakeCityUTArtists
      }
    ]
  },
  {
    name: "Vermont",
    abbr: "VT",
    wikiCities: [
      {
        name: "Burlington",
        artists: burlingtonVTArtists
      }
    ]
  },
  {
    name: "Viriginia",
    abbr: "VA",
    wikiCities: [
      {
        name: "Alexandria",
        artists: alexandriaVAArtists
      },
      {
        name: "Charlottesville",
        artists: charlottesvilleVAArtists
      },
      {
        name: "Hampton",
        artists: hamptonVAArtists
      },
      {
        name: "Lynchburg",
        artists: lynchburgVAArtists
      },
      {
        name: "Newport News",
        artists: newportNewsVAArtists
      },
      {
        name: "Norfolk",
        artists: norfolkVAArtists
      },
      {
        name: "Portsmouth",
        artists: portsmouthVAArtists
      },
      {
        name: "Richmond",
        artists: richmondVAArtists
      },
      {
        name: "Virginia Beach",
        artists: virginiaBeachVAArtists
      }
    ]
  },
  {
    name: "Washington",
    abbr: "WA",
    wikiCities: [
      {
        name: "Bainbridge Island",
        artists: bainbridgeIslandWAArtists
      },
      {
        name: "Kirkland",
        artists: kirklandWAArtists
      },
      {
        name: "Olympia",
        artists: olympiaWAArtists
      },
      {
        name: "Seattle",
        artists: seattleWAArtists
      },
      {
        name: "Spokane",
        artists: spokaneWAArtists
      }
    ]
  },
  {
    name: "West Virginia",
    abbr: "WV",
    wikiCities: [
      {
        name: "Charleston",
        artists: charlestonWVArtists
      },
      {
        name: "Huntington",
        artists: huntingtonWVArtists
      },
      {
        name: "Wheeling",
        artists: wheelingWVArtists
      }
    ]
  },
  {
    name: "Wisconsin",
    abbr: "WI",
    wikiCities: [
      {
        name: "Green Bay",
        artists: greenbayWIArtists
      },
      {
        name: "Kenosha",
        artists: kenoshaWIArtists
      },
      {
        name: "Madison",
        artists: madisonWIArtists
      },
      {
        name: "Milwaukee",
        artists: milwaukeeWIArtists
      },
      {
        name: "Racine",
        artists: racineWIArtists
      }
    ]
  },
  {
    name: "Wyoming",
    abbr: "WY",
    wikiCities: [] // Empty
  },
  {
    name: "D.C.",
    abbr: "DC",
    wikiCities: [
      {
        name: "Washington",
        artists: washingtonDCArtists
      }
    ]
  }
];


module.exports = seedData;
