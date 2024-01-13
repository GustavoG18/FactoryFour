import './App.css';
import { StatusBar } from './components/StatusBar/StatusBar';
import { StatusCard } from './components/StatusCard/StatusCard';
import { API_NAMES_LIST } from './Utils/api-names-list';

const App = () => {
  return (
    <>
    <StatusBar/>
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {API_NAMES_LIST.map((name: string, index) => {
          return <StatusCard key={index} apiName={name} />
        })}
      </div>
    </div>
    </>
  )
}

export default App;
