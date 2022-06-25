export const defaultState = {
  level: 1, // 1-15
  stage: 1, // 1-3
  firstPredicate: () => true,
  secondPredicate: null,
  thirdPredicate: () => true,
  options: [{color:'red', shape:'circle', number:3},{},{}],
}

const MAX_LEVEL = 15;
const PROPS = ['shape', 'color', 'number'];
const SHAPES = ['circle', 'triangle', 'square'];
const COLORS = ['red', 'green', 'blue'];
const NUMBERS = [1, 3, 4];
const PROPMAP = {shape:SHAPES, color:COLORS, number:NUMBERS};

const shapeNumberMap = {circle:1, triangle:3, square:4};
const shapeNumberPredicate = ({shape, number, color}) => (shapeNumberMap[shape] == number);
const shapeColorMap = {circle:'blue', triangle:'red', square:'green'};
const shapeColorPredicate = ({shape, number, color}) => (shapeColorMap[shape] == color);
const colorNumberMap = {red:3, green:4, blue:1};
const colorNumberPredicate = ({shape, number, color}) => (colorNumberMap[color] == number);
const SOLMAP = {
  shape: [shapeNumberPredicate, shapeColorPredicate],
  color: [shapeColorPredicate, colorNumberPredicate],
  number: [shapeNumberPredicate, colorNumberPredicate],
};

export function reducer(state, action) {
  console.log('action:', action);
  if (action == 'NEW_GAME') {
    var property = getRand(PROPS);
    var propertyValue = getRand(PROPMAP[property]);
    var solution = getRand(SOLMAP[property]);
    var newState = {
      level: 1,
      stage: 1,
      firstPredicate: (item) => (item[property] == propertyValue),
      thirdPredicate: solution,
    };
    newState.options = generateOptions(newState);
    return newState;
  }
  if (action == 'PREV_LEVEL') {
    return reducer({...state, level: Math.max(state.level - 1, 1)}, 'GENERATE_LEVEL');
  }
  if (action == 'NEXT_LEVEL') {
    if (state.level == MAX_LEVEL) {
      playSound('gameover');
      return reducer(null, 'NEW_GAME')
    }
    return reducer({...state, level: state.level + 1}, 'GENERATE_LEVEL');
  }
  if (action == 'GENERATE_LEVEL') {
    var newState = {
      ...state,
      stage: Math.ceil(state.level / 5),
    };
    newState.options = generateOptions(newState);
    return newState;
  }
  if (typeof action == 'number') {
    var chosenOption = state.options[action];
    if (chosenOption.correct) {
      playSound('success');
      return reducer(state, 'NEXT_LEVEL');
    } else {
      playSound('failure');
      return reducer(state, 'PREV_LEVEL');
    }
  }
  return state;
}

function getRand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// destructive array shuffling
function shuffleArr(arr) {
  if (arr.length < 2) return arr;
  let i = Math.floor(Math.random() * arr.length);
  return arr.splice(i, 1).concat(shuffleArr(arr));
}

function generateOptions(state) {
  var correctOption = randomOption();
  while (
    !state.thirdPredicate(correctOption) ||
    (state.stage != 3) && !state.firstPredicate(correctOption)
  ) {
    correctOption = randomOption();
  }
  var badOptionA = randomOption();
  while (
    state.thirdPredicate(badOptionA) ||
    (state.stage == 1) && state.firstPredicate(badOptionA)
  ) {
    badOptionA = randomOption();
  }
  var badOptionB = randomOption();
  while (
    JSON.stringify(badOptionA) == JSON.stringify(badOptionB) ||
    state.thirdPredicate(badOptionB) ||
    (state.stage == 1) && state.firstPredicate(badOptionB)
  ) {
    badOptionB = randomOption();
  }
  correctOption.correct = true;
  badOptionA.correct = false;
  badOptionB.correct = false;
  return shuffleArr([correctOption, badOptionA, badOptionB]);
}

function randomOption() {
  return {
    shape: getRand(SHAPES),
    number: getRand(NUMBERS),
    color: getRand(COLORS),
  };
}

function playSound(id) {
  let el = document.getElementById(id);
  el.currentTime = 0;
  el.play();
}