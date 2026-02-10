import { useState } from 'react';
import './customSelect.css';

const CustomSelect = ({ options, value, onChange, placeholder = 'Sélectionner...' }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (option) => {
        onChange(option);
        setIsOpen(false);
    };

    return (
        <div className="custom-select-wrapper">
            <button
                className="custom-select-button"
                onClick={() => setIsOpen(!isOpen)}
            >
                {value || placeholder}
                <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
            </button>
            
            {isOpen && (
                <div className="custom-select-dropdown">
                    <div
                        className="custom-select-option"
                        onClick={() => handleSelect('')}
                    >
                        {placeholder}
                    </div>
                    {options.map((option) => (
                        <div
                            key={option}
                            className={`custom-select-option ${value === option ? 'selected' : ''}`}
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomSelect;
