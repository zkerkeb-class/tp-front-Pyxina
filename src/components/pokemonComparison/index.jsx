import './index.css';

const PokemonComparison = ({ pokemons, onClose }) => {
    if (!pokemons || pokemons.length !== 2) {
        return null;
    }

    const [pokemon1, pokemon2] = pokemons;

    const stats = ['HP', 'Attack', 'Defense', 'SpecialAttack', 'SpecialDefense', 'Speed'];
    const maxStats = {
        HP: 255,
        Attack: 255,
        Defense: 255,
        SpecialAttack: 255,
        SpecialDefense: 255,
        Speed: 255
    };

    const StatBar = ({ label, value1, value2, maxValue }) => {
        const percentage1 = (value1 / maxValue) * 100;
        const percentage2 = (value2 / maxValue) * 100;

        return (
            <div className="stat-row">
                <div className="stat-label">{label}</div>
                <div className="stat-container">
                    <div className="pokemon-stat">
                        <div className="stat-value">{value1}</div>
                        <div className="stat-bar">
                            <div 
                                className="stat-fill pokemon1-fill"
                                style={{ width: `${percentage1}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
                <div className="stat-container">
                    <div className="pokemon-stat">
                        <div className="stat-value">{value2}</div>
                        <div className="stat-bar">
                            <div 
                                className="stat-fill pokemon2-fill"
                                style={{ width: `${percentage2}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="comparison-modal-overlay" onClick={onClose}>
            <div className="comparison-modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>✕</button>
                
                <h2 style={{color: '#00D9FF', fontFamily: "'Comfortaa', cursive", textAlign: 'center', marginBottom: '30px'}}>
                    Comparaison de Pokémon
                </h2>

                <div className="comparison-container">
                    {/* Pokemon 1 */}
                    <div className="pokemon-card pokemon-card-1">
                        <h3 style={{color: '#00D9FF'}}>{pokemon1.name.english}</h3>
                        <p style={{color: '#00FFE7'}}>{pokemon1.name.french}</p>
                        <img src={pokemon1.image} alt={pokemon1.name.english} />
                        <div className="poke-types">
                            {pokemon1.type.map((t, i) => (
                                <span key={i} className={`type-badge type-${t.toLowerCase()}`}>{t}</span>
                            ))}
                        </div>
                    </div>

                    {/* Stats Comparison */}
                    <div className="stats-comparison">
                        <div className="stats-header">
                            <div className="header-pokemon">{pokemon1.name.english}</div>
                            <div className="header-stat">Stat</div>
                            <div className="header-pokemon">{pokemon2.name.english}</div>
                        </div>

                        {stats.map((stat) => (
                            <StatBar
                                key={stat}
                                label={stat}
                                value1={pokemon1.base[stat]}
                                value2={pokemon2.base[stat]}
                                maxValue={maxStats[stat]}
                            />
                        ))}

                        {/* Totals */}
                        <div className="stat-row stat-total">
                            <div className="stat-label">Total</div>
                            <div className="stat-container">
                                <div className="total-value">
                                    {stats.reduce((sum, stat) => sum + pokemon1.base[stat], 0)}
                                </div>
                            </div>
                            <div className="stat-container">
                                <div className="total-value">
                                    {stats.reduce((sum, stat) => sum + pokemon2.base[stat], 0)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pokemon 2 */}
                    <div className="pokemon-card pokemon-card-2">
                        <h3 style={{color: '#00D9FF'}}>{pokemon2.name.english}</h3>
                        <p style={{color: '#00FFE7'}}>{pokemon2.name.french}</p>
                        <img src={pokemon2.image} alt={pokemon2.name.english} />
                        <div className="poke-types">
                            {pokemon2.type.map((t, i) => (
                                <span key={i} className={`type-badge type-${t.toLowerCase()}`}>{t}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <button className="btn-close-comparison" onClick={onClose}>Fermer</button>
            </div>
        </div>
    );
};

export default PokemonComparison;
