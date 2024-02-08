import React from 'react';
import JokeDisplay from './components/JokeDisplay';
import Container from '@mui/material/Container';

const App: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <JokeDisplay />
    </Container>
  );
};

export default App;
