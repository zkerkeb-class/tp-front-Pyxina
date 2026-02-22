
const PokeTitle = ({ name }) => {
    // Convertir le nom en majuscules et supprimer les accents pour un look rétro arcade
    const formatName = (str) => {
        return str
            .toUpperCase()
            .replace(/É/g, 'E')
            .replace(/È/g, 'E')
            .replace(/Ê/g, 'E')
            .replace(/À/g, 'A')
            .replace(/Â/g, 'A')
            .replace(/Ç/g, 'C')
            .replace(/Ù/g, 'U')
            .replace(/Û/g, 'U')
            .replace(/Ô/g, 'O');
    };
    
    return (
        <span className="poke-title">{formatName(name)}</span>
    );
}

export default PokeTitle;