'use client'
import React, { useState, useEffect } from 'react'

interface PokemonFusionProps {
  pokemon: string
  onButtonTextChange: (buttonText: string) => void
}

const PokemonFusion: React.FC<PokemonFusionProps> = ({
  pokemon,
  onButtonTextChange,
}) => {
  const [svgParts, setSvgParts] = useState<string[]>([])
  const [count, setCount] = useState<number>(0)
  const [buttonText, setButtonText] = useState<string>(`Let's Play`)

  useEffect(() => {
    const fetchPokemonSVG = async () => {
      const response = await fetch(pokemon)
      const svgText = await response.text()

      // Split the SVG into ten parts 10 point system
      const partSize = svgText.length / 5
      const parts = Array.from({ length: 5 }, (_, index) =>
        svgText.slice(index * partSize, (index + count) * partSize)
      )

      setSvgParts(parts)
    }
    fetchPokemonSVG()
  }, [pokemon, count])

  const handleClick = () => {
    setButtonText(`Next Hint`)
    if (count < 5) {
      setCount((prevCount) => prevCount + 1)
    }
    onButtonTextChange(buttonText)
  }
  return (
    <>
      <div className='flex py-3 flex-wrap flex-between'>
        {svgParts.slice(0, 1).map((part, index) => (
          <div key={index} dangerouslySetInnerHTML={{ __html: part }} />
        ))}
      </div>
      <div className='flex-col justify-end mt-[50px]'>
        <button
          onClick={handleClick}
          className='border border-gray-500 hover:border-gray-700 px-4 py-2 rounded-lg text-gray-700 hover:text-gray-900 '
        >
          {buttonText}
        </button>
      </div>
    </>
  )
}

export default PokemonFusion
