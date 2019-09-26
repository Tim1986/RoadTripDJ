# RoadTripDJ

## Deployed Link

https://glacial-savannah-65289.herokuapp.com/

## How to Use It

![First Screenshot](/ss-for-readme.png)

RoadTripDJ creates a Spotify playlist for your road trip with musicians from the cities you’re traveling to and from. Discover new music, find local artists, and keep your long drives interesting with RoadTripDJ.

First register and log in to Road Trip DJ. When prompted, log in to Spotify and grant Road Trip DJ permission to create playlists on your account. It is necessary to grant access to your Spotify account in order to use this app.

Then you'll be redirected to the new trip page. Just input a start location and an end location, and select if you want to receive the most well known or least well known musicians. Then click “generate playlist” and wait 30-60 seconds. You’ll have a new playlist in your Spotify account!

## Overview of the Algorithm

1. We take the user inputs for start and end location and turn them into latitude and longitude with the Google Maps API.
2. We compare that latititude and longitude against the 269 cities with entries in the American Musicians by City Wikipedia page. We find the five closest cities to the start location and the five closest to the end location.
3. We grab all of the artists from the appropriate cities with the WikiJS NPM.
4. We compare those artists against Spotify's API. We remove any that don't have Spotify entries, and rank the rest by popularity.
5. We get enough of those artist's most popular songs to fill up a playlist about as long as the estimated travel time between the two locations.
6. We create the playlist in the user's account.

## Development

This app is entirely built in react. It also uses Node, Express, Mongo, Mongoose, Passport, Axios, the Google Maps and Spotify APIs, and the WikiJS NPM.

Anees Adams, Timothy Brahm, Cassidy Groenendaal, and Max Szczepaniak developed this app together as their final project in their three month coding boot camp at UNC Charlotte.