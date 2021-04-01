import { combineReducers } from 'redux';
import notifier from '../../modules/notifier/notifier.reducer';

const rootReducer = combineReducers({
  notifier,
});

export type IRootState = ReturnType<typeof rootReducer>;
export default rootReducer;
