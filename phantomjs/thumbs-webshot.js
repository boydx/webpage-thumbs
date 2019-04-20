// const webshot = require('webshot') // need to install
// var sharp = require('sharp')
const fs = require('fs');
const axios = require('axios');

const projs = JSON.parse(fs.readFileSync('projects.json', 'utf8'));
let i = 0
const options = {
    phantomPath: "/Volumes/B/_repos/_boydx/phantomjs/bin/phantomjs",
    windowSize: {width: 600,
    height: 400},
    renderDelay: 10000
};

for (proj in projs.features) {
    let x = projs.features[proj].properties.link
    request(String(x), function (error, response, body) {
        if(error){
                console.log(`Error: ${x}`)
        } else {
            console.log(String(x).slice(8,))
            webshot(String(x), `graphics/image${i}.jpg`, options, (err) => {
                console.log(i)
                i++
                // screenshot now saved to google.png
            });
        }
        });

};

