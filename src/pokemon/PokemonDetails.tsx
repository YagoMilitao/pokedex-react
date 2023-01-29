import { Box, AppBar, Toolbar, IconButton, Typography, Container } from '@mui/material';
import React, { useEffect, useState } from 'react';

import Button from '@mui/material/Button';

import MenuIcon from '@mui/icons-material/Menu';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { PokemonDetail } from './interfaces/PokemonDetail';
import { getPokemonDetails } from './services/getPokemonDetails';
import { listPokemons, PokemonListInterface } from './services/listPokemons';
import { useParams } from 'react-router-dom';

interface PokemonDetailsProps {
    
}

interface PokemonQueryParams{
    name: string;
}

export const PokemonDetails: React.FC<PokemonDetailsProps> = () => {
    let {name} = useParams<PokemonQueryParams>();
    const [selectedPokemonDetails, setSelectedPokemonDetails] = useState<PokemonDetail | undefined>(undefined)
    

    useEffect(() => {
        if(!name) return;

        getPokemonDetails(name)
        .then((res) =>setSelectedPokemonDetails(res))

    }, [name]);
    return (
        <div>
            <AppBar position="static">
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {name}
                </Typography>
              </Toolbar>
            </AppBar>
            <Container maxWidth = "lg">
                <Box mt={2}>
                  <img src={selectedPokemonDetails?.sprites.front_default} alt=""/>
                  Pokemon selecionado: {name}
                  {JSON.stringify(selectedPokemonDetails?.sprites, undefined,2)}
                  
                </Box>
            </Container>            
        </div>
    );
};
