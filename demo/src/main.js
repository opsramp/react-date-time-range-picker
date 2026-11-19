import React from 'react';
import ReactDom from 'react-dom';
import initializeDemoI18n from './initializeDemoI18n';

initializeDemoI18n();
const Main = require('./components/Main').default;

ReactDom.render(<Main />, document.getElementById('root'));
