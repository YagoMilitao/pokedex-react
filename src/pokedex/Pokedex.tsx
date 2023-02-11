
import React, {  } from 'react';
import { listPokemons } from '../pokemon/services/listPokemons';
import { AppBar, Button, CircularProgress, Container, Grid, IconButton, LinearProgress, Toolbar, Typography } from '@mui/material';
import { PokedexCard } from './components/PokedexCard';
//import { useQuery } from 'react-query/types/react';
import { useQuery } from 'react-query';


import MenuIcon from '@mui/icons-material/Menu';
import { PokemonDetail } from '../pokemon/interfaces/PokemonDetail';

interface PokedexProps {
    
                
}



//const pokemonsArray: string[] = ["Bulbasaur, Yvesaur, Venosaur, Squirtle"]

export const Pokedex: React.FC<PokedexProps> = () => {
            //lê↓    modifica↓
   // const [pokemons, setPokemons] = useState<PokemonDetail[]>([])

  
  const {data, isLoading, isRefetching, refetch, isStale} = useQuery(`listPokemons`, listPokemons);

    /*useEffect(() => {
      listPokemons().then((response) => setPokemons(response.results))
    },[]);*/

   
    return (
      <div>
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" color="inherit" size="large">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6">
                Pokedex
              </Typography>
            </Toolbar>
            {isRefetching && <LinearProgress variant='indeterminate' color='secondary' />}
          </AppBar>
        <Container maxWidth="lg">
          <div style={{marginTop: `1em`}}></div>
          {isStale &&(
            <Button disabled={isRefetching} variant='outlined' onClick={()=>refetch()}>Refetch</Button>
          )}
          <div style={{marginTop: `1em`}}></div>
         {!isLoading?(
          <>
             <Grid container spacing={2} >
               {data?.results.map((pokemon: PokemonDetail) => (
                 <>
                   <Grid item xs={6} lg={3}>
                     <PokedexCard pokemon={pokemon}/>
                   </Grid>
                 </>
                 ))}
             </Grid>
          </>
          ):(
              <div><CircularProgress/></div>
          )}
        </Container>
      </div>
    );
};


export default Pokedex;