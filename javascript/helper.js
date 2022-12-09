const stringifyToJSON = function () {
  const data = fs.readFileSync(path.resolve('express/resources/data/untouched.csv'));
  parse(data, (err, records) => {
    const attributes = records[0];
    for (let i = 1; i < records.length; i++) {
      const splitRecord = records[i];
      const mapped /* :tableRow */ = {};
      for (let j = 0; j < attributes.length; j++) {
        mapped[attributes[j]] = splitRecord[j];
      }
      results[mapped.id] = {
        correct: parseInt(mapped.real_labels_print) + 1,
        botGuess: parseInt(mapped.cnn_prediction) + 1,
        information: {
          cars: parseInt(mapped.vehicles_per_day),
          // TODO excel replaced floats with dates
          streetLength: parseFloat(parseFloat(mapped.strassen_laenge).toFixed(3)),
          accidentLethal: parseInt(mapped.Unfaelle_todesfolge),
          accidentSever: parseInt(mapped.Unfaelle_schwer),
          accidentLight: parseInt(mapped.Unfaelle_leicht),
          xCoords: parseFloat(mapped.x_coord_print),
          yCoords: parseFloat(mapped.y_coord_print),
        },
      };
    }
    const stringified = JSON.stringify(results);

    var stream = fs.createWriteStream('data.json');
    stream.once('open', function (fd) {
      stream.write(stringified);
      stream.end();
    });
    console.log(stringified);
  });
};
