'use state'
import React, { useState, useEffect } from 'react'
import '@/styles/PokedexModal.css'
import axios from 'axios'
import { get } from 'http'

// Individiual Pokedex entry from within FlavorTextEntries
interface FlavorTextEntry {
  flavor_text: string
  language: {
    name: string
    url: string
  }
  version: {
    name: string
    url: string
  }
}

// Complete Pokedex entries
interface FlavorTextEntries {
  flavor_text_entries: FlavorTextEntry[]
}

interface PokedexModalProps {
  onClose: () => void
  name: string
  image: string
}

interface PokemonType {
  slot: number
  type: {
    name: string
    url: string
  }
}

const PokedexModal: React.FC<PokedexModalProps> = ({
  onClose,
  name,
  image,
}) => {
  const [pokemonTypes, setPokemonTypes] = useState<string[]>([])
  const [flavorText, setFlavorText] = useState<string>('')

  useEffect(() => {
    // Fetch additional details about the Pokemon when the modal is opened
    const fetchPokemonInfo = async () => {
      try {
        const [typeResponse, pokedexResponse] = await Promise.all([
          axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`),
          axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`),
        ])
        const types: PokemonType[] = typeResponse.data.types
        const pokemonTypes = types.map((type) => type.type.name.toUpperCase())

        // pokedexData is the complete response of api
        const pokedexData: FlavorTextEntries = pokedexResponse.data
        const latestDescription: FlavorTextEntry[] =
          pokedexData.flavor_text_entries
        const latestDescriptionLanguageFiltered =
          getLastFlavorTextEntryByLanguage(latestDescription, 'en')

        setPokemonTypes(pokemonTypes)
        setCryUrl(typeResponse.data.cries?.latest || null)
        setFlavorText(latestDescriptionLanguageFiltered)
      } catch (error) {
        console.error('Error fetching Pokemon details:', error)
      }
    }

    fetchPokemonInfo()

    // Cleanup function
    return () => {
      setPokemonTypes([]) // Reset the state when the modal is closed
    }
  }, [name])

  const [cryUrl, setCryUrl] = useState<string | null>(null)
  const playCry = () => {
    if (cryUrl) {
      const audio = new Audio(cryUrl)
      audio.play().catch((error) => {
        console.error('Error playing cry sound:', error)
      })
    }
  }

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div
        className='modal-content text-white'
        onClick={(e) => e.stopPropagation()}
      >
        <span className='close-button text-3xl' onClick={onClose}>
          &times;
        </span>
        <div className='pokemon-name'>{name.toUpperCase()}</div>
        <img className='pokemon-image' src={image} alt={name} />
        <div className='pokemon-types'>
          <p>
            Types: {pokemonTypes.length > 0 ? pokemonTypes.join(', ') : 'None'}
          </p>
        </div>
        <div className='flavortext'>
          <p>{flavorText}</p>
        </div>
        <button className='cry-button flex' onClick={playCry}>
          <img
            src='/assets/logo/cry.png'
            alt='cry icon'
            className=' h-8 w-[2rem]'
          />
          Cry
        </button>
      </div>
    </div>
  )
}

export default PokedexModal

// Laguuage input - "en" for English, "it" for Italian etc.
const getLastFlavorTextEntryByLanguage = (
  flavorTextEntries: FlavorTextEntry[],
  language: string
): string => {
  // Filter out entries that match the specified language
  const filteredFlavorTextEntries = flavorTextEntries.filter(
    (entry) => entry.language.name === language
  )

  // Get the last flavor text entry in the specified language
  const lastFlavorTextEntry = filteredFlavorTextEntries.length
    ? filteredFlavorTextEntries[filteredFlavorTextEntries.length - 1]
        .flavor_text
    : ''

  return lastFlavorTextEntry
}
