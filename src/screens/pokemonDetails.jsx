import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import CustomSelect from '../components/pokemonSearch/customSelect';
import './pokemonDetails.css';

const PokemonDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editData, setEditData] = useState({});

    const availableTypes = ['Normal', 'Fighting', 'Flying', 'Poison', 'Ground', 'Rock', 'Bug', 'Ghost', 'Steel', 'Fire', 'Water', 'Grass', 'Electric', 'Psychic', 'Ice', 'Dragon', 'Dark', 'Fairy'];

    useEffect(() => {
        fetch(`http://localhost:3000/api/pokemons/${id}`)
            .then((response) => {
                if (!response.ok) throw new Error('Pokemon not found');
                return response.json();
            })
            .then((data) => {
                setPokemon(data);
                setEditData(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setEditData({
                ...editData,
                [parent]: {
                    ...editData[parent],
                    [child]: isNaN(value) ? value : parseInt(value)
                }
            });
        } else {
            setEditData({
                ...editData,
                [name]: isNaN(value) ? value : value
            });
        }
    };

    const handleTypeChange = (index, value) => {
        const newTypes = [...editData.type];
        newTypes[index] = value;
        setEditData({ ...editData, type: newTypes });
    };

    const handleAddType = () => {
        setEditData({ ...editData, type: [...editData.type, ''] });
    };

    const handleRemoveType = (index) => {
        const newTypes = editData.type.filter((_, i) => i !== index);
        setEditData({ ...editData, type: newTypes });
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/pokemons/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editData)
            });

            if (!response.ok) throw new Error('Error updating pokemon');
            
            const updatedPokemon = await response.json();
            setPokemon(updatedPokemon);
            setIsEditing(false);
            alert('Pokémon mis à jour avec succès!');
        } catch (err) {
            alert('Erreur lors de la mise à jour: ' + err.message);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/pokemons/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Error deleting pokemon');
            
            alert('Pokémon supprimé avec succès!');
            navigate('/');
        } catch (err) {
            alert('Erreur lors de la suppression: ' + err.message);
        }
    };

    if (loading) {
        return <p className="loading">Chargement des détails du Pokémon...</p>;
    }

    if (error) {
        return (
            <div className="error">
                <p>Erreur: {error}</p>
                <Link to="/">Retour à la liste des Pokémon</Link>
            </div>
        );
    }

    return (
        <div className="pokemon-details">
            <Link to="/" className="back-link">← Retour à la liste</Link>

            <div className="details-container">
                <div className="details-image">
                    <img src={pokemon.image} alt={pokemon.name.english} />
                </div>

                <div className="details-content">
                    {!isEditing ? (
                        <>
                            <h1 style={{color: '#00D9FF', fontSize: '2.8em', fontFamily: "'Comfortaa', cursive"}}>{pokemon.name.english}</h1>
                            <p className="french-name" style={{color: '#00FFE7'}}>{pokemon.name.french}</p>
                            <p className="japanese-name" style={{color: '#00D9FF'}}>{pokemon.name.japanese}</p>

                            <div className="types-section">
                                <h3>Types:</h3>
                                <div className="types">
                                    {pokemon.type.map((t, i) => (
                                        <span key={i} className={`type-tag type-${t.toLowerCase()}`}>{t}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="stats-section">
                                <h3>Statistiques:</h3>
                                <div className="stats">
                                    {Object.entries(pokemon.base).map(([key, value]) => (
                                        <div key={key} className="stat-row">
                                            <span className="stat-name">{key}:</span>
                                            <div className="stat-bar">
                                                <div 
                                                    className="stat-fill" 
                                                    style={{ width: `${(value / 150) * 100}%` }}
                                                />
                                            </div>
                                            <span className="stat-value">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="actions">
                                <button className="btn-edit" onClick={() => setIsEditing(true)}>
                                    ✏️ Modifier
                                </button>
                                <button className="btn-delete" onClick={() => setShowDeleteModal(true)}>
                                    🗑️ Supprimer
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="edit-form">
                            <h2>Modifier le Pokémon</h2>
                            
                            <div className="form-group">
                                <label>Nom (Anglais):</label>
                                <input 
                                    type="text" 
                                    name="name.english"
                                    value={editData.name?.english || ''}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Nom (Français):</label>
                                <input 
                                    type="text" 
                                    name="name.french"
                                    value={editData.name?.french || ''}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Types:</label>
                                {editData.type?.map((t, i) => (
                                    <div key={i} className="type-input-group">
                                        <CustomSelect
                                            options={availableTypes}
                                            value={t}
                                            onChange={(value) => handleTypeChange(i, value)}
                                            placeholder="Sélectionner un type"
                                        />
                                        <button 
                                            type="button" 
                                            onClick={() => handleRemoveType(i)}
                                            className="btn-remove"
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                ))}
                                <button 
                                    type="button" 
                                    onClick={handleAddType}
                                    className="btn-add-type"
                                >
                                    + Ajouter un type
                                </button>
                            </div>

                            <div className="form-group">
                                <label>Statistiques:</label>
                                {Object.entries(editData.base || {}).map(([key, value]) => (
                                    <div key={key} className="stat-input-group">
                                        <label>{key}:</label>
                                        <input 
                                            type="number" 
                                            name={`base.${key}`}
                                            value={value}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="form-actions">
                                <button className="btn-save" onClick={handleSave}>
                                    💾 Enregistrer
                                </button>
                                <button className="btn-cancel" onClick={() => {
                                    setIsEditing(false);
                                    setEditData(pokemon);
                                }}>
                                    ❌ Annuler
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Confirmer la suppression</h2>
                        <p>Êtes-vous sûr de vouloir supprimer <strong>{pokemon.name.english}</strong>?</p>
                        <p>Cette action est irréversible.</p>
                        <div className="modal-actions">
                            <button className="btn-confirm" onClick={handleDelete}>
                                Oui, supprimer
                            </button>
                            <button className="btn-cancel" onClick={() => setShowDeleteModal(false)}>
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PokemonDetails;