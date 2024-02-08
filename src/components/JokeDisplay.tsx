import React, { useState, useEffect } from 'react';
import { Joke,  getRandomJoke } from './services/jokeService';
import { Container, Grid, Button, Box, Typography, Divider, SvgIconProps, SvgIcon } from '@mui/material';

{/* Temporary opening and close quote icon */}
const OpenQuoteIcon = (props: SvgIconProps) => (
  <SvgIcon {...props}>
    <path d="M10 20H5V10h5v10zm11 0h-5V10h5v10z" />
  </SvgIcon>
);

const CloseQuoteIcon = (props: SvgIconProps) => (
  <SvgIcon {...props}>
    <path d="M10 20H5V10h5v10zm11 0h-5V10h5v10z" />
  </SvgIcon>
);

const JokeApp: React.FC = () => {
  const [joke, setJoke] = useState<{ joke: string; punchLine?: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPunchline, setShowPunchline] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchJoke = async () => {
    setLoading(true);
    setShowPunchline(false);
    setError(null);
    try {
      const newJoke = await getRandomJoke();
      setJoke(newJoke);
    } catch (e) {
      setError('Failed to fetch a new joke.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <Container >
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Button variant="contained" 
        color="success" onClick={fetchJoke} 
        sx={{ borderRadius: '25px',  padding: '20px', 
        backgroundColor: '#90EE90',  '&:hover': { backgroundColor: '#7AA07A'} }}>
          Get A New Random Joke
        </Button>
      </Grid>
      <Grid item>
        <Button href="https://mwks-joke-service.azurewebsites.net/api/joke/random" target="_blank" rel="noopener">
          View API Docs
        </Button>
      </Grid>
    </Grid>
    <Divider sx={{ my: 2, borderColor: 'lightgrey' }} />  
  {/* Check for loading state */}
  {loading ? (
    <Box display="flex" flexDirection="column" alignItems="center" my={4}>
      <Typography>Loading your joke...</Typography>
    </Box>
  ) : error ? (
    <Typography color="error" sx={{ my: 4 }}>
      {error}
    </Typography>
  ) : (

    <Box display="flex" flexDirection="column" alignItems="center" my={4}>
    
      <Typography variant="h6" component="p" sx={{ mb: 2 }}>
       <OpenQuoteIcon /> {joke?.joke}...
      </Typography>
      <Button variant="contained" color="primary" sx={{ borderRadius: '25px', padding: '20px', mt: 4, mb: 4}} onClick={() => setShowPunchline(!showPunchline)}>
        {showPunchline ? 'Hide Punchline' : 'Show Punchline'}
      </Button>
      {showPunchline && joke?.punchLine && (
        <Box display="flex" alignItems="center">
          <Typography variant="h6" component="p" sx={{ mx: 2 }}>
            {joke?.punchLine}
          </Typography>
          <CloseQuoteIcon />
        </Box>
      )}
    </Box>
  )}
  </Container>
  );
};

export default JokeApp;
