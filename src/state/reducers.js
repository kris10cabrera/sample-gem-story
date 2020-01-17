import { gameLoop, MAKE_CHOICE } from './actions';

export const INITIAL_STATE = { 
  ending: false, 
  ...gameLoop()
};

export default (state = INITIAL_STATE, { type, ...action }) => {
  switch (type) {
    case MAKE_CHOICE:
      return {
        ...state, 
        ...action
      };
    default: 
      return state;
  }
};


// Reducer function to update state from the result of an action... we populate our intiial state by running the game loop once, then use that state to inform our reducers