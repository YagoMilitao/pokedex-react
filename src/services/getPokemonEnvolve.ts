import axios from "axios";

export interface PokemonEnvolveInterface{
    name: string;
    url: string;
}

interface GetPokemonEnvolveInterface{
    count: number;
    next: null | string;
    previus: null | string;
    results: PokemonEnvolveInterface[]
}

export async function getPokemonEnvolve(name: string): Promise<GetPokemonEnvolveInterface> {
    const endpoint = `https://pokeapi.co/api/v2/pokemon-species/${name}`

    const response = await axios.get<GetPokemonEnvolveInterface>(endpoint);

    return response.data
}