import { Card, CardMedia, CardHeader, Chip } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { PokemonDetail } from '../../pokemon/interfaces/PokemonDetail';

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

export const PokedexCard: React.FC<PokedexCardProps> = ({ pokemon }) => {
  const history = useHistory();
  const [expanded, setExpanded] = React.useState(false);
  
  function handleClick() {
    history.push(`/pokemon/${pokemon.name}`);
  }  
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card onClick={handleClick} >
      <CardMedia
      image={pokemon.sprites.front_default}
      component="img"
      alt="Pokemon sprite"
    />
    <CardHeader
      title={pokemon.name}
      subheader={pokemon.types.map((type)=> <Chip label={type.type.name} variant="outlined"/>)}
    />
  </Card>
    );
};