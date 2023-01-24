import axios from "axios";

export interface PokemonListInterface {
    name:string;
    url:string; 
    children?: React.ReactNode
}

interface ListPokemonsInterface{
    count : number;
    next: null | string;
    previus: null | string;

    results: PokemonListInterface[]
}


export  async function listPokemons(): Promise<ListPokemonsInterface>{
    const endpoint =`${process.env.REACT_APP_POKEAPI}/pokemon`;
  
    const response = await axios.get<ListPokemonsInterface>(endpoint);

    return response.data
}