import React from 'react';
import './App.css';
import { Header } from './components/layouts';
import ThemeProvider from './theme';

function App() {
  return (
    <React.Fragment>
      <ThemeProvider>
        <Header onOpenNav={() => {}} />
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
