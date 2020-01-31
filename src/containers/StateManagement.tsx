import * as React from 'react';
import {
  StoreEnhancer,
  applyMiddleware,
  createStore,
  combineReducers,
  compose
} from "redux";
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import superagentInterface from "redux-query-interface-superagent";
import { Provider as ReduxQueryProvider } from 'redux-query-react';
import { queryMiddleware, entitiesReducer, queriesReducer } from 'redux-query';
import { reducer as auth } from "state/auth"
import { authHeader } from 'state/auth_header';

// Reducers
const rootReducer = combineReducers({
  auth,
  entities: entitiesReducer,
  queries: queriesReducer,
});


// Initial state - keep it simple, just to prevent basic null selection errs
export const initialState: any = {
  auth: {},
  queries: {},
  entities: {}
};


// Middleware / redux query setup
const getQueries = (state: any) => state.queries;
const getEntities = (state: any) => state.entities;

// Middlewares must be destructured into enhancers which only enable devtools
// if they are present - prevents "undefined" middlewares from being applied
// See this issue comment by Dan Abramov:
// https://github.com/facebook/create-react-app/issues/1114#issuecomment-263650957
const middleware = [
  authHeader,
  queryMiddleware(superagentInterface, getQueries, getEntities),
];
const enhancers: StoreEnhancer<{ dispatch: {} }, {}>[] = [
  applyMiddleware(...middleware)
];
if (window && (window as any).__REDUX_DEVTOOLS_EXTENSION__) {
  enhancers.push((window as any).__REDUX_DEVTOOLS_EXTENSION__());
}
export const store: any = createStore(
  rootReducer,
  initialState as any,
  compose(...enhancers)
);



const StateManagement = (props: any) => {
  return (
      <BrowserRouter>
    <Provider store={store}>
      <ReduxQueryProvider queriesSelector={getQueries}>
        {props.children}
      </ReduxQueryProvider>
    </Provider>
      </BrowserRouter>
  );
};

export default StateManagement;