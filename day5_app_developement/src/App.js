import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from './Login'
import RegisterPage from './Register';
import Forgot from './Forgot';
import Hom from './Hom';
import Decorable from './Decorable';
import Cakesub from './Cakesub';
import Event from './Event';
import EcoPlan from './EcoPlan';
function App() {
  return (
     <Routes>
          <Route path="/" element={<Hom/>}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/event" element={<Event />} />
          <Route path="/decorates" element={<Decorable/>}/>
          <Route path="/cakesec" element={<Cakesub/>}/>
          <Route path="/eco-plan" element={<EcoPlan/>}/>
    </Routes>
  );
}

export default App;
