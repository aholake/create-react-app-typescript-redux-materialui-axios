import { combineReducers } from 'redux';
import notifier from '../../modules/notifier/redux/notifier.reducer';

const rootReducer = combineReducers({
  notifier,
});

export type IRootState = ReturnType<typeof rootReducer>;
export default rootReducer;
