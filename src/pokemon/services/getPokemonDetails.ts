import axios from "axios";
import { PokemonDetail } from "../interfaces/PokemonDetail";

export  async function getPokemonDetails(name:string): Promise<PokemonDetail>{
    const endpoint =`${process.env.REACT_APP_POKEAPI}/pokemon/${name}`;   

    const response = await axios.get<PokemonDetail>(endpoint);

    return response.data
}