import styled from 'styled-components';
import React from 'react';
import { PokemonListInterface } from '../../pokemon/services/listPokemons';

interface PokedexCardProps {
    pokemon: PokemonListInterface;
}
const Card = styled.section`
  padding: 4em;
  border-radius: .5em;
  background: papayawhip;
`;

export const PokedexCard: React.FC<PokedexCardProps> = ({ pokemon }) => {
    return (
        <>
        <Card>
          {pokemon.name}
        </Card>
            
        </>
    );
};