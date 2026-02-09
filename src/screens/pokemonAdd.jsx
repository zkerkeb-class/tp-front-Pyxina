import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import CustomSelect from '../components/pokemonSearch/customSelect';
import './pokemonAdd.css';

const PokemonAdd = () => {
    const availableTypes = ['Normal', 'Fighting', 'Flying', 'Poison', 'Ground', 'Rock', 'Bug', 'Ghost', 'Steel', 'Fire', 'Water', 'Grass', 'Electric', 'Psychic', 'Ice', 'Dragon', 'Dark', 'Fairy'];
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: {
            english: '',
            french: '',
            japanese: '',
            chinese: ''
        },
        type: [''],
        base: {
            HP: 0,
            Attack: 0,
            Defense: 0,
            SpecialAttack: 0,
            SpecialDefense: 0,
            Speed: 0
        },
        image: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData({
                ...formData,
                [parent]: {
                    ...formData[parent],
                    [child]: isNaN(value) ? value : parseInt(value)
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: isNaN(value) ? value : value
            });
        }
    };

    const handleTypeChange = (index, value) => {
        const newTypes = [...formData.type];
        newTypes[index] = value;
        setFormData({ ...formData, type: newTypes });
    };

    const handleAddType = () => {
        setFormData({ ...formData, type: [...formData.type, ''] });
    };

    const handleRemoveType = (index) => {
        const newTypes = formData.type.filter((_, i) => i !== index);
        setFormData({ ...formData, type: newTypes });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        // Validation
        if (!formData.name.english.trim()) {
            setError('Le nom anglais est requis');
            return;
        }
        
        if (formData.type.some(t => !t.trim())) {
            setError('Tous les types doivent être remplis');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:3000/api/pokemons', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Error creating pokemon');
            }

            const newPokemon = await response.json();
            alert(`Pokémon "${newPokemon.name.english}" créé avec succès!`);
            navigate('/');
        } catch (err) {
            setError('Erreur lors de la création: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pokemon-add">
            <Link to="/" className="back-link">← Retour à la liste</Link>

            <div className="add-form-container">
                <h1 style={{color: '#00D9FF', fontFamily: "'Comfortaa', cursive"}}>Créer un nouveau Pokémon</h1>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="form">
                    <div className="form-section">
                        <h2 style={{color: '#00D9FF', fontFamily: "'Comfortaa', cursive"}}>Informations de base</h2>

                        <div className="form-group">
                            <label>Nom (Anglais) *</label>
                            <input 
                                type="text" 
                                name="name.english"
                                value={formData.name.english}
                                onChange={handleInputChange}
                                placeholder="Ex: Pikachu"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Nom (Français)</label>
                            <input 
                                type="text" 
                                name="name.french"
                                value={formData.name.french}
                                onChange={handleInputChange}
                                placeholder="Ex: Pikachu"
                            />
                        </div>

                        <div className="form-group">
                            <label>Nom (Japonais)</label>
                            <input 
                                type="text" 
                                name="name.japanese"
                                value={formData.name.japanese}
                                onChange={handleInputChange}
                                placeholder="Ex: ピカチュウ"
                            />
                        </div>

                        <div className="form-group">
                            <label>Nom (Chinois)</label>
                            <input 
                                type="text" 
                                name="name.chinese"
                                value={formData.name.chinese}
                                onChange={handleInputChange}
                                placeholder="Ex: 皮卡丘"
                            />
                        </div>

                        <div className="form-group">
                            <label>URL de l'image</label>
                            <input 
                                type="url" 
                                name="image"
                                value={formData.image}
                                onChange={handleInputChange}
                                placeholder="Ex: http://localhost:3000/assets/pokemons/1.png"
                            />
                        </div>
                    </div>

                    <div className="form-section">
                        <h2 style={{color: '#00D9FF', fontFamily: "'Comfortaa', cursive"}}>Types *</h2>
                        {formData.type.map((t, i) => (
                            <div key={i} className="type-input-group">
                                <CustomSelect 
                                    value={t}
                                    onChange={(value) => handleTypeChange(i, value)}
                                    options={availableTypes}
                                    placeholder="Sélectionner un type"
                                />
                                {formData.type.length > 1 && (
                                    <button 
                                        type="button" 
                                        onClick={() => handleRemoveType(i)}
                                        className="btn-remove"
                                    >
                                        Supprimer
                                    </button>
                                )}
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

                    <div className="form-section">
                        <h2 style={{color: '#00D9FF', fontFamily: "'Comfortaa', cursive"}}>Statistiques</h2>
                        <div className="stats-grid">
                            {Object.entries(formData.base).map(([key, value]) => (
                                <div key={key} className="form-group">
                                    <label>{key} *</label>
                                    <input 
                                        type="number" 
                                        name={`base.${key}`}
                                        value={value}
                                        onChange={handleInputChange}
                                        min="0"
                                        max="255"
                                        required
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn-create" disabled={loading}>
                            {loading ? 'Création en cours...' : '✨ Créer le Pokémon'}
                        </button>
                        <Link to="/" className="btn-cancel-link">Annuler</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PokemonAdd;