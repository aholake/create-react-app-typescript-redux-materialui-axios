import { ACTION_TYPES } from './notifier.action';

const defaultState: {
  notifications: any
} = {
  notifications: [],
};

type NotifierState = typeof defaultState;

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
