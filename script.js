const shuffleButton = document.getElementById('shuflle');
shuffleButton.addEventListener('click', start);

async function start() {
  shuffleButton.setAttribute('disabled', true);

  const pointsCount = +document.getElementById('pointsCount').value,
        trainingSessions = +document.getElementById('trainingSessions').value;

  // random number generator
  rand = (hight, low) => Math.random() * (hight - low) + low;

  // coordinates field
  const X_MAX = 500,
        Y_MAX = 500;

  sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
    
  team = point => point.x > point.y ? 1 : -1;

  train = (weights, point, team) => {
    const guessResult = guess(weights, point)
    const error = team - guessResult;
    const learningRate = 0.1;
    return {
      x: weights.x + point.x * error * learningRate,
      y: weights.y + point.y * error * learningRate
    }
  }

  guess = (weights, point) => {
    const sum = point.x * weights.x + point.y * weights.y,
          team = sum >=0 ? 1 : -1;

    return team;
  }

  randomWeights = ({
    x: rand(-1, 1),
    y: rand(-1, 1)
  });

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
  drawPoints = async count => {
    const grid = document.getElementById('grid');
    const randomPointsNodes = generateRandomPoints(count)
      .map(point => `<circle cx="${point.x}" cy="${point.y}" r="3" fill="${guess(traindedWeights(trainingSessions), point) === -1 ? 'blue' : 'red'}"/>`)
      .join("");
    grid.innerHTML += randomPointsNodes;
  };

  testTrain = () => {
    const point = { x: 200, y: 400 };
    return train(randomWeights, point, team(point));
  }

  function traindedWeights(trainingSessions) {
    const examples = generateRandomPoints(trainingSessions).map(point => ({
      point,
      team: team(point)
    }))

    let currentWeights = randomWeights;

    for(const example of examples) {
      currentWeights = train(currentWeights, example.point, example.team);
    }

    return currentWeights;
  }

  prepareGrid(X_MAX, Y_MAX);
  await drawPoints(pointsCount)
  shuffleButton.removeAttribute('disabled')
};

start();