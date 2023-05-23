import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import {BrowserRouter as Router} from "react-router-dom";
import Routes from './routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries:{
        staleTime: 50000,
        cacheTime: 1000 * 60 * 60 * 15,
        retry: 3,
        retryDelay:10000,
        //quando clicar na tela da pokedex faz o refetch automático baseando no stale time
        refetchOnWindowFocus:true,
        //Se a internet cair fazer o refetch
        refetchOnReconnect: true,
        onSuccess:(data) => console.log(`Sucesso!{$data}`),
        onError:(error) => console.log(`Erro!{$error}`),
        onSettled:(data)=> console.log(`Settled!{$data}`)
    }
  }
})

const App: React.FC = () =>{
  return ( 

    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes/>
      </Router>
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  )
}

export default App;
