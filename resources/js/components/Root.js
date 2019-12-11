import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import datepickerFactory from 'jquery-datepicker';
import $ from 'jquery';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducers/rootReducer';
import { App } from './App';


const store = createStore(rootReducer, applyMiddleware(thunk));

datepickerFactory($);

function Root() {
  return (
        <Provider store={store}>
            <App />
        </Provider>
  );
}

export default Root;

if (document.getElementById('app')) {
  ReactDOM.render(<Root />, document.getElementById('app'));
}
