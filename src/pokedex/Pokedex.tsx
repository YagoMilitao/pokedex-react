import { cleanup } from '@testing-library/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PokemonDetail } from '../pokemon/interfaces/PokemonDetail';
import { getPokemonDetails } from '../pokemon/services/getPokemonDetails';
import { listPokemons, PokemonListInterface } from '../pokemon/services/listPokemons';

interface PokedexProps {
    
                
}



//const pokemonsArray: string[] = ["Bulbasaur, Yvesaur, Venosaur, Squirtle"]

export const Pokedex: React.FC<PokedexProps> = () => {
            //lê↓    modifica↓
    const [pokemons, setPokemons] = useState<PokemonListInterface[]>([])
    const [selectedPokemon, setselectedPokemon] = useState<PokemonListInterface | undefined>(undefined)
    const [selectedPokemonDetails, setselectedPokemonDetails] = useState<PokemonDetail | undefined>(undefined)
    
    useEffect(() => {
        listPokemons().then((res) =>setPokemons(res.results))
        
    }, []);
    
    useEffect(() => {
        if(!selectedPokemon){
            return
        }

        getPokemonDetails(selectedPokemon.name)
        .then((res) =>setselectedPokemonDetails(res))


        //alert(selectedPokemon.name)
    }, [selectedPokemon]);
    
    return (
      <div>
        <h1>Pokedex</h1>
        
        Pokemons: 
        {pokemons.map((pokemon) => <button onClick={() => setselectedPokemon(pokemon)}>{pokemon.name}</button>)}
        
        <h2>Pokemon selecionado: {selectedPokemon?.name || "Nenhum Pokémon selecionado"}</h2>
        {JSON.stringify(selectedPokemonDetails, undefined, 2)}
      </div>

    );
};

export default Pokedex;