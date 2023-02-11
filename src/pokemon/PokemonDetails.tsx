import React, { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { PokemonDetail } from './interfaces/PokemonDetail';
import { getPokemonDetails } from './services/getPokemonDetails';
import { useHistory, useParams } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import { Container, Box } from '@mui/system';
import { useQuery } from 'react-query';

interface PokemonDetailsProps {
    
}

interface PokemonQueryParams{
    name: string;
}

export const PokemonDetails: React.FC<PokemonDetailsProps> = () => {
  //Volta para a página sem precisar de reload(vai apresentar a mesma tela que tava antes)
  const {goBack} = useHistory();
  let {name} = useParams<PokemonQueryParams>();
  //const [selectedPokemonDetails, setSelectedPokemonDetails] = useState<PokemonDetail | undefined>(undefined)
    

  /*useEffect(() => {
    if(!name) return;

    getPokemonDetails(name)
    .then((res) =>setSelectedPokemonDetails(res))

  }, [name]);*/
  const{data} = useQuery(`getPokmeonDetails-${name}`, () =>getPokemonDetails(name));
  const selectedPokemonDetails = data;

  /*useEffect(() => {
    getPokemonDetails(name).then((res) =>{
      setSelectedPokemonDetails(res);
    })
  }, [name]);*/
    return (
        <div>
            <AppBar position="static">
              <Toolbar>
              <Button onClick={goBack}>
                Voltar
              </Button>
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
                <img width='100%' height='auto'src={selectedPokemonDetails?.sprites.front_default} alt=""/>
              </Box>
              <Box>
                <Typography variant='h2'>
                  Nome:
                {selectedPokemonDetails?.name}
              </Typography>
              </Box>
              <Box display="flex" flexDirection='row'>
                <Typography>
                  Tipo:
                {selectedPokemonDetails?.types.map((type) => <Typography>{type.type.name}</Typography>)}
                </Typography>
              </Box>
              <Box display="flex" flexDirection='row'>
                <Typography variant='body1'>
                  Especie: 
                  {selectedPokemonDetails?.species.name}
                </Typography>
              </Box>
              <Box display="flex" flexDirection='row'>
                <Typography>
                  Altura:
                  {selectedPokemonDetails?.height}
                </Typography>
              </Box>
              <Box display="flex" flexDirection='row'>
                <Typography>
                  Peso:
                  {selectedPokemonDetails?.weight}
                </Typography>
              </Box>
              <Box display="flex" flexDirection='row'>
                <Typography>
                  Habilidades:
                  {selectedPokemonDetails?.abilities.map((ability) => <Typography>{ability.ability.name}</Typography>)}
                </Typography>
              </Box>

              
                
            </Container>            
        </div>
    );
};
