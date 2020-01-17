import storyContent from '../story-practice.ink.json';
import { Story } from "inkjs";
export const ink = new Story(storyContent);
export const MAKE_CHOICE = 'MAKE_CHOICE';



// we instantiate the Ink engine using InkJS and our JSON file from Inky.app

export const getGlobalVars = variablesState => 
  Object.keys(variablesState._globalVariables).reduce(
    (acc, key) => ({
      ...acc, 
      [key]: variablesState[key]
    }),
    {}
  );

export const getTags = tags =>
  tags.reduce(
    (acc, tag) => ({...acc,
    [tag.split(': ')[0]]: tag.split(': ')[1] }),
    {}
  );

// InkJS surafces Ink variables and tags in a confusing way... this reduces Ink variables and tags to JS Objects

export const gameLoop = () => {
  const sceneText = [];
  let currentTags = [];

  while (ink.canContinue) {
    sceneText.push(ink.Continue());
    currentTags = currentTags.concat(ink.currentTags);
  }

  const { currentChoices, variablesState } = ink;

  if (!ink.canContinue && !currentChoices.length) 
    throw new GameOverError('no more choices');

  return {
    globals: getGlobalVars(variablesState),
    tags: getTags(currentTags),
    currentChoices,
    sceneText,
    currentTags
  };
};

// we pass down the choice index to InkJS, run the game loop, and pass the values down
export const makeChoice = choiceIdx => {
  ink.ChooseChoiceIndex(choiceIdx);
  try {
    const gameData = gameLoop();
    return {
      type: MAKE_CHOICE,
      ...gameData
    };
  } catch (e) {
    if (e instanceof GameOverError && e.reason === 'no more choices') {
      return {
        type: MAKE_CHOICE,
        ending: true
      };
    }
  throw e;
  }
}

// creation of Error object https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
function GameOverError(reason = '', ...rest) {
  var instance = new Error(`Game Over, ${reason}`, ...rest);
  instance.reason = reason;
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, GameOverError);
  }
  return instance;
}

GameOverError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: Error,
    enumerable: false,
    writeable: true,
    configurable: true
  }
});

if (Object.setPrototypeOf) {
  Object.setPrototypeOf(GameOverError, Error);
} else {
  GameOverError.__proto__ = Error;
}







