import { useReducer } from 'react';

// 类似于class component的setState
export const useSet = (initState: unknown) => {
  const [state, setState] = useReducer((state: any, newState: any) => {
    let action = newState;
    if (typeof newState === 'function') {
      action = action(state);
    }
    if (newState.action && newState.payload) {
      action = newState.payload;
      if (typeof action === 'function') {
        action = action(state);
      }
    }
    const result = { ...state, ...action };
    // if (newState.action !== 'no-log') {
    //   console.group(newState.action || 'action'); // TODO: give it a name
    //   console.log('%cState:', 'color: #9E9E9E; font-weight: 700;', state);
    //   console.log('%cAction:', 'color: #00A7F7; font-weight: 700;', action);
    //   console.log('%cNext:', 'color: #47B04B; font-weight: 700;', result);
    //   console.groupEnd();
    // } else {
    // }
    return result;
  }, initState);
  const setStateWithActionName = (state: any, actionName: any) => {
    setState(state);
  };
  return [state, setStateWithActionName];
};
