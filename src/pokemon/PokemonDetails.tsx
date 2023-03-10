import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { getPokemonDetails } from './services/getPokemonDetails';
import { useHistory, useParams } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button, LinearProgress, CircularProgress } from '@mui/material';
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
  const{data, isRefetching, isLoading} = useQuery(`getPokmeonDetails-${name}`, 
    () =>getPokemonDetails(name),
    {
      cacheTime: 1000*60*60,
      staleTime: 20000,
    }
  );
  const selectedPokemonDetails = data;
  const?: string;
  const abilities = selectedPokemonDetails?.abilities.map((ability) =>
    ability.ability.name.toLocaleUpperCase()).join(', ')

    function FirstLetterCapsPokemonDetailsAbilities(abilities: string): string{
      return abilities = abilities.charAt(0).toUpperCase() + abilities.slice(1)
    }
  
  function FirstLetterCapsPokemonDetailsName(selectedPokemonDetails: string): string{
    return selectedPokemonDetails = selectedPokemonDetails.charAt(0).toUpperCase() + selectedPokemonDetails.slice(1)
  }
  /*useEffect(() => {
    getPokemonDetails(name).then((res) =>{
      setSelectedPokemonDetails(res);
    })
  }, [name]);*/
  if (isLoading){
    return(
      <div><CircularProgress/></div>
    )
  }

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
                  {selectedPokemonDetails?.name.toUpperCase()}
                </Typography>
              </Toolbar>
            </AppBar>
            {isRefetching && <LinearProgress />}
            <Container maxWidth = "lg">
              <Box mt={2}>
                <img width='50%' height='auto'src={selectedPokemonDetails?.sprites.other?.['official-artwork'].front_default} alt=""/>
              </Box>
              <Box>
              </Box>
              <Box display="flex" flexDirection='row'>
                <Typography>
                  Type:
                  {
                    selectedPokemonDetails?.types.map((type) => 
                      {return type.type.name.toLocaleUpperCase()}).join(', ')
                  }
                </Typography>
              </Box>
              <Box display="flex" flexDirection='row'>
                <Typography variant='body1'>
                  Especie: 
                  {selectedPokemonDetails?.species.name.toLocaleUpperCase()}
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
                  {selectedPokemonDetails?.abilities.map((ability) =>
                    ability.ability.name.charAt(0).toUpperCase()+ ability.ability.name.slice(1)()).join(', ')}
                 
                </Typography>
              </Box>

              
                
            </Container>            
        </div>
    );
};
