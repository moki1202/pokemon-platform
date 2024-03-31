'use state'
import React, { useState, useEffect }  from 'react';
import '@/styles/PokedexModal.css';
import axios from 'axios';

interface PokedexModalProps {
  onClose: () => void;
  name: string;
  image: string;
}

interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

const PokedexModal: React.FC<PokedexModalProps> = ({ onClose, name, image }) => {

  const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);

  useEffect(() => {
    // Fetch additional details about the Pokemon when the modal is opened
    const fetchPokemonType = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const types: PokemonType[] = response.data.types;
        const pokemonTypes = types.map((type) => type.type.name.toUpperCase());
        setPokemonTypes(pokemonTypes);
        setCryUrl(response.data.cries?.latest || null);

      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
      }
    };

    fetchPokemonType();

    // Cleanup function
    return () => {
      setPokemonTypes([]); // Reset the state when the modal is closed
    };
  }, [name]);

  const [cryUrl, setCryUrl] = useState<string | null>(null);
  const playCry = () => {
    if (cryUrl) {
      const audio = new Audio(cryUrl);
      audio.play().catch((error) => {
        console.error('Error playing cry sound:', error);
      });
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2 className="pokemon-name">{name.toUpperCase()}</h2>
        <img className="pokemon-image" src={image} alt={name} />
        <div className="pokemon-types">
        <p>
          Types: {pokemonTypes.length > 0 ? pokemonTypes.join(', ') : 'None'}
        </p>
        </div>
         <button className="cry-button" onClick={playCry}>Cry</button>
      </div>
    </div>
  );
}

export default PokedexModal;
