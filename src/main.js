import { render } from './render.js';
import { reducer } from './model.js';

let state = reducer(null, 'NEW_GAME');
let rootEl = render(state);
document.body.replaceChildren(rootEl);

document.body.addEventListener('click', event => {
  let optionIndex = event.target.closest('button').dataset.optionId;
  console.log('click on:', optionIndex);
  state = reducer(state, optionIndex*1);
  console.log('state:', state);
  document.body.replaceChildren(render(state));
  event.preventDefault();
});
