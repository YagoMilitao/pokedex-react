import { Card, CardMedia, CardHeader, Chip, CardActions, IconButton } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { PokemonDetail } from '../../pokemon/interfaces/PokemonDetail';
import { firstLetterCaps } from '../../Utils/FirstLetterCaps';

interface PokedexCardProps {
    pokemon: PokemonDetail;
}

export const PokedexCard: React.FC<PokedexCardProps> = ({ pokemon }) => {
  //navegar para outra rota ao clicar no componente PokedexCard.
  const history = useHistory();
  
  // função chamada quando o componente PokedexCard é clicado.
  function handleClick() {
    //usa a função push do objeto history para navegar para a rota /pokemon/<nome-do-pokemon>.
    history.push(`/pokemon/${pokemon.name}`);
  }  
  
  return (
    <Card onClick={handleClick} >
        <CardMedia
        image={pokemon.sprites.other?.['official-artwork'].front_default}
        component="img"
        alt="Pokemon sprite"
      />
      <CardHeader
        title = {firstLetterCaps(pokemon.name)+`  #${pokemon.id}`}
        subheader={pokemon.types.map((type)=> 
          <Chip label={(type.type.name)}
            variant="outlined"
          />
        )}
      />
      <CardActions disableSpacing>
        <IconButton>
        </IconButton>
      </CardActions>
    </Card>
  );
};