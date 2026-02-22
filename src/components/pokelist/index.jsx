import { useState, useEffect } from "react";
import { Link } from "react-router";
import PokemonSearch from "../pokemonSearch/index.jsx";
import PokemonComparison from "../pokemonComparison/index.jsx";

import './index.css';

const PokeList = () => {
    const [allPokemons, setAllPokemons] = useState([]);
    const [displayedPokemons, setDisplayedPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedPokemons, setSelectedPokemons] = useState([]);
    const [showComparison, setShowComparison] = useState(false);

    // Charger TOUS les pokémon une seule fois au démarrage
    useEffect(() => {
        const fetchAllPokemons = async () => {
            setLoading(true);
            try {
                // Récupérer le nombre total de pokémon
                const firstResponse = await fetch('http://localhost:3000/api/pokemons?page=1');
                const firstData = await firstResponse.json();
                
                let allPokemonsData = [...firstData.pokemons];
                
                // Récupérer les pages suivantes
                for (let page = 2; page <= firstData.totalPages; page++) {
                    const response = await fetch(`http://localhost:3000/api/pokemons?page=${page}`);
                    const data = await response.json();
                    allPokemonsData = [...allPokemonsData, ...data.pokemons];
                }
                
                setAllPokemons(allPokemonsData);
                setDisplayedPokemons(allPokemonsData);
                setTotalPages(Math.ceil(allPokemonsData.length / 20));
                setLoading(false);
            } catch (error) {
                console.error("Erreur:", error);
                setLoading(false);
            }
        };

        fetchAllPokemons();
    }, []);

    const handleSearch = (searchParams) => {
        if (searchParams.type === 'reset') {
            setDisplayedPokemons(allPokemons);
            setCurrentPage(1);
            setIsSearching(false);
            setTotalPages(Math.ceil(allPokemons.length / 20));
            return;
        }

        let filteredPokemons = allPokemons;

        if (searchParams.type === 'name') {
            const searchLower = searchParams.value.toLowerCase();
            filteredPokemons = allPokemons.filter(p =>
                p.name.english.toLowerCase().includes(searchLower) ||
                p.name.french.toLowerCase().includes(searchLower)
            );
        } else if (searchParams.type === 'type') {
            const searchLower = searchParams.value.toLowerCase();
            filteredPokemons = allPokemons.filter(p =>
                p.type.some(t => t.toLowerCase().includes(searchLower))
            );
        }

        setDisplayedPokemons(filteredPokemons);
        setCurrentPage(1);
        setTotalPages(Math.ceil(filteredPokemons.length / 20));
        setIsSearching(true);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            window.scrollTo(0, 0);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            window.scrollTo(0, 0);
        }
    };

    const handleSelectPokemon = (pokemon) => {
        setSelectedPokemons(prev => {
            const isSelected = prev.find(p => p.id === pokemon.id);
            if (isSelected) {
                return prev.filter(p => p.id !== pokemon.id);
            } else if (prev.length < 2) {
                return [...prev, pokemon];
            }
            return prev;
        });
    };

    const isChecked = (pokemonId) => {
        return selectedPokemons.some(p => p.id === pokemonId);
    };

    const paginatedPokemons = displayedPokemons.slice(
        (currentPage - 1) * 20,
        currentPage * 20
    );

    if (loading) {
        return <p>Chargement...</p>
    }

    return (
        <div className="poke-list-container">
            <h2 style={{color: '#9370DB', fontSize: '2.2em', fontFamily: "'Press Start 2P', cursive", textTransform: 'uppercase'}}>LISTE DES POKEMON</h2>
            <div className="action-buttons">
                <Link to="/pokemonAdd" className="btn-add-pokemon">+ Ajouter un Pokémon</Link>
                <Link to="/memory" className="btn-memory-game">🎮 Jouer au Memory</Link>
            </div>
            
            <PokemonSearch onSearch={handleSearch} pokemons={allPokemons} />

            {selectedPokemons.length === 2 && (
                <button 
                    className="btn-compare"
                    onClick={() => setShowComparison(true)}
                >
                    🔄 Comparer les {selectedPokemons.length} Pokémon sélectionnés
                </button>
            )}

            {showComparison && selectedPokemons.length === 2 && (
                <PokemonComparison 
                    pokemons={selectedPokemons}
                    onClose={() => setShowComparison(false)}
                />
            )}

            {isSearching && displayedPokemons.length === 0 && (
                <div className="no-results">
                    <p>Aucun Pokémon trouvé correspondant à votre recherche.</p>
                </div>
            )}

            <ul className="poke-list">
                {paginatedPokemons.map((pokemon) => (
                    <li key={pokemon.id}>
                        <div className="poke-card-item">
                            <input 
                                type="checkbox"
                                className="pokemon-checkbox"
                                checked={isChecked(pokemon.id)}
                                onChange={() => handleSelectPokemon(pokemon)}
                            />
                            <Link to={`/pokemonDetails/${pokemon.id}`}>
                                <div className="poke-card-list">
                                    <h3 style={{color: '#9370DB', fontFamily: "'Press Start 2P', cursive", textTransform: 'uppercase', fontSize: '16px', textShadow: '2px 2px 0px #FFF, 3px 3px 0px rgba(255, 255, 255, 0.5)'}}>{pokemon.name.english.toUpperCase()}</h3>
                                    <p style={{color: '#00FFE7', fontFamily: "'Press Start 2P', cursive", textTransform: 'uppercase', fontSize: '13px'}}>{pokemon.name.french.toUpperCase()}</p>
                                    <img src={pokemon.image} alt={pokemon.name.english} />
                                    <div className="poke-types">
                                        {pokemon.type.map((t, i) => (
                                            <span key={i} className={`type-badge type-${t.toLowerCase()}`}>{t}</span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="pagination">
                <button 
                    onClick={handlePrevPage} 
                    disabled={currentPage === 1}
                    className="pagination-btn"
                >
                    ← Précédent
                </button>
                <span className="pagination-info">
                    Page {currentPage} sur {totalPages} ({displayedPokemons.length} pokémon)
                </span>
                <button 
                    onClick={handleNextPage} 
                    disabled={currentPage === totalPages}
                    className="pagination-btn"
                >
                    Suivant →
                </button>
            </div>
        </div>
    );
};

export default PokeList;
