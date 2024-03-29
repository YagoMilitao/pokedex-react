
import React from 'react';
import { listPokemons } from '../../services/listPokemons';
import { AppBar, Box, Button, CircularProgress, Container, Grid, IconButton, LinearProgress, Toolbar, Typography } from '@mui/material';
import { PokedexCard } from '../PokedexCard';
import { useQuery } from 'react-query';
import MenuIcon from '@mui/icons-material/Menu';
import { PokemonDetail } from '../../interfaces/PokemonDetail';
import { More } from '@mui/icons-material';

interface PokedexProps {
    
}


export const Pokedex: React.FC<PokedexProps> = () => {

  // Obter dados da lista de pokémons usando o hook useQuery
  const {data, isLoading, isRefetching, refetch, isStale} = useQuery(`listPokemons`, listPokemons);

  return (
    <Box sx ={{ flexGrow:1}}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" size="large">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">
            Pokedex
          </Typography>
          <Box sx={{ flexGrow: 1}} />
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-haspopup="true"
              color="inherit"
            >
            <More />
          </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {
        // Exibir uma barra de progresso linear enquanto os dados estão sendo buscados novamente
        isRefetching && <LinearProgress variant='indeterminate' color='secondary' />
      }
      <Container maxWidth="lg">
        <div style={{marginTop: `1em`}}/>
        {
          // Verificar se os dados estão desatualizados (stale)
          isStale &&(
            // Exibir um botão para buscar os dados novamente
            <Button disabled={isRefetching} variant='outlined' onClick={()=>refetch()}>Refetch</Button>
          )
        }
        <div style={{marginTop: `1em`}}/>
       {
        // Exibir um botão para buscar os dados novamente
        !isLoading?(
          // Exibir a lista de pokémons
        <>
           <Grid container spacing={2} >
            {
              // Mapear cada pokémon da lista e renderizar o componente PokedexCard
              data?.results.map((pokemon: PokemonDetail) => (
               <>
                 <Grid item xs={6} lg={3}>
                   <PokedexCard pokemon={pokemon}/>
                 </Grid>
               </>
              ))
            }
           </Grid>
        </>
        ):(
            // Exibir um indicador de progresso circular enquanto os dados estão sendo carregados
            <div><CircularProgress/></div>
        )}
      </Container>
    </Box>
  );
};

export default Pokedex;