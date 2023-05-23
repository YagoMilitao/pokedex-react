import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { getPokemonDetails } from './services/getPokemonDetails';
import { useHistory, useParams } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button, LinearProgress, CircularProgress } from '@mui/material';
import { Container, Box } from '@mui/system';
import { useQuery } from 'react-query';
import {firstLetterCaps} from '../Utils/FirstLetterCaps';
import {lbsToKgConvertion,feetToMeterConvertion} from '../Utils/ConvertionsForms'

interface PokemonDetailsProps {
    
}

//Declaração da interface PokemonQueryParams para definir a forma dos parâmetros de consulta (name) na URL.
interface PokemonQueryParams{
    name: string;
}

//Declaração do componente funcional PokemonDetails, que recebe como propriedade PokemonDetailsProps
export const PokemonDetails: React.FC<PokemonDetailsProps> = () => {
  //Volta para a página sem precisar de reload(vai apresentar a mesma tela que tava antes)
  const {goBack} = useHistory();
  let {name} = useParams<PokemonQueryParams>();

  /*Buscar os detalhes do Pokémon usando a função getPokemonDetails. O resultado é armazenado na variável data,
   e as flags isRefetching e isLoading são utilizadas para controlar o estado da busca. */
  const{data, isRefetching, isLoading} = useQuery(`getPokemonDetails-${name}`, 
    () =>getPokemonDetails(name),
    {
      cacheTime: 1000*60*60,
      staleTime: 20000,
    }
  );

  const selectedPokemonDetails = data;

  /*Se isLoading for verdadeiro, é exibido um indicador de progresso circular (CircularProgress)
     para mostrar que os dados estão sendo carregados.*/
  if (isLoading){
    return(
      <div><CircularProgress/></div>
    )
  }

    return (
        <div>
            <AppBar position="static">
              <Toolbar>
                {/*chama a função goBack do histórico de navegação*/}
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
                  { selectedPokemonDetails?.name.toUpperCase() }
                </Typography>
              </Toolbar>
            </AppBar>
            {/*Se isRefetching for verdadeiro, é exibido um indicador de progresso linear (LinearProgress) para mostrar que os dados estão sendo atualizados. */}
            {isRefetching && <LinearProgress />}
            <Container maxWidth = "lg">
              {/*O conteúdo do Pokémon inclui uma imagem do Pokémon, o tipo do Pokémon, a altura, o peso e as habilidades. 
              Esses detalhes são obtidos do objeto selectedPokemonDetails, que é resultado da busca pelos detalhes do Pokémon. */}
              <Box mt={2}>
                < img width='50%' height='auto'
                  src={selectedPokemonDetails?.sprites.other?.['official-artwork'].front_default}
                  alt=""
                />
              </Box>
              <Box>
              </Box>
              <Box display="flex" flexDirection='row'>
                <Typography>
                  Type: 
                    {" "+
                      selectedPokemonDetails?.types.map((type) =>
                        firstLetterCaps(type.type.name)).join(', ')
                    }
                </Typography>
              </Box>
              <Box display="flex" flexDirection='row'>
                <Typography>
                  Altura:
                  {
                    selectedPokemonDetails?.height !== undefined ? 
                    " "+feetToMeterConvertion(selectedPokemonDetails.height) +"m": 
                    ''
                  }
                </Typography>
              </Box>
              <Box display="flex" flexDirection='row'>
                <Typography>
                  Peso:
                  {
                    selectedPokemonDetails?.weight !== undefined ? 
                    " "+lbsToKgConvertion(selectedPokemonDetails.weight) +"kg":
                    ''
                  }
                </Typography>
              </Box>
              <Box display="flex" flexDirection='row'>
                <Typography>
                  Habilidades:
                  {
                    selectedPokemonDetails?.abilities.map((ability) =>
                      " "+firstLetterCaps(ability.ability.name)).join(', ')
                  }
                </Typography>
              </Box>
            </Container>            
        </div>
    );
};
