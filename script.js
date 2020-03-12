(function start() {

  // random number generator
  rand = (hight, low) => Math.random() * (hight - low) + low;

  // coordinates field
  const X_MAX = 500,
        Y_MAX = 500;
    
  team = point => point.x > point.y ? 1 : -1

  prepareGrid = (width, height) => {
    const grid = document.getElementById('grid');
    grid.setAttribute('width', 500);
    grid.setAttribute('height', 500);
    const lineNode = `<line x1="0" x2="${X_MAX}" y1="0" y2="${Y_MAX}" stroke="purple"/>`
    grid.innerHTML = lineNode
  }

  generateRandomPoints = count => {
    createArray = arrayLength => Array(arrayLength).fill(arrayLength);
    return createArray(count).map(_=> ({ x: rand(0, X_MAX), y: rand(0, Y_MAX) }));
  }

  // points drawing funtion
  drawPoints = count => {
    const grid = document.getElementById('grid');
    const randomPointsNodes = generateRandomPoints(count)
      .map(point => `<circle cx="${point.x}" cy="${point.y}" r="3" fill="${team(point) === -1 ? 'blue' : 'red'}"/>`)
      .join("");
    grid.innerHTML += randomPointsNodes;
  };


  prepareGrid(X_MAX, Y_MAX);
  drawPoints(200);
})();