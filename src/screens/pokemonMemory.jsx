import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import './pokemonMemory.css';

const PokemonMemory = () => {
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [moves, setMoves] = useState(0);
    const [loading, setLoading] = useState(true);
    const [gameWon, setGameWon] = useState(false);

    // Initialiser le jeu
    useEffect(() => {
        initializeGame();
    }, []);

    // Vérifier si le jeu est gagné
    useEffect(() => {
        if (cards.length > 0 && matched.length === cards.length) {
            setGameWon(true);
        }
    }, [matched, cards.length]);

    const initializeGame = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/pokemons');
            const data = await response.json();
            const pokemons = data.pokemons || data;

            // Sélectionner 8 pokémons aléatoires
            const selected = pokemons.sort(() => 0.5 - Math.random()).slice(0, 8);

            // Créer les cartes (chaque pokémon apparaît 2 fois)
            const gameCards = [];
            selected.forEach((pokemon, index) => {
                gameCards.push({ id: pokemon.id, name: pokemon.name.english, image: pokemon.image, pairId: index });
                gameCards.push({ id: pokemon.id, name: pokemon.name.english, image: pokemon.image, pairId: index });
            });

            // Mélanger les cartes
            const shuffled = gameCards.sort(() => Math.random() - 0.5);
            setCards(shuffled);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching pokemons:', error);
            setLoading(false);
        }
    };

    const handleCardClick = (index) => {
        // Ne pas pouvoir cliquer sur une carte déjà retournée ou appairée
        if (flipped.includes(index) || matched.includes(index)) return;

        // Limit à 2 cartes retournées
        if (flipped.length >= 2) return;

        const newFlipped = [...flipped, index];
        setFlipped(newFlipped);

        // Vérifier si les 2 cartes correspondent
        if (newFlipped.length === 2) {
            if (cards[newFlipped[0]].pairId === cards[newFlipped[1]].pairId) {
                // Les cartes correspondent!
                setMatched([...matched, ...newFlipped]);
                setFlipped([]);
            } else {
                // Les cartes ne correspondent pas, les retourner après 1 seconde
                setTimeout(() => {
                    setFlipped([]);
                }, 1000);
            }
            setMoves(moves + 1);
        }
    };

    const resetGame = () => {
        setFlipped([]);
        setMatched([]);
        setMoves(0);
        setGameWon(false);
        initializeGame();
    };

    if (loading) {
        return (
            <div className="pokemon-memory">
                <Link to="/" className="back-link">← Retour à la liste</Link>
                <h1 style={{color: '#00D9FF', fontFamily: "'Comfortaa', cursive"}}>Jeu Memory Pokémon</h1>
                <p>Chargement du jeu...</p>
            </div>
        );
    }

    return (
        <div className="pokemon-memory">
            <Link to="/" className="back-link">← Retour à la liste</Link>

            <h1 style={{color: '#00D9FF', fontFamily: "'Comfortaa', cursive"}}>🎮 Jeu Memory Pokémon 🎮</h1>

            <div className="memory-stats">
                <div className="stat-box">
                    <p>Coups</p>
                    <span style={{color: '#FF69B4', fontSize: '28px', fontWeight: 'bold'}}>{moves}</span>
                </div>
                <div className="stat-box">
                    <p>Paires trouvées</p>
                    <span style={{color: '#00D9FF', fontSize: '28px', fontWeight: 'bold'}}>{Math.floor(matched.length / 2)} / {cards.length / 2}</span>
                </div>
            </div>

            {gameWon && (
                <div className="win-message">
                    <h2>🎉 Victoire! 🎉</h2>
                    <p>Vous avez terminé en {moves} coups!</p>
                    <button onClick={resetGame} className="btn-restart">Rejouer</button>
                </div>
            )}

            <div className="memory-grid">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className={`memory-card ${flipped.includes(index) || matched.includes(index) ? 'flipped' : ''}`}
                        onClick={() => handleCardClick(index)}
                    >
                        <div className="card-inner">
                            <div className="card-front">
                                <span className="card-emoji">🎴</span>
                            </div>
                            <div className="card-back">
                                <img src={card.image} alt={card.name} />
                                <p className="card-name">{card.name}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="button-group">
                {!gameWon && (
                    <button onClick={resetGame} className="btn-reset">Recommencer</button>
                )}
            </div>
        </div>
    );
};

export default PokemonMemory;
