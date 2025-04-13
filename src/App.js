
import React from 'react';
import { Route , Routes , useRoutes} from 'react-router-dom';
import routes from './routers';
import './App.css'


function App() {
  const router = useRoutes(routes)
  return (
    <>
    
      <section className='contaner'>{router}</section>
    </>
  );
}

export default App;
