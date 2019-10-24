import React, { Fragment } from 'react';
import GlobalStyle from './styles/global';

import Header from './components/Header';
import Board from './components/Board';

function App() {
  return (
    <Fragment>
      <Header />
      <Board />
      <GlobalStyle />
    </Fragment>
  );
}

export default App;
