//Pega os detalhes dos pokemons a partir da API

import axios from "axios";
import { PokemonDetail } from "../interfaces/PokemonDetail";

export  async function getPokemonDetails(name:string): Promise<PokemonDetail>{
    const endpoint =`${process.env.REACT_APP_POKEAPI}/pokemon/${name}`;   

    const response = await axios.get<PokemonDetail>(endpoint);

    // await 2 seconds to simulate slow internet
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return response.data
}