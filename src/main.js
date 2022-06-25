import { render } from './render.js';
import { reducer } from './model.js';

let state = reducer(null, 'NEW_GAME');
let rootEl = render(state);
window.document.getElementById('app').replaceChildren(rootEl);

window.document.getElementById('app').addEventListener('click', event => {
  let optionIndex = event.target.closest('button').dataset.optionId;
  state = reducer(state, optionIndex*1);
  console.log('state:', state);
  window.document.getElementById('app').replaceChildren(render(state));
  event.preventDefault();
});
