import React from 'react';
import { Button } from '@material-ui/core';
import axios from 'axios';

const ACTION_TYPES = {
  ENQUEUE_SNACKBAR: 'notifier/ENQUEUE_SNACKBAR',
  CLOSE_SNACKBAR: 'notifier/CLOSE_SNACKBAR',
  REMOVE_SNACKBAR: 'notifier/REMOVE_SNACKBAR',
};

const defaultState: {
  notifications: any
} = {
  notifications: [],
};

type NotifierState = typeof defaultState;

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

export const closeSnackbar = (key) => ({
  type: ACTION_TYPES.CLOSE_SNACKBAR,
  dismissAll: !key, // dismiss all if no key has been defined
  key,
});

export const removeSnackbar = (key) => ({
  type: ACTION_TYPES.REMOVE_SNACKBAR,
  key,
});

export const fooAction = () => ({
  type: 'FOO_ACTION',
  payload: axios.get('http://localhost:9901/openmrs/ws/rest/v1/person?q=vinh'),
});

const reducer = (state = defaultState, action): NotifierState => {
  switch (action.type) {
    case ACTION_TYPES.ENQUEUE_SNACKBAR:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            key: action.key,
            ...action.notification,
          },
        ],
      };

    case ACTION_TYPES.CLOSE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.map((notification) => (
          (action.dismissAll || notification.key === action.key)
            ? { ...notification, dismissed: true }
            : { ...notification }
        )),
      };

    case ACTION_TYPES.REMOVE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.key !== action.key,
        ),
      };

    default:
      return state;
  }
};

export default reducer;
