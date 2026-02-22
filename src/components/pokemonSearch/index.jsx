import { useState, useMemo } from 'react';
import CustomSelect from './customSelect';
import './index.css';

const PokemonSearch = ({ onSearch, pokemons = [] }) => {
    const [searchType, setSearchType] = useState('name');
    const [searchValue, setSearchValue] = useState('');
    const [filterType, setFilterType] = useState('');

    // Extraire tous les types uniques disponibles
    const availableTypes = useMemo(() => {
        const types = new Set();
        pokemons.forEach(pokemon => {
            if (pokemon.type && Array.isArray(pokemon.type)) {
                pokemon.type.forEach(t => types.add(t));
            }
        });
        return Array.from(types).sort();
    }, [pokemons]);

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleTypeFilterChange = (e) => {
        setFilterType(e.target.value);
    };

    const searchTypeOptions = ['Chercher par nom', 'Chercher par type'];
    
    const handleSearchTypeChange = (selectedOption) => {
        if (selectedOption === 'Chercher par nom') {
            setSearchType('name');
        } else if (selectedOption === 'Chercher par type') {
            setSearchType('type');
        }
    };

    const handleSearch = () => {
        onSearch({
            type: searchType,
            value: searchValue,
            filterType: filterType
        });
    };

    const handleReset = () => {
        setSearchValue('');
        setFilterType('');
        setSearchType('name');
        onSearch({ type: 'reset', value: '', filterType: '' });
    };

    return (
        <div className="pokemon-search">
            <div className="search-container">
                <div className="search-group">
                    <CustomSelect
                        options={searchTypeOptions}
                        value={searchType === 'name' ? 'Chercher par nom' : 'Chercher par type'}
                        onChange={handleSearchTypeChange}
                        placeholder="Type de recherche"
                    />
                    
                    {searchType === 'name' ? (
                        <input 
                            type="text" 
                            placeholder="Ex: Pikachu"
                            value={searchValue}
                            onChange={handleSearchChange}
                            className="search-input"
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        />
                    ) : (
                        <CustomSelect
                            options={availableTypes}
                            value={searchValue}
                            onChange={setSearchValue}
                            placeholder="Sélectionner un type..."
                        />
                    )}
                    
                    <button onClick={handleSearch} className="btn-search">
                        🔍 Chercher
                    </button>
                </div>

                <button onClick={handleReset} className="btn-reset">
                    ↻ Réinitialiser
                </button>
            </div>
        </div>
    );
};

export default PokemonSearch;