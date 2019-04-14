import { combineReducers, createStore } from 'redux';
import { FormStateMap, reducer as reduxFormReducer } from 'redux-form';

interface IWindow {
  store: any;
}

declare var window: IWindow;

const reducers = combineReducers({
  form: reduxFormReducer,
});

export interface ISampleStore {
  form: FormStateMap;
}

export const configureStore = () => {
  if (process.env.NODE_ENV === 'development' && window.store) {
    return window.store;
  }
  const store = createStore(reducers);
  if (process.env.NODE_ENV === 'development') {
    window.store = store;
  }
  return store;
};
