import { Card, CardMedia, CardHeader, Chip, CardActions, IconButton } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { PokemonDetail } from '../../pokemon/interfaces/PokemonDetail';
import { green } from '@mui/material/colors';

const colorGreen = green[500];

interface PokedexCardProps {
    pokemon: PokemonDetail;
}
/*const Card = styled.section`
  padding: 4em;
  border-radius: .5em;
  background: papayawhip;
`;*/


/*interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));*/

//https://pokeapi.co/api/v2/evolution-chain/1/
export const PokedexCard: React.FC<PokedexCardProps> = ({ pokemon }) => {
  const history = useHistory();
  
  function handleClick() {
    history.push(`/pokemon/${pokemon.name}`);
  }  
  function FirstLetterCaps(pokemonName: string): string{
    return pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
  }
  return (
    <Card onClick={handleClick} >
      <CardMedia
      //image={pokemon.sprites.front_default}
      image={pokemon.sprites.other?.['official-artwork'].front_default}
      component="img"
      alt="Pokemon sprite"
    />
    <CardHeader
      //const pokemonName = {pokemon.name.charAt(0).toUpperCase()+ pokemon.name.slice(1)}
      //title={FirstLetterCaps()`#${pokemon.id}`}
      title= {FirstLetterCaps(pokemon.name)+`  #${pokemon.id}`}
      //subheader= {pokemon.id}
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