(function start() {

  // coordinates field
  const grid = document.getElementById('grid')

  const X_MAX = 500,
        Y_MAX = 500;

  // points drawing funtion
  drawPoints = randomPoints => {
    const field = document.createElement('svg')
    field.setAttribute('width', X_MAX);
    field.setAttribute('height', Y_MAX);
    // console.log(randomPoints.map(point => `<circle cx="${point.x}" cy="${point.y}" r="5"/>`)
    // field.innerHTML = randomPoints.map(point => `<circle cx="${point.x}" cy="${point.y}" r="5"/>`).join('');
    grid.appendChild(field)
  };

  // random number generator
  rand = (hight, low) => Math.random() * (hight - low) + low;
  
  //create array
  createArray = arrayLength => Array(arrayLength).fill(arrayLength);

  const randomPoints = createArray(100).map(_=> ({ x: rand(-1, X_MAX), y: rand(-1, Y_MAX) }));

  drawPoints(randomPoints);

  // console.log('Random points', randomPoints);
})();