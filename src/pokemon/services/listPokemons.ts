//Listagem dos pokemons na tela


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
    //para listar todos os 151 pokemons `${process.env.REACT_APP_POKEAPI}/pokemon`/?limit=151
    const endpoint =`${process.env.REACT_APP_POKEAPI}/pokemon`;
    if (!endpoint){
      console.error ("Lista não carregada",endpoint)
    }
    const response = await axios.get<ListPokemonsInterface>(endpoint);

    return response.data
}