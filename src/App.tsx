import './App.css';
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query'

import { StatusBar } from './components/StatusBar/StatusBar';
import { StatusCard } from './components/StatusCard/StatusCard';

import { API_NAMES_LIST } from './shared/constants/api-names-list';

const queryClient = new QueryClient()

const App = () => {
  const SECONDS = 15;
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if(timer === SECONDS){
        setTimer(0);
      }else {
        setTimer((prev) => prev + 1);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  })

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar progress={timer} total={SECONDS}/>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {API_NAMES_LIST.map((name: string, index) => {
            return <StatusCard 
              key={`${index}-${name}`} 
              apiName={name} 
              actionRefecth={timer === SECONDS}
            />
          })}
        </div>
      </div>
    </QueryClientProvider>
  )
}

export default App;
