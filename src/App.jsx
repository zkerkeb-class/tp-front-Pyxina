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
        fontSize: '2.6em', 
        marginBottom: '15px', 
        fontFamily: "'Comfortaa', cursive",
        fontWeight: 'bold',
        letterSpacing: '2px',
        transform: 'scale(1.1)',
      }}>
        <span style={{color: '#FFD700'}}>✨</span>
        <span style={{
          color: '#00D9FF',
          display: 'inline-block',
          filter: 'drop-shadow(3px 3px 0px rgba(0, 217, 255, 0.3))'
        }}>
          Pokédex Girly
        </span>
        <span style={{color: '#FFD700'}}>✨</span>
      </h1>
      <p style={{
        fontSize: '1.5em', 
        color: '#00D9FF', 
        marginBottom: '30px', 
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontFamily: "'Comfortaa', cursive",
        textShadow: '2px 2px 4px rgba(0, 217, 255, 0.4)',
        letterSpacing: '1px'
      }}>💕 Découvrez vos pokémons favoris 💕</p>
      <Pokelist></Pokelist>
    </div>
  )

}

export default App
