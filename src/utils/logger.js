const logger = store => next => action => {
  const info = console.info;

  console.group(action.type);
  info('previous state', store.getState());
  info('action', action);

  const result = next(action);
  info('next state', store.getState());
  console.groupEnd(action.type);
  return result;
}

export default logger;