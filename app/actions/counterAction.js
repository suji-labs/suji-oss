import * as ActionsTypes from '../constants/ActionTypes'

function increment() {
  return {
    type: ActionsTypes.INCREMENT_COUNTER
  };
}

function decrement() {
  return {
    type: ActionsTypes.DECREMENT_COUNTER
  };
}

function incrementIfOdd() {
  return (dispatch, getState) => {
    const { counter } = getState();

    if (counter % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
}

function incrementAsync(delay = 1000) {
  return dispatch => {
    setTimeout(() => {
      dispatch(increment());
    }, delay);
  };
}

export default {
  increment,
  decrement,
  incrementIfOdd,
  incrementAsync
}