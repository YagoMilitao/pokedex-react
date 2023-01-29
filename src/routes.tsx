import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Pokedex } from './pokedex/Pokedex';
import { PokemonDetails } from './pokemon/PokemonDetails';


interface RoutesProps {
    
}

export const Routes: React.FC<RoutesProps> = () => {
    return (
        <>
            <Switch >
                <Route path="/pokemon/:name">
                   <PokemonDetails/>
                </Route>
                <Route path="/">
                    <Pokedex />
                </Route>
            </Switch>
        </>
    );
};

export default Routes;