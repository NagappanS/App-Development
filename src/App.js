import HomePage from './HomePage';
import Stop from './Stop';
import Event from './Event';
import EcoPlan from './EcoPlan';
import {Routes,Route} from 'react-router-dom';
export default function App() {
  return (
    <>
    <Routes>
     <Route path="/" element={<Event/>}/>
     <Route path="/user-form" element={<EcoPlan/>}/>
    </Routes>
    </>
  )
}

