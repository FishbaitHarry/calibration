export function render(state) {
  var rootEl = document.createElement('div');
  var p1 = document.createElement('div');
  p1.classList.add('progress-bar');
  p1.innerText = `Calibration Progress: ${state.level}/15`;
  rootEl.appendChild(p1);
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