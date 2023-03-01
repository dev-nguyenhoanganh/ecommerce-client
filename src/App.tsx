import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Header, Navigation } from './components/layouts';
import ThemeProvider from './theme';

function App() {
  const [open, setOpen] = useState(true);

  return (
    <React.Fragment>
      <ThemeProvider>
        <BrowserRouter>
          <Header onOpenNav={() => {}} />
          <Navigation openNav={open} onCloseNav={() => setOpen(false)} />
        </BrowserRouter>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
