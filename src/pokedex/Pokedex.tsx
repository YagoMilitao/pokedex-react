import { cleanup } from '@testing-library/react';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useHistory } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react';
import { PokemonDetail } from '../pokemon/interfaces/PokemonDetail';
import { getPokemonDetails } from '../pokemon/services/getPokemonDetails';
import { listPokemons, PokemonListInterface } from '../pokemon/services/listPokemons';
import { Container } from '@mui/material';
import { PokedexCard } from './components/PokedexCard';


interface PokedexProps {
    
                
}



//const pokemonsArray: string[] = ["Bulbasaur, Yvesaur, Venosaur, Squirtle"]

export const Pokedex: React.FC<PokedexProps> = () => {
            //lê↓    modifica↓
    const [pokemons, setPokemons] = useState<PokemonListInterface[]>([])
    const [selectedPokemon, setselectedPokemon] = useState<PokemonListInterface | undefined>(undefined);
    const history = useHistory();

    useEffect(() => {
      listPokemons().then((response) => setPokemons(response.results))
    },[]);

    
    function handleClick(pokemon: PokemonListInterface) {
      history.push(`/pokemon/${pokemon.name}`);
    }
   
    return (
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Pokedex
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
        <Container maxWidth="lg">
          <Box mt={2}>
            <Grid container rowSpacing={2} >
              {pokemons.map((pokemon) => (
                <>
                  <Grid item xs={6} lg={3}>
                    <PokedexCard pokemon={pokemon}/>
                  </Grid>
                </>
                ))}
            </Grid>
          </Box>
        </Container>
      </div>
    );
};


export default Pokedex;