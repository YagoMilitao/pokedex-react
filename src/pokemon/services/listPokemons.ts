import { PokemonDetail } from './../interfaces/PokemonDetail';
//Listagem dos pokemons na tela


import axios from "axios";
import { getPokemonDetails } from './getPokemonDetails';

export interface PokemonListInterface {
    name:string;
    url:string; 
    children?: React.ReactNode
}

interface ListPokemonsInterface{
    count : number;
    next: null | string;
    previus: null | string;

    results: PokemonDetail[]
}



export  async function listPokemons(): Promise<ListPokemonsInterface>{
    //para listar todos os 151 pokemons `${process.env.REACT_APP_POKEAPI}/pokemon`/?limit=151
    const endpoint =`${process.env.REACT_APP_POKEAPI}/pokemon/?limit=151`;
    if (!endpoint){
      console.error ("Lista não carregada",endpoint)
    }
    const response = await axios.get<ListPokemonsInterface>(endpoint);

    const promiseArr = response.data.results.map(({name})=> getPokemonDetails(name))
    
    const resultsPromise = await Promise.all(promiseArr)

    // await 2 seconds to simulate slow internet
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return{
        ...response.data,
        results: resultsPromise
    } 
}