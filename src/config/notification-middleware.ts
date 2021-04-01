import { enqueueSnackbar } from '../modules/notifier/notifier.reducer';

const isPromise = (value): boolean => {
  if (value !== null && typeof value === 'object') {
    return value && typeof value.then === 'function';
  }
  return false;
};

export default () => (next) => (action) => {
  // If not a promise, continue on
  if (!isPromise(action.payload)) {
    return next(action);
  }

  /**
   *
   * The notification middleware serves to dispatch the initial pending promise to
   * the promise middleware, but adds a `then` and `catch.
   */
  return next(action)
    .then((response) => {
      next(enqueueSnackbar('Fetch data successfully', 'success'));
      return Promise.resolve(response);
    })
    .catch((error) => {
      next(enqueueSnackbar(`Something went wrong to API${error}`, 'error'));
      return Promise.reject(error);
    });
};
