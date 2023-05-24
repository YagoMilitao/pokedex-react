import React from 'react';
import { Switch, Route} from "react-router-dom";
import { Pokedex } from './pages/Pokedex';
import { PokemonDetails } from './pages/PokemonDetail';

interface RoutesProps {
}

export const Routes: React.FC<RoutesProps> = () => {
    return (
        <>
            <Switch >
                {/*URLs com o formato /pokemon/{nome} */}
                <Route path="/pokemon/:name">
                   {/*Renderiza o componente PokemonDetails, responsável por exibir os detalhes de um Pokémon específico */}
                   <PokemonDetails/>
                </Route>
                {/*URL raiz */}
                <Route path="/">
                    {/*Renderiza o componente Pokedex, que é responsável por exibir a lista de Pokémons. */}
                    <Pokedex />
                </Route>
            </Switch>
        </>
    );
};

export default Routes;