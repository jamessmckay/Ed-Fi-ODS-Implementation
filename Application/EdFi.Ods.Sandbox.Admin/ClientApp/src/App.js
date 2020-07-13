import React from 'react';
import './App.css';
import { store } from './store';
import { Provider } from 'react-redux';
import { Container } from '@material-ui/core';
import Sandboxes from './components/Sandboxes';

function App() {
  return (
    <Provider store={store}>
      <Container maxWidth="lg">
        <Sandboxes />
      </Container>
    </Provider>
  );
}

export default App;
