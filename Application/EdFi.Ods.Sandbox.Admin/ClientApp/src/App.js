import React from 'react';
import './App.css';
import { Container } from '@material-ui/core';

import SandboxManagement from './pages/SandboxManagement';
import Header from './components/Header';
import Footer from './components/Footer';
import Nav from './components/Nav';

function App() {
  return (
    <Container maxwidth="md">
      <Header />
      <Nav />
      <Footer />
    </Container>
  );
}

export default App;
