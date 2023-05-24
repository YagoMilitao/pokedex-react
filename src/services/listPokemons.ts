import { PokemonDetail } from '../interfaces/PokemonDetail';
import axios from "axios";
import { getPokemonDetails } from './getPokemonDetails';

//Define a estrutura de um objeto representando um Pokémon na lista.
export interface PokemonListInterface {
    name:string;
    url:string; 
    children?: React.ReactNode
}

/*Define a estrutura da resposta da API ao buscar a lista de Pokémons. 
Ela inclui o número total de Pokémons, URLs para a próxima e a página anterior (caso existam)
e uma matriz de objetos PokemonDetail contendo os resultados. */

interface ListPokemonsInterface{
    count : number;
    next: null | string;
    previus: null | string;

    results: PokemonDetail[]
}

/*Definição da função assíncrona listPokemons, que faz uma chamada à API para obter a lista de Pokémons.
 O endpoint da API é construído usando uma variável de ambiente REACT_APP_POKEAPI e 
 é definido para buscar apenas os primeiros 151 Pokémons.
 Em seguida, é feita uma requisição GET assíncrona usando o axios. */
export  async function listPokemons(): Promise<ListPokemonsInterface>{
    //para listar todos os 151 pokemons `${process.env.REACT_APP_POKEAPI}/pokemon`/?limit=151
    const endpoint =`${process.env.REACT_APP_POKEAPI}/pokemon/?limit=151`;
    if (!endpoint){
      console.error ("Lista não carregada",endpoint)
    }
    const response = await axios.get<ListPokemonsInterface>(endpoint);

    /*mapeia os resultados da resposta da API para chamar a função getPokemonDetails
     para cada nome de Pokémon na lista. Isso cria uma matriz de promessas */
    const promiseArr = response.data.results.map(({name})=> getPokemonDetails(name))
    
    //Aguarda a resolução de todas as promessas e retornar um array com os resultados.
    const resultsPromise = await Promise.all(promiseArr)

    // await 2 seconds to simulate slow internet
    await new Promise((resolve) => setTimeout(resolve, 2000));
    /*Retorna um objeto contendo os dados da resposta original da API
     junto com os resultados dos detalhes de cada Pokémon*/
    return{
        ...response.data,
        results: resultsPromise
    } 
}