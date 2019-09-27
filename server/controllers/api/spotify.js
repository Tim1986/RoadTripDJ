const router = require("express").Router(),
  axios = require("axios"),
  spotifyTest = require("../api/spotifyTest.js"),
  algorithm = require("../../lib/redo.js")

//====================================
//Dummy Data
//====================================
const startArrayFinal = [ {"_id":{"$oid":"5d8a4831690a916befd55aa2"},"artist":"Big Chief Ellis","spotifyID":"1wVEYaqTmGsl3i7np7xQjW","popularity":1.0},
{"_id":{"$oid":"5d8a4831690a916befd55aa3"},"artist":"Piney Brown","spotifyID":"2HmZdjlDimqtP7ZC2xesRw","popularity":2.0},
{"_id":{"$oid":"5d8a4831690a916befd55aa4"},"artist":"Al Gallodoro","spotifyID":"3kbInY1QFuM56VxMbtbmWD","popularity":3.0},
{"_id":{"$oid":"5d8a4831690a916befd55aa5"},"artist":"Sam Dees","spotifyID":"25kvpgmZP82Hn719lpTrlX","popularity":24.0},
{"_id":{"$oid":"5d8a4831690a916befd55aa6"},"artist":"Nell Carter","spotifyID":"2SP8ktWq2cdnGUOtzFILfB","popularity":13.0},
{"_id":{"$oid":"5d8a4831690a916befd55aa7"},"artist":"Arthur Doyle","spotifyID":"3Xj8xqJUruJ2moKunjaf0d","popularity":53.0},
{"_id":{"$oid":"5d8a4831690a916befd55aa8"},"artist":"Haywood Henry","spotifyID":"6z54C4DJsSJh4E7Iz4Fu9u","popularity":3.0},
{"_id":{"$oid":"5d8a4831690a916befd55aa9"},"artist":"Diana DeGarmo","spotifyID":"59eUYRRUA8EnmFBgR5kl33","popularity":14.0},
{"_id":{"$oid":"5d8a4831690a916befd55aaa"},"artist":"Big Joe Duskin","spotifyID":"2qQLjtrCXMHvWF31LiQbyB","popularity":9.0},
{"_id":{"$oid":"5d8a4831690a916befd55aab"},"artist":"Charles Anderson","spotifyID":"1nzDJSsUJBn9uC7LJpY5wC","popularity":3.0},
{"_id":{"$oid":"5d8a4831690a916befd55aac"},"artist":"Peter Bradley Adams","spotifyID":"0CdbG1eHVjqjkQsGoH2u1V","popularity":59.0},
{"_id":{"$oid":"5d8a4831690a916befd55aad"},"artist":"Dennis Irwin","spotifyID":"6jpz8XE6j7M4q5DB5Cce6I","popularity":15.0},
{"_id":{"$oid":"5d8a4831690a916befd55aae"},"artist":"Alice Chalifoux","spotifyID":"4FXXf4RDJ6TIOX11JywHUg","popularity":0.0},
{"_id":{"$oid":"5d8a4831690a916befd55aaf"},"artist":"Jimmy Bryant","spotifyID":"6IKq5gnh3GQrnxztypZKZR","popularity":14.0},
{"_id":{"$oid":"5d8a4831690a916befd55ab0"},"artist":"Monte Montgomery","spotifyID":"0lRHJ9PmO1uOD7LUO89KzI","popularity":23.0},
{"_id":{"$oid":"5d8a4831690a916befd55ab1"},"artist":"Inez Andrews","spotifyID":"3KT4jB978CkSbdqWbLgT1x","popularity":20.0},
{"_id":{"$oid":"5d8a4831690a916befd55ab2"},"artist":"Adolphus Bell","spotifyID":"7MIzCuBfaRav8M9EXvYggi","popularity":1.0},
{"_id":{"$oid":"5d8a4831690a916befd55ab3"},"artist":"Eddie Kendricks","spotifyID":"2Uuon75BhnuuxdKLYn4wHn","popularity":50.0},
{"_id":{"$oid":"5d8a4831690a916befd55ab4"},"artist":"Gucci Mane","spotifyID":"13y7CgLHjMVRMDqxdx0Xdo","popularity":84.0},
{"_id":{"$oid":"5d8a4831690a916befd55ab5"},"artist":"Taylor Hicks","spotifyID":"3E3tW69eMfAffLGgsmP3GG","popularity":28.0},
{"_id":{"$oid":"5d8a4831690a916befd55ab6"},"artist":"Bo Bice","spotifyID":"2Q1FIPavG8WZF33kqIP3sy","popularity":28.0},
{"_id":{"$oid":"5d8a4831690a916befd55ab7"},"artist":"Paul Bascomb","spotifyID":"243sVplrS0QzuiY3rkjm5t","popularity":15.0},
{"_id":{"$oid":"5d8a4831690a916befd55ab8"},"artist":"François Clemmons","spotifyID":"1OqZZ2XB6AmEDg411r0GtF","popularity":17.0},
{"_id":{"$oid":"5d8a4831690a916befd55ab9"},"artist":"Angela Christian","spotifyID":"4m2DtjfFGmNBegmJT9VZ1B","popularity":23.0},
{"_id":{"$oid":"5d8a4831690a916befd55aba"},"artist":"Johnny O'Neal","spotifyID":"0GCJ4kJKmHuLJw6goEKAP2","popularity":10.0},
{"_id":{"$oid":"5d8a4831690a916befd55abb"},"artist":"Lucille Bogan","spotifyID":"2cDKW2JF97WZ5ruG9Obfdf","popularity":28.0},
{"_id":{"$oid":"5d8a4831690a916befd55abc"},"artist":"Matthew Mayfield","spotifyID":"0wqCmiRvTgsobz3AZoadXq","popularity":36.0},
{"_id":{"$oid":"5d8a4831690a916befd55abd"},"artist":"Dee Edwards","spotifyID":"3Eq6DV1mdZgmSBI1LDqaMM","popularity":30.0},
{"_id":{"$oid":"5d8a4831690a916befd55abe"},"artist":"Orenda Fink","spotifyID":"4BE89iaWTT2W3bBSFjPOus","popularity":12.0},
{"_id":{"$oid":"5d8a4831690a916befd55abf"},"artist":"Jimmy Hall","spotifyID":"2LorJQEiLTxNDsJ3jVrQNi","popularity":39.0},
{"_id":{"$oid":"5d8a4831690a916befd55ac0"},"artist":"Shorty Long","spotifyID":"3J11x63maeBtbx8zXgzftQ","popularity":25.0},
{"_id":{"$oid":"5d8a4831690a916befd55ac1"},"artist":"John Ball","spotifyID":"0VqjA59hK0AIDFXiA8liQb","popularity":9.0},
{"_id":{"$oid":"5d8a4831690a916befd55ac2"},"artist":"Odetta","spotifyID":"2wkz8hACugzAvF0voupg3H","popularity":42.0},
{"_id":{"$oid":"5d8a4831690a916befd55ac3"},"artist":"Sara Evans","spotifyID":"7qvsLYsYP0MHD7jkdv6DAG","popularity":56.0},
{"_id":{"$oid":"5d8a4831690a916befd55ac4"},"artist":"Coot Grant","spotifyID":"1JHoo21CdsdDEDoZDswKVW","popularity":0.0},
{"_id":{"$oid":"5d8a4831690a916befd55ac5"},"artist":"Dennis Edwards","spotifyID":"15Kzh2fTgAW2AGXcGD32Kp","popularity":44.0},
{"_id":{"$oid":"5d8a4831690a916befd55ac6"},"artist":"Joe Guy","spotifyID":"2YzsrCeNqbeiZtTF8yMzOK","popularity":1.0},
{"_id":{"$oid":"5d8a4831690a916befd55ac7"},"artist":"Emmylou Harris","spotifyID":"5s6TJEuHTr9GR894wc6VfP","popularity":61.0},
{"_id":{"$oid":"5d8a4831690a916befd55ac8"},"artist":"Sammy Lowe","spotifyID":"1GmnM2cK0KPb5kSVQ6fNr7","popularity":3.0},
{"_id":{"$oid":"5d8a4831690a916befd55ac9"},"artist":"Jimmy Murphy","spotifyID":"0mebCebYFRqQa9Ab7CjeqM","popularity":5.0},
{"_id":{"$oid":"5d8a4831690a916befd55aca"},"artist":"Hank Green","spotifyID":"2SQVGFEgP0UZTZC1re2ECh","popularity":35.0},
{"_id":{"$oid":"5d8a4831690a916befd55acb"},"artist":"Lionel Hampton","spotifyID":"2PjgZkwAEk7UTin4jP6HLP","popularity":43.0},
{"_id":{"$oid":"5d8a4831690a916befd55acc"},"artist":"Justin Jarvis","spotifyID":"3ETXmapfkZXZWXBHvUl9xj","popularity":27.0},
{"_id":{"$oid":"5d8a4831690a916befd55acd"},"artist":"Julian Patrick","spotifyID":"1PgEKMKFlNoIIweQfuWDFB","popularity":0.0},
{"_id":{"$oid":"5d8a4831690a916befd55ace"},"artist":"Frederick Knight","spotifyID":"3X7yeRPAqw2O76f84A2r9U","popularity":19.0},
{"_id":{"$oid":"5d8a4831690a916befd55acf"},"artist":"Kell Osborne","spotifyID":"411zg10iMHnKMsKpPU5Fip","popularity":0.0},
{"_id":{"$oid":"5d8a4831690a916befd55ad0"},"artist":"Wayne Perkins","spotifyID":"0oTDbGjQMOIgGTnYGoh4W1","popularity":0.0},
{"_id":{"$oid":"5d8a4831690a916befd55ad1"},"artist":"Erskine Hawkins","spotifyID":"56FeQ03tAPYJ2gwmGhrpbF","popularity":23.0},
{"_id":{"$oid":"5d8a4831690a916befd55ad2"},"artist":"Hank Penny","spotifyID":"6W07XPRu62EPkBuzauIQTI","popularity":13.0},
{"_id":{"$oid":"5d8a4831690a916befd55ad3"},"artist":"Baker Knight","spotifyID":"0L4oAN8Fs1WGE7obVvllGF","popularity":5.0},
{"_id":{"$oid":"5d8a4831690a916befd55ad4"},"artist":"Willis Alan Ramsey","spotifyID":"0e4Y5YLe1wySeraOkkUiAX","popularity":20.0},
{"_id":{"$oid":"5d8a4831690a916befd55ad5"},"artist":"Chuck Leavell","spotifyID":"3Dj8QpO2yUyElSCfiatKI9","popularity":26.0},
{"_id":{"$oid":"5d8a4831690a916befd55ad6"},"artist":"YBN Nahmir","spotifyID":"3gGUMEwIX6XodWsYEvKSal","popularity":73.0},
{"_id":{"$oid":"5d8a4831690a916befd55ad7"},"artist":"Jo Jones","spotifyID":"5iCN8xlg1r3uXDW5yLFHmJ","popularity":24.0},
{"_id":{"$oid":"5d8a4831690a916befd55ad8"},"artist":"Dorothy Love Coates","spotifyID":"2JkBM1X0EMm8YrYGkVti1x","popularity":15.0},
{"_id":{"$oid":"5d8a4831690a916befd55ad9"},"artist":"Louis Schefano","spotifyID":"6gsEOKx8Z0CkVviR9DC3W6","popularity":3.0},
{"_id":{"$oid":"5d8a4831690a916befd55ada"},"artist":"Sam Lay","spotifyID":"1PW0zWvKLUKl0rra9DFVJi","popularity":3.0},
{"_id":{"$oid":"5d8a4831690a916befd55adb"},"artist":"Dan Sartain","spotifyID":"6AZ4TQhtH9GsoTFe2CxR2n","popularity":30.0},
{"_id":{"$oid":"5d8a4831690a916befd55adc"},"artist":"Hugh Martin","spotifyID":"4n5HR9kS4Dhl1t685XlDhW","popularity":24.0},
{"_id":{"$oid":"5d8a4831690a916befd55add"},"artist":"Jimmy Swan","spotifyID":"1afFJn0kzOMLqOhIx1df7I","popularity":1.0},
{"_id":{"$oid":"5d8a4831690a916befd55ade"},"artist":"Jimmy Jones","spotifyID":"7ydcRbgt0yM9etADb1Ackp","popularity":42.0},
{"_id":{"$oid":"5d8a4831690a916befd55adf"},"artist":"Anthony Crawford","spotifyID":"61EADOFt531MHdvb1LLFZU","popularity":16.0},
{"_id":{"$oid":"5d8a4831690a916befd55ae0"},"artist":"Billy Valentine","spotifyID":"0YyLcVIufBPVyu6vGDzBNO","popularity":43.0},
{"_id":{"$oid":"5d8a4831690a916befd55ae1"},"artist":"Moses Mayfield","spotifyID":"4heWel9l9wryjfXdGi7nww","popularity":13.0},
{"_id":{"$oid":"5d8a4831690a916befd55ae2"},"artist":"Taylor Hollingsworth","spotifyID":"2LU1vQ6CSUh2IDlfwQWS6k","popularity":21.0},
{"_id":{"$oid":"5d8a4831690a916befd55ae3"},"artist":"Tommy Jackson","spotifyID":"0xPrsjr4tyHNvIngZmYeh7","popularity":1.0},
{"_id":{"$oid":"5d8a4831690a916befd55ae4"},"artist":"Bobby Nunn","spotifyID":"1yhzCbZjwotCHCLooW995x","popularity":7.0},
{"_id":{"$oid":"5d8a4831690a916befd55ae5"},"artist":"Jackson Hill","spotifyID":"6N2mIckxqo6yH85gElxjZY","popularity":12.0},
{"_id":{"$oid":"5d8a4831690a916befd55ae6"},"artist":"Mitty Collier","spotifyID":"0nDEW2hmRliyOfxJwO2CL9","popularity":19.0},
{"_id":{"$oid":"5d8a4831690a916befd55ae7"},"artist":"Bill Justis","spotifyID":"0z16OEWcUEFzMRWBOGyOcF","popularity":40.0},
{"_id":{"$oid":"5d8a4831690a916befd55ae8"},"artist":"William King","spotifyID":"7muEREn45ODfYAtXBs0Phh","popularity":18.0},
{"_id":{"$oid":"5d8a4831690a916befd55ae9"},"artist":"Mickey Rooney Jr.","spotifyID":"6vuRFhhjAuKW23pCH8vnUm","popularity":0.0},
{"_id":{"$oid":"5d8a4831690a916befd55aea"},"artist":"Gino Parks","spotifyID":"3Gxx2SzTn8pHaju9LTXpnz","popularity":19.0},
{"_id":{"$oid":"5d8a4831690a916befd55aeb"},"artist":"Taura Stinson","spotifyID":"35nTdJokzM0poxrpF1zgB8","popularity":2.0},
{"_id":{"$oid":"5d8a4831690a916befd55aec"},"artist":"Ruben Studdard","spotifyID":"0H0yrKDty3I7pPrNUSH3wW","popularity":43.0},
{"_id":{"$oid":"5d8a4831690a916befd55aed"},"artist":"Don Varner","spotifyID":"70ngj1DvkHKpQdPtRpnHjL","popularity":3.0},
{"_id":{"$oid":"5d8a4831690a916befd55aee"},"artist":"Big Reese","spotifyID":"4fO6xCaRZ2hTFkr23ZrmIn","popularity":0.0},
{"_id":{"$oid":"5d8a4831690a916befd55aef"},"artist":"David Vest","spotifyID":"2C04Xr7eFP1bFc2XWTDRTx","popularity":10.0},
{"_id":{"$oid":"5d8a4831690a916befd55af0"},"artist":"Ray Reach","spotifyID":"6hVKkNeDQ4MQNz0RYORRlF","popularity":0.0},
{"_id":{"$oid":"5d8a4831690a916befd55af1"},"artist":"Ezra Sims","spotifyID":"0a28r6p6cANLbPgyzECXXg","popularity":0.0},
{"_id":{"$oid":"5d8a4831690a916befd55af2"},"artist":"Maria Taylor","spotifyID":"6iKiDPed4LAQEcPZpvf00m","popularity":31.0},
{"_id":{"$oid":"5d8a4831690a916befd55af3"},"artist":"Johnny Smith","spotifyID":"3u7Tz2oLTRPG9Cn7PcuZ2q","popularity":24.0},
{"_id":{"$oid":"5d8a4831690a916befd55af4"},"artist":"Susanna Phillips","spotifyID":"4HkDwGNGoCkhY6b7l176OU","popularity":10.0},
{"_id":{"$oid":"5d8a4831690a916befd55af5"},"artist":"Sun Ra","spotifyID":"0tIODqvzGUoEaK26rK4pvX","popularity":44.0},
{"_id":{"$oid":"5d8a487e690a916befd55af6"},"artist":"The Pierces","spotifyID":"1ET1wIkDmuCBC80XcTr3Sg","popularity":45.0},
{"_id":{"$oid":"5d8a487e690a916befd55af7"},"artist":"Fort Atlantic","spotifyID":"4Rdk2ceg24bhG52VuMcZ7Y","popularity":41.0},
{"_id":{"$oid":"5d8a487e690a916befd55af8"},"artist":"Marion Worth","spotifyID":"0CUtS1azBsVCvaRqg31AYc","popularity":19.0},
{"_id":{"$oid":"5d8a487e690a916befd55af9"},"artist":"Terry Weeks","spotifyID":"4Qc2xqyRWRln0X7IHnKbPb","popularity":0.0},
{"_id":{"$oid":"5d8a487e690a916befd55afa"},"artist":"Jabo Williams","spotifyID":"27WaRjbLbCFcawKw6WceDB","popularity":0.0},
{"_id":{"$oid":"5d8a487e690a916befd55afb"},"artist":"Embers in Ashes","spotifyID":"4xSSoOm2CcWXAp85huAZPd","popularity":11.0},
{"_id":{"$oid":"5d8a487e690a916befd55afc"},"artist":"Maylene and the Sons of Disaster","spotifyID":"5qSQDLG1CdotFh8eWhm7yT","popularity":40.0},
{"_id":{"$oid":"5d8a487e690a916befd55afd"},"artist":"Magic City Jazz Orchestra","spotifyID":"0GNzUmOTBBNQpttqaX2LLw","popularity":0.0},
{"_id":{"$oid":"5d8a487e690a916befd55afe"},"artist":"Alabama Symphony Orchestra","spotifyID":"3rzWO33nTHToKj5iOT4daR","popularity":2.0},
{"_id":{"$oid":"5d8a487e690a916befd55aff"},"artist":"I Am Terrified","spotifyID":"5xSugdBNS0F62L9PfRrHPm","popularity":4.0},
{"_id":{"$oid":"5d8a487e690a916befd55b00"},"artist":"Dale Watson","spotifyID":"67meObnM9NdAyCO373aaEp","popularity":39.0},
{"_id":{"$oid":"5d8a487e690a916befd55b01"},"artist":"Jacob Needham & The Blue Trees","spotifyID":"0EEpiznCuQ0TmC1xIrkD8z","popularity":23.0},
{"_id":{"$oid":"5d8a487e690a916befd55b02"},"artist":"Brother Cane","spotifyID":"4C2mRKodTEQRrE5EaGtjr5","popularity":36.0},
{"_id":{"$oid":"5d8a487e690a916befd55b03"},"artist":"Waxahatchee","spotifyID":"5IWCU0V9evBlW4gIeGY4zF","popularity":45.0},
{"_id":{"$oid":"5d8a487e690a916befd55b04"},"artist":"Hotel","spotifyID":"2ooIqOf4X2uz4mMptXCtie","popularity":59.0},
{"_id":{"$oid":"5d8a487e690a916befd55b05"},"artist":"Remy Zero","spotifyID":"2pZCKLhbrrDD4PwEzrDig3","popularity":46.0},
 ]

 const endArrayFinal = [{"_id":{"$oid":"5d8b727f690a916befd564eb"},"artist":"Verna Arvey","spotifyID":"7sTbOqIAgcsGfXB7z0KLqz","popularity":0.0},
 {"_id":{"$oid":"5d8b727f690a916befd564ec"},"artist":"Gannin Arnold","spotifyID":"5VuItfRWIZ9Qr3r3sGqIO9","popularity":26.0},
 {"_id":{"$oid":"5d8b727f690a916befd564ed"},"artist":"Youth Code","spotifyID":"15VmPRQCJEZWaZWgHEroj0","popularity":33.0},
 {"_id":{"$oid":"5d8b727f690a916befd564ee"},"artist":"Roy Ayers","spotifyID":"6R9Mv0bgGE4Tqxna1q5Mrj","popularity":53.0},
 {"_id":{"$oid":"5d8b727f690a916befd564ef"},"artist":"Steven Adler","spotifyID":"1bqTpELuDurfcMOGKvJXzl","popularity":15.0},
 {"_id":{"$oid":"5d8b727f690a916befd564f0"},"artist":"Miguel Atwood-Ferguson","spotifyID":"6SlLXvZvYEGnurxBUpUdri","popularity":35.0},
 {"_id":{"$oid":"5d8b727f690a916befd564f1"},"artist":"Raymond Beegle","spotifyID":"13etORG1Dy8CoUb3IZRX0q","popularity":0.0},
 {"_id":{"$oid":"5d8b727f690a916befd564f2"},"artist":"Armenchik","spotifyID":"2o0cYZ0hpCn0i0bfgyDEDb","popularity":28.0},
 {"_id":{"$oid":"5d8b727f690a916befd564f3"},"artist":"Michael Alpert","spotifyID":"1Vmcn9pHOA02RiwTvrlMAG","popularity":3.0},
 {"_id":{"$oid":"5d8b727f690a916befd564f4"},"artist":"John Beal","spotifyID":"3BxStn65CAIkY9sCYLBybS","popularity":15.0},
 {"_id":{"$oid":"5d8b727f690a916befd564f5"},"artist":"Ed Ames","spotifyID":"1iBpJEBrSFXCtPOc5OUZiY","popularity":27.0},
 {"_id":{"$oid":"5d8b727f690a916befd564f6"},"artist":"Francisco Aguabella","spotifyID":"2AicnftXrGY0hebWVwX1uj","popularity":20.0},
 {"_id":{"$oid":"5d8b727f690a916befd564f7"},"artist":"David Balakrishnan","spotifyID":"53qLcoOuGgNwovd4SCV8lz","popularity":5.0},
 {"_id":{"$oid":"5d8b727f690a916befd564f8"},"artist":"Tyra Banks","spotifyID":"2qRCCNXQcF3aZofRrCPozH","popularity":18.0},
 {"_id":{"$oid":"5d8b727f690a916befd564f9"},"artist":"Herb Alpert","spotifyID":"09L3cUdx0hq6qn5bKuJJ4I","popularity":52.0},
 {"_id":{"$oid":"5d8b727f690a916befd564fa"},"artist":"Tori Amos","spotifyID":"1KsASRNugxU85T0u6zSg32","popularity":58.0},
 {"_id":{"$oid":"5d8b727f690a916befd564fb"},"artist":"Coffey Anderson","spotifyID":"29YJnMJ7MoLKPM04siMnP5","popularity":43.0},
 {"_id":{"$oid":"5d8b727f690a916befd564fc"},"artist":"Azam Ali","spotifyID":"5FjTtbpfWj8SBN3SGjkY0W","popularity":35.0},
 {"_id":{"$oid":"5d8b727f690a916befd564fd"},"artist":"Jenni Alpert","spotifyID":"0MUIU1UA2ufuPaaFQSb1p3","popularity":2.0},
 {"_id":{"$oid":"5d8b727f690a916befd564fe"},"artist":"Neal Avron","spotifyID":"54A53hx0O1JSJuKwXP3Fob","popularity":19.0},
 {"_id":{"$oid":"5d8b727f690a916befd564ff"},"artist":"Mickey Avalon","spotifyID":"546WiMGysEqWZTzP8hJvB2","popularity":47.0},
 {"_id":{"$oid":"5d8b727f690a916befd56500"},"artist":"Donald Barrett","spotifyID":"7LnJ2nu4CZ09IwLL7WA9Pj","popularity":0.0},
 {"_id":{"$oid":"5d8b727f690a916befd56501"},"artist":"Axident","spotifyID":"5UDJ6AjC4HGU0hAprrN5AH","popularity":0.0},
 {"_id":{"$oid":"5d8b727f690a916befd56502"},"artist":"Kit Armstrong","spotifyID":"1FfN1mD94wKl0ozsfpOD43","popularity":8.0},
 {"_id":{"$oid":"5d8b727f690a916befd56503"},"artist":"Farah Alvin","spotifyID":"2uZbRKzEb04neXT6Wy16rG","popularity":21.0},
 {"_id":{"$oid":"5d8b727f690a916befd56504"},"artist":"Alu","spotifyID":"7yiq52SDJKenHVST8xGCuF","popularity":50.0},
 {"_id":{"$oid":"5d8b727f690a916befd56505"},"artist":"Cisco Adler","spotifyID":"23apFYuBTpFemqLDn8ViLW","popularity":54.0},
 {"_id":{"$oid":"5d8b727f690a916befd56506"},"artist":"C. Ballin","spotifyID":"6cgylWJOxXWoFNxwzhrcXV","popularity":19.0},
 {"_id":{"$oid":"5d8b727f690a916befd56507"},"artist":"Arthur Bergh","spotifyID":"5CntR2kBYBhj24nd6tPHHd","popularity":0.0},
 {"_id":{"$oid":"5d8b727f690a916befd56508"},"artist":"Gus Black","spotifyID":"77b9btQMi3W5bSfRedXSiu","popularity":28.0},
 {"_id":{"$oid":"5d8b727f690a916befd56509"},"artist":"Bob Ayala","spotifyID":"53ZPS2NE5MhA54RM8WItDy","popularity":0.0},
 {"_id":{"$oid":"5d8b727f690a916befd5650a"},"artist":"David Axelrod","spotifyID":"4hCKF3RZSkFSMntkfCxO74","popularity":37.0},
 {"_id":{"$oid":"5d8b727f690a916befd5650b"},"artist":"Josh Beech","spotifyID":"39ZFdA4dJEPaoMrV0l7tOp","popularity":12.0},
 {"_id":{"$oid":"5d8b727f690a916befd5650c"},"artist":"Andrew Bain","spotifyID":"4E5DxPEVdxnQtrtzt7Hse1","popularity":25.0},
 {"_id":{"$oid":"5d8b727f690a916befd5650d"},"artist":"Danielle Bisutti","spotifyID":"3NHkEgTByS5i3FO2ItuTTh","popularity":0.0},
 {"_id":{"$oid":"5d8b727f690a916befd5650e"},"artist":"Hal Blaine","spotifyID":"5W6Vbf1DmTUOpvsXq4lQFJ","popularity":28.0},
 {"_id":{"$oid":"5d8b727f690a916befd5650f"},"artist":"Richard Band","spotifyID":"0TXK10MEUmsJGH4lMosMiT","popularity":18.0},
 {"_id":{"$oid":"5d8b727f690a916befd56510"},"artist":"Jonny Blu","spotifyID":"6uoCJh6AdFGLXtjUMhAJXw","popularity":21.0},
 {"_id":{"$oid":"5d8b727f690a916befd56511"},"artist":"Stephanie Bennett","spotifyID":"64JNVDnekGtufdi1hkJnyZ","popularity":8.0},
 {"_id":{"$oid":"5d8b727f690a916befd56512"},"artist":"David Benoit","spotifyID":"1OLWM7nUNcTjZ9ct4DEPZu","popularity":47.0},
 {"_id":{"$oid":"5d8b727f690a916befd56513"},"artist":"Dennis Budimir","spotifyID":"706YbavfCLUV1MXJlBI7Ok","popularity":3.0},
 {"_id":{"$oid":"5d8b727f690a916befd56514"},"artist":"Tyler Bates","spotifyID":"75fIuwXxhZ1atNzWLMrgF0","popularity":61.0},
 {"_id":{"$oid":"5d8b727f690a916befd56515"},"artist":"Blues Boy Willie","spotifyID":"0pDomTUGdf55U59snf6TKz","popularity":1.0},
 {"_id":{"$oid":"5d8b727f690a916befd56516"},"artist":"Joanie Bartels","spotifyID":"2iDHdXZgE2zK90X3yrKXTh","popularity":33.0},
 {"_id":{"$oid":"5d8b727f690a916befd56517"},"artist":"Olaf Blackwood","spotifyID":"7Fb4bPwUT0mrtDXt2qmJEp","popularity":52.0},
 {"_id":{"$oid":"5d8b727f690a916befd56518"},"artist":"Victoria Bond","spotifyID":"6P6IKdi4D5vssyDtQvBlag","popularity":12.0},
 {"_id":{"$oid":"5d8b727f690a916befd56519"},"artist":"Tom Brooks","spotifyID":"42vVeB1O6kEejBCnu2vlqM","popularity":11.0},
 {"_id":{"$oid":"5d8b727f690a916befd5651a"},"artist":"Steve Barton","spotifyID":"1gEOIEK9jgpYvvG57BP0US","popularity":35.0},
 {"_id":{"$oid":"5d8b727f690a916befd5651b"},"artist":"Carlton Bost","spotifyID":"04HlMcn3UeA3ihejzOMZ8v","popularity":0.0},
 {"_id":{"$oid":"5d8b727f690a916befd5651c"},"artist":"John Bilezikjian","spotifyID":"6JEZQ5V7nhF6XkEQgT9fLg","popularity":1.0},
 {"_id":{"$oid":"5d8b727f690a916befd5651d"},"artist":"Adam Benjamin","spotifyID":"0NFxPNXawUjNzXJgie4Vh6","popularity":13.0},
 {"_id":{"$oid":"5d8b727f690a916befd5651e"},"artist":"John Brannen","spotifyID":"0j5v4qYnAYuj757Ki7ba0r","popularity":3.0},
 {"_id":{"$oid":"5d8b727f690a916befd5651f"},"artist":"Ryland Bouchard","spotifyID":"49xXYCgtGQ93mRTmP3A1nO","popularity":1.0},
 {"_id":{"$oid":"5d8b727f690a916befd56520"},"artist":"Jeff Blue","spotifyID":"2TQGAlirZ6ePbgec2TvLK9","popularity":34.0},
 {"_id":{"$oid":"5d8b727f690a916befd56521"},"artist":"Arthur Blythe","spotifyID":"2vCGDtmVCSZoGIarYvJK33","popularity":11.0},
 {"_id":{"$oid":"5d8b727f690a916befd56522"},"artist":"Rick Boston","spotifyID":"2xPoECfVuhmG0ioaDfwIrx","popularity":2.0},
 {"_id":{"$oid":"5d8b727f690a916befd56523"},"artist":"Gerry Brown","spotifyID":"1otYQETSoKkdzMBSd01OMN","popularity":3.0},
 {"_id":{"$oid":"5d8b727f690a916befd56524"},"artist":"Adam Bravin","spotifyID":"40npaB21r1hbN489wO535P","popularity":0.0},
 {"_id":{"$oid":"5d8b727f690a916befd56525"},"artist":"Edwin Birdsong","spotifyID":"0vIY2Vkkwq0GZHCuqAdbrZ","popularity":28.0},
 {"_id":{"$oid":"5d8b727f690a916befd56526"},"artist":"Eddie Cano","spotifyID":"3lga46dBnWlywlKZgqwOcz","popularity":9.0},
 {"_id":{"$oid":"5d8b727f690a916befd56527"},"artist":"Bud'da","spotifyID":"0wqLBUJUZoKi6jiWzRxGJY","popularity":13.0},
 {"_id":{"$oid":"5d8b727f690a916befd56528"},"artist":"Boombox Cartel","spotifyID":"4m1yRHUMhvB8gKAJTjK4kO","popularity":60.0},
 {"_id":{"$oid":"5d8b727f690a916befd56529"},"artist":"Phoebe Bridgers","spotifyID":"1r1uxoy19fzMxunt3ONAkG","popularity":67.0},
 {"_id":{"$oid":"5d8b727f690a916befd5652a"},"artist":"Sonya Belousova","spotifyID":"0JnNzCUsHuDcUcBatOzuGP","popularity":7.0},
 {"_id":{"$oid":"5d8b727f690a916befd5652b"},"artist":"John Bush","spotifyID":"0sigxeZTjygDvlHAwCDGJz","popularity":28.0},
 {"_id":{"$oid":"5d8b727f690a916befd5652c"},"artist":"Sean Bradley","spotifyID":"4P3vFJXp25eNH2B5Duh9n0","popularity":6.0},
 {"_id":{"$oid":"5d8b727f690a916befd5652d"},"artist":"Pete Candoli","spotifyID":"3TFKq65ZFZ0z6XlRrYcoc7","popularity":7.0},
 {"_id":{"$oid":"5d8b727f690a916befd5652e"},"artist":"Monique Buzzarté","spotifyID":"187cqNeKAERdCiJ8tCkGMM","popularity":1.0},
 {"_id":{"$oid":"5d8b727f690a916befd5652f"},"artist":"Hadda Brooks","spotifyID":"1NJubf2lWeNdXONuic4fir","popularity":13.0},
 {"_id":{"$oid":"5d8b727f690a916befd56530"},"artist":"Conte Candoli","spotifyID":"3wM3S0CxD0Do7IWKvJ0WRG","popularity":14.0},
 {"_id":{"$oid":"5d8b727f690a916befd56531"},"artist":"Roy Campbell Jr.","spotifyID":"4bNQJXeVg7adcPG8caaZIG","popularity":0.0},
 {"_id":{"$oid":"5d8b727f690a916befd56532"},"artist":"Paul Cantelon","spotifyID":"1kyGiBwd8U55fAakEoMLS0","popularity":26.0},
 {"_id":{"$oid":"5d8b727f690a916befd56533"},"artist":"John Cage","spotifyID":"1Z3fF5lZdCM0ZHugkGoH8s","popularity":39.0},
 {"_id":{"$oid":"5d8b727f690a916befd56534"},"artist":"Darius Brooks","spotifyID":"2T6vW11BtQ5dnPrrhQjvFq","popularity":16.0},
 {"_id":{"$oid":"5d8b727f690a916befd56535"},"artist":"John Browning","spotifyID":"0oUfKTl7sbulaN5lXMmRxu","popularity":15.0},
 {"_id":{"$oid":"5d8b727f690a916befd56536"},"artist":"Kevin Booth","spotifyID":"5pHFFpS1bwTPhcPiig98yw","popularity":0.0},
 {"_id":{"$oid":"5d8b727f690a916befd56537"},"artist":"Corey Brunish","spotifyID":"3FYcRzoeHgZBU5qUtzm2Di","popularity":5.0},
 {"_id":{"$oid":"5d8b727f690a916befd56538"},"artist":"Tae Brooks","spotifyID":"0mS7pPJiMyQ4xJrcH9RwjF","popularity":20.0},
 {"_id":{"$oid":"5d8b72c1690a916befd56539"},"artist":"Odia Coates","spotifyID":"3UgUTRbDBLMcRCantpTWIe","popularity":40.0},
 {"_id":{"$oid":"5d8b72c1690a916befd5653a"},"artist":"Jessica Cleaves","spotifyID":"51DwW1VBaytpjmoZ5ZZOfu","popularity":1.0},
 {"_id":{"$oid":"5d8b72c1690a916befd5653b"},"artist":"William Chapman","spotifyID":"3afPSxp4WvseRZX1Z6anPs","popularity":3.0},
 {"_id":{"$oid":"5d8b72c1690a916befd5653c"},"artist":"Greg Cohen","spotifyID":"5bQEjfrwsAPa0d9PaPkXvn","popularity":25.0},
 {"_id":{"$oid":"5d8b72c1690a916befd5653d"},"artist":"Jae Chong","spotifyID":"20pFgVkkBjd9CICTQvBv0N","popularity":0.0},
 {"_id":{"$oid":"5d8b72c1690a916befd5653e"},"artist":"Justin Chart","spotifyID":"4PpEnFBVcgxovylDW8ekk1","popularity":5.0},
 {"_id":{"$oid":"5d8b72c1690a916befd5653f"},"artist":"Carol Chaikin","spotifyID":"0dLsizrWj3fvTxsD7I4JOv","popularity":0.0},
 {"_id":{"$oid":"5d8b72c1690a916befd56540"},"artist":"Denardo Coleman","spotifyID":"22DYOa4FrkYe54116a7xT1","popularity":0.0},
 {"_id":{"$oid":"5d8b72c1690a916befd56541"},"artist":"John Coda","spotifyID":"74re83nJ4MCsCbCJiCuC8R","popularity":0.0},
 {"_id":{"$oid":"5d8b72c1690a916befd56542"},"artist":"Scott Clifton","spotifyID":"6nDAUueL43Zmueh72wxXQT","popularity":3.0},
 {"_id":{"$oid":"5d8b72c1690a916befd56543"},"artist":"Meytal Cohen","spotifyID":"25Ei0j2bTewbaVLLrAG11V","popularity":17.0},
 {"_id":{"$oid":"5d8b72c1690a916befd56544"},"artist":"Billy Childs","spotifyID":"2DalOaFXdbHCB4cyMJhQtR","popularity":19.0},
 {"_id":{"$oid":"5d8b72c1690a916befd56545"},"artist":"Choice37","spotifyID":"0IwDW6uMq50jttqUE9pwW4","popularity":6.0},
 {"_id":{"$oid":"5d8b72c1690a916befd56546"},"artist":"Paulinho da Costa","spotifyID":"4GkZsIFa4lKHy9e2MuqwIs","popularity":21.0},
 {"_id":{"$oid":"5d8b72c1690a916befd56547"},"artist":"Curtis Counce","spotifyID":"5WtyRAZhrecjFZRNH1yTXn","popularity":9.0},
 {"_id":{"$oid":"5d8b72c1690a916befd56548"},"artist":"Shaun Cassidy","spotifyID":"6XJ5IHDtW2OkjtwVllkANt","popularity":32.0},
 {"_id":{"$oid":"5d8b72c1690a916befd56549"},"artist":"Jeanie Cunningham","spotifyID":"5Jy6bI8Grj37NIe0Xm7Ywj","popularity":0.0},
 {"_id":{"$oid":"5d8b72c1690a916befd5654a"},"artist":"Hoagy Carmichael","spotifyID":"7j8I1aIBA9Z9bMy7mTwWKk","popularity":40.0},
 {"_id":{"$oid":"5d8b72c1690a916befd5654b"},"artist":"Jayne Cortez","spotifyID":"1rai2UymmJ2kfyBaO1gBsQ","popularity":0.0},
 {"_id":{"$oid":"5d8b72c1690a916befd5654c"},"artist":"Phil Carreón","spotifyID":"7KaVTjtNI14ChOKsg4LYQZ","popularity":0.0},
 {"_id":{"$oid":"5d8b72c1690a916befd5654d"},"artist":"John Craigie","spotifyID":"7ytgyYmtUPfxXHsXEvgObK","popularity":46.0},
 {"_id":{"$oid":"5d8b72c1690a916befd5654e"},"artist":"Henry Cuesta","spotifyID":"0OH9aczVzJrtpiveyj0Ky6","popularity":0.0}]
