// Export to geojson
const csv2geojson = require('csv2geojson');
const fs = require('fs');

// or more dependably:
// ogr2ogr -f GeoJSON projects.geojson projects.vrt
// csv2geojson.sh


// Load list of projects
const projectsCSV = fs.readFileSync('projects.csv', 'utf8');
// console.log(projectsCSV)
const geojson = csv2geojson.csv2geojson(projectsCSV, {
  latfield: 'y',
  lonfield: 'x',
  delimiter: ','
}, function(err, data) {
});

fs.writeFile('projects.geojson', geojson, (err) => {
  // throws an error, you could also catch it here
  if (err) throw err;
});
