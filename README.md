# Student web mapping projects with webpage thumbnails

A project to cycle through web mapping projects, generate an image of the web page, and create a GeoJSON for mapping with slick popups.

## Process

Many projects have been created by New Maps Plus students. The objective here is to give students the opportunity to contribute their public project to a map of projects. 

1. Students need to create a `publish.json` with (at least) the following information: 

  ```js
  {
  "title": "Tile of Project",
  "info": "Secondary information",
  "coordinates": [lat, lon],
  "author": "Author"
  "link": "url"
  }
```
2. Place the `publish.json` in the root of the GitHub Pages repository. 
3. Submit the GitHub Pages URL to the `publish.json`. The list of URLs go into the [list.json](input/list.json).
4. [buildPuppeteer.js](buildPuppeteer.js) is a node script the uses Puppeteer to create a web page screenshot. It also builds a CSV for conversion to GeoJSON.

## Example

New Maps Plus student projects: https://newmapsplus.github.io/projects
