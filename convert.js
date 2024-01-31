const csv = require('csv-parser');
const fs = require('fs');
const results = [];

fs.createReadStream('data/Technology Radar Input Sheet - Sheet1.csv')
  .pipe(csv())
  .on('data', (data) => {
    const item = {
      quadrant: parseInt(data["Quadrant-json"]),
      ring: parseInt(data["Ring-json"]),
      label: data["Item"],
      active: true,
      moved: parseInt(data["Moved-json"])
    };
    if (data["Link"]) {
      item.link = data["Link"];
    }
    results.push(item);
  })
  .on('end', () => {
    const output = {
      date: new Date().toISOString().slice(0,7).replace('-', '.'),
      entries: results
    };
    fs.writeFileSync('docs/config.json', JSON.stringify(output, null, 2));
  });