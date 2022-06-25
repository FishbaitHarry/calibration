export function render(state) {
  var rootEl = document.createElement('div');
  rootEl.classList.add('dashboard');
  rootEl.appendChild(renderProgressBar(state));
  var f1 = document.createElement('form');
  f1.classList.add('option-chooser');
  rootEl.appendChild(f1);
  state.options.forEach( (option, i) => {
    var c1 = renderOption(option);
    c1.dataset.optionId = i;
    f1.appendChild(c1);
  });
  return rootEl;
}

function renderOption(option) {
  var e1 = document.createElement('button');
  e1.classList.add('option');
  for (var i = 0; i < option.number; i++) {
    var ec = document.createElement('div');
    ec.classList.add('symbol', option.color, option.shape);
    e1.appendChild(ec);
  }
  return e1;
}

function renderProgressBar(state) {
  var p1 = document.createElement('div');
  p1.classList.add('progress-bar');
  p1.innerHTML = `<h1>Calibration Progress:</h1>`;
  for (let i=0;i<state.level;i++) p1.appendChild(renderProgressDot(i+1));
  return p1;
}

function renderProgressDot(level) {
  let d1 = document.createElement('span');
  let color = ['green','yellow','red'][Math.ceil(level/5)-1];
  d1.classList.add('progress-dot', color);
  return d1;
}