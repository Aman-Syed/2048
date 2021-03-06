const table = document.getElementById('table');
const scoreSpan = document.getElementById('score');
let data = [];
const array = [1, 2, 3, 4];


// Reset a game
const reset = () => {
  let fragment = document.createDocumentFragment();
  array.forEach(() => {
    let colData = [];
    data.push(colData);
    let tr = document.createElement('tr');
    array.forEach(() => {
      colData.push(0);
      let td = document.createElement('td');
      tr.appendChild(td);
    });
    fragment.appendChild(tr);
  });
  table.appendChild(fragment);
};

const createRandom = () => {
  let emptyArrays = [];
  data.forEach((colValue, i) => {
    colValue.forEach((rowValue, j) => {
      if (!rowValue) {
        emptyArrays.push([i, j]);
      }
    });
  });

  const addTwo = () => {
    let randomGrid =
      emptyArrays[Math.floor(Math.random() * emptyArrays.length)];
    // randomly add 2 to one of empty grid
    data[randomGrid[0]][randomGrid[1]] = 2;
  };

  if (emptyArrays.length === 0) {
    // If there is no more empty grid, the user lose the game
    if (parseInt(scoreSpan.innerText)>20000){
    alert('Game over and your score is '+scoreSpan.innerText +' . You have mastered the game');}
    else {
      alert('Game over and your score is '+scoreSpan.innerText );
    }table.innerHTML = '';
    reset();
    window.location='index.html'
  } else if (emptyArrays.length > 15) {
    // when the game start, add 2 twice
    addTwo();
    addTwo();
    draw();
  } else {
    addTwo();
    draw();
  }
};

// Get the number 2 to the power of X
const getPowerOf = (num) => {
  let i = 0;
  do {
    num /= 2;
    i += 1;
  } while (num !== 1);
  return i;
};

const draw = () => {
  data.forEach((colValue, i) => {
    colValue.forEach((rowValue, j) => {
      if (rowValue > 0) {
        let colorCode = 255 - Math.floor((255 /11 ) * getPowerOf(rowValue));
        table.children[i].children[j].textContent = rowValue;
        table.children[i].children[
          j
        ].style.backgroundColor = `rgb(235,  235,${colorCode})`;
      } else {
        table.children[i].children[j].textContent = '';
        table.children[i].children[j].style.backgroundColor =
          'rgb(255, 255, 255)';
      }
    });
  });
};

reset();
createRandom();
draw();

const moveByDirection = (dir) => {
  let newData = [[], [], [], []];
  let currentScore = parseInt(scoreSpan.textContent, 10);
  switch (dir) {
    case 'up':
      data.forEach((colValue, i) => {
        colValue.forEach((rowValue, j) => {
          if (rowValue) {
            if (
              newData[j][newData[j].length - 1] &&
              newData[j][newData[j].length - 1] === rowValue
            ) {
              newData[j][newData[j].length - 1] *= 2;
              scoreSpan.textContent =
                currentScore + newData[j][newData[j].length - 1];
            } else {
              newData[j].push(rowValue);
            }
          }
        });
      });
      array.forEach((col, i) => {
        array.forEach((row, j) => {
          data[j][i] = newData[i][j] || 0;
        });
      });
      createRandom();
      break;
    case 'down':
      data.forEach((colValue, i) => {
        colValue.forEach((rowValue, j) => {
          if (rowValue) {
            if (newData[j][0] && newData[j][0] === rowValue) {
              newData[j][0] *= 2;
              scoreSpan.textContent = currentScore + newData[j][0];
            } else {
              newData[j].unshift(rowValue);
            }
          }
        });
      });
      array.forEach((col, i) => {
        array.forEach((row, j) => {
          data[3 - j][i] = newData[i][j] || 0;
        });
      });
      createRandom();
      break;
    case 'right':
      data.forEach((colValue, i) => {
        colValue.forEach((rowValue, j) => {
          if (rowValue) {
            if (newData[i][0] && newData[i][0] === rowValue) {
              newData[i][0] *= 2;
              scoreSpan.textContent = currentScore + newData[i][0];
            } else {
              newData[i].unshift(rowValue);
            }
          }
        });
      });
      array.forEach((col, i) => {
        array.forEach((row, j) => {
          data[i][3 - j] = newData[i][j] || 0;
        });
      });
      createRandom();
      break;
    case 'left':
      data.forEach((colValue, i) => {
        colValue.forEach((rowValue, j) => {
          if (rowValue) {
            if (
              newData[i][newData[i].length - 1] &&
              newData[i][newData[i].length - 1] === rowValue
            ) {
              newData[i][newData[i].length - 1] *= 2;
              scoreSpan.textContent =
                currentScore + newData[i][newData[i].length - 1];
            } else {
              newData[i].push(rowValue);
            }
          }
        });
      });
      array.forEach((col, i) => {
        array.forEach((row, j) => {
          data[i][j] = newData[i][j] || 0;
        });
      });
      createRandom();
      break;
  }
  draw();
  
};

window.addEventListener('keydown', (event) => {
  let direction;
  let keyCode = event.keyCode;
  if (keyCode === 38) {
    direction = 'up';
  } else if (keyCode === 40) {
    direction = 'down';
  } else if (keyCode === 39) {
    direction = 'right';
  } else if (keyCode === 37) {
    direction = 'left';
  }

  moveByDirection(direction);
});
