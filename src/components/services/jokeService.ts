export interface Joke {
    id: number;
    joke: string;
    punchLine: string;
  }
  
  export const getRandomJoke = async (): Promise<Joke> => {
    const response = await fetch('https://mwks-joke-service.azurewebsites.net/api/joke/random');  
    if (!response.ok) {
      throw new Error('THERE WAS AN ERROR LOADING YOUR JOKE');
    }
    return response.json();
  };  