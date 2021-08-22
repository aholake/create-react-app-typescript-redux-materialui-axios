import ActionMessages from '../shared/action-messages';
import { enqueueSnackbar } from '../modules/notifier/redux/notifier.action';

const isPromise = (value): boolean => {
  if (value !== null && typeof value === 'object') {
    return value && typeof value.then === 'function';
  }
  return false;
};

const notificationMiddleware = () => (next) => (action) => {
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
      const successMessage = ActionMessages[action.type]?.success;
      if (successMessage) {
        next(enqueueSnackbar(successMessage, 'success'));
      }
      return Promise.resolve(response);
    })
    .catch((e) => {
      const errorMessage = ActionMessages[action.type]?.error;
      if (errorMessage) {
        next(enqueueSnackbar(errorMessage, 'error'));
      }
      return Promise.reject(e);
    });
};

export default notificationMiddleware;
