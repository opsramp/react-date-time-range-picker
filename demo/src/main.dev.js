import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import initializeDemoI18n from './initializeDemoI18n';

initializeDemoI18n();
const Main = require('./components/Main').default;

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  );
};

render(Main);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/Main', () => {
    render(Main);
  });
}
