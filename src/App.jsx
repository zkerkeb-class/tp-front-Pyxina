import { useEffect } from 'react';
import './App.css'
import Pokelist from './components/pokelist'
import { Link, useNavigate } from 'react-router'

function App() {
  const navigate = useNavigate();
  console.log(navigate);

  useEffect(() => {
    console.log("App component mounted");

    // setTimeout(() =>
      // redirectToDetails()
      // , 5000);

  }, []);

  const redirectToDetails = () => {
    navigate('/pokemonDetails');
  }

  return (
    <div>
      <h1 style={{
        fontSize: '3.5em', 
        marginBottom: '15px', 
        fontFamily: "'Press Start 2P', cursive",
        fontWeight: 'bold',
        letterSpacing: '2px',
        background: 'linear-gradient(90deg, #FF70A6, #9370DB)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        textShadow: '0 0 0 #FFF, 3px 3px 0px rgba(147, 112, 219, 0.5), -3px -3px 0px rgba(255, 112, 166, 0.5)',
        paint: 'stroke',
        textTransform: 'uppercase',
      }}>
        PYXINA POKEDEX
      </h1>
      <p style={{
        fontSize: '1.2em', 
        color: '#FF70A6', 
        marginBottom: '30px', 
        fontWeight: 'bold',
        fontFamily: "'Press Start 2P', cursive",
        textShadow: '2px 2px 0px #FFF, 3px 3px 0px rgba(255, 112, 166, 0.3)',
        letterSpacing: '1px',
        textTransform: 'uppercase'
      }}>💕 DECOUVREZ VOS POKEMON FAVORIS 💕</p>
      <Pokelist></Pokelist>
    </div>
  )

}

export default App
