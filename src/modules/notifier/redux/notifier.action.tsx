import { Button } from '@material-ui/core';
import React from 'react';

export const ACTION_TYPES = {
  ENQUEUE_SNACKBAR: 'notifier/ENQUEUE_SNACKBAR',
  CLOSE_SNACKBAR: 'notifier/CLOSE_SNACKBAR',
  REMOVE_SNACKBAR: 'notifier/REMOVE_SNACKBAR',
};

const enqueueSnackbarInternal = (notification) => {
  const key = notification.options && notification.options.key;

  return {
    type: ACTION_TYPES.ENQUEUE_SNACKBAR,
    notification: {
      ...notification,
      key: key || new Date().getTime() + Math.random(),
    },
  };
};

export const removeSnackbar = (key) => ({
  type: ACTION_TYPES.REMOVE_SNACKBAR,
  key,
});

export const closeSnackbar = (key) => ({
  type: ACTION_TYPES.CLOSE_SNACKBAR,
  dismissAll: !key, // dismiss all if no key has been defined
  key,
});

export const enqueueSnackbar = (message: string, variant: 'error' | 'info' | 'success' | 'warning' = 'info') => (dispatch) => {
  const options = {
    key: new Date().getTime() + Math.random(),
    action: (key) => <Button onClick={() => dispatch(closeSnackbar(key))}>dismiss me</Button>,
    variant,
  };
  dispatch(enqueueSnackbarInternal({
    message,
    options,
  }));
};