//=================================================
// Routes
//=================================================

router.get("/login", (req, res) => {
  console.log("You logged in to Spotify!");
  const scopes = "playlist-modify-private user-read-private user-read-email";
  res.json(
    "https://accounts.spotify.com/authorize" +
      "?response_type=code" +
      "&client_id=" +
      process.env.SPOTIFY_ID +
      (scopes ? "&scope=" + encodeURIComponent(scopes) : "") +
      "&redirect_uri=" +
      encodeURIComponent(process.env.REDIRECT_URI)
  );
});

router.get("/exchangeToken/:authCode", (req, res) => {
  axios({
    url: "https://accounts.spotify.com/api/token",
    method: "POST",
    params: {
      grant_type: "authorization_code",
      code: req.params.authCode,
      redirect_uri: process.env.REDIRECT_URI,
      client_id: process.env.SPOTIFY_ID,
      client_secret: process.env.SPOTIFY_SECRET
    }
  })
    .then((response) => res.json(response.data))
    .catch((err) => console.log(err));
});

router.get("/user/:accessToken", (req, res) => {
  axios({
    url: "https://api.spotify.com/v1/me",
    method: "GET",
    headers: {
      Authorization: "Bearer " + req.params.accessToken
    }
  })
    .then((response) => res.json(response.data))
    .catch((err) => console.log(err));
});

router.post("/playlist/new/:userID/:accessToken", (req, res) => {
  const startPoint = req.body.startPoint
  const endPoint = req.body.endPoint
  const playlistName = startPoint + " to " + endPoint
  const isPopular = req.body.isPopular
  
  const userID = req.params.userID,
    accessToken = req.params.accessToken;
    
  // spotifyTest.controller(startArrayFinal, endArrayFinal, accessToken)
  // redo.tracks(startPoint, endPoint, isPopular, userID, accessToken, newPlaylistID)
  return algorithm.tracks(startPoint, endPoint, isPopular, userID, accessToken)
  .then(res => console.log("this stuff is", res))
  // axios({
  //   url: `https://api.spotify.com/v1/users/${userID}/playlists`,
  //   method: "POST",
  //   data: {
  //     name: "Charlotte, NC to Atlanta, GA",
  //     description: "A playlist for your trip from Charlotte, NC to Atlanta, GA.",
  //     public: "false"
  //   },
  //   headers: {
  //     Authorization: "Bearer " + accessToken
  //   }
  // })
  //   .then((response2) => {
  //     let artistIDs = [
  //       "4r63FhuTkUYltbVAg5TQnk",
  //       "7oR6vQt8KT2ZWUpC65jTha",
  //       "0jmJE0UcA2Ngp9qXYiGqsM",
  //       "3AWctn8IqczGFgBtAmnrQJ",
  //       "0sBKkpFqxsLg0Ao6924RHK",
  //       "7DMUqI3HAaKc3x0Y4QKftV",
  //       "4xTArdz7s8XtbmErzEcMvg",
  //       "23zg3TcAtWQy7J6upgbUnj",
  //       "1G9G7WwrXka3Z1r7aIDjI7",
  //       "2hnzQ6eCFkxUIPsVcsdj8A"
  //     ];
  //     const newPlaylistID = response2.data.id;
  //     // console.log(response2);
  //     getTopSongs(newPlaylistID, artistIDs, accessToken, res);
  //     // getTopSongs(
  //     //   newPlaylistID,
  //     //   [
  //     //     "0FJ3jpm4yEcaAMzek1bD6i",
  //     //     "2H3xDjMmp31iLmsgXxLFyI"
  //     //   ],
  //     //   accessToken,
  //     //   res
  //     // );
  //     // populatePlaylist(newPlaylistID, accessToken, res)
  //   })
  //   .then( results => { 
  //     console.log(results)
  //     spot.populatePlaylist(results[3], results[0], results[2], res)
  //     //this is the send to the front-end end

    // })  
    // .catch((err) => console.log(err));
})
  



router.get("/artist/:accessToken", (req, res) => {
  axios({
    url: `/artist/${req.params.accessToken}`,
    method: "GET"
  })
    .then((response) => {
      // console.log(response);
    })
    .catch((err) => console.log(err));
});

//=================================================
// Functions in spot.js
//=================================================

module.exports = router;