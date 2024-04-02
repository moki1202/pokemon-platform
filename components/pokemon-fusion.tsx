'use client'
import React, { useState, useEffect } from 'react'

interface PokemonFusionProps {
  pokemon: string
  totalCount: (newCount: number) => void
}

const PokemonFusion: React.FC<PokemonFusionProps> = ({
  pokemon,
  totalCount,
}) => {
  const [svgParts, setSvgParts] = useState<string[]>([])
  const [count, setCount] = useState<number>(1)

  useEffect(() => {
    const fetchPokemonSVG = async () => {
      const response = await fetch(pokemon)
      const svgText = await response.text()

      // Split the SVG into ten parts 10 point system
      const partSize = svgText.length / 6
      const parts = Array.from({ length: 6 }, (_, index) =>
        svgText.slice(index * partSize, (index + count) * partSize)
      )

      setSvgParts(parts)
    }
    fetchPokemonSVG()
  }, [pokemon, count])

  const handleClick = () => {
    if (count < 6) {
      setCount((prevCount) => {
        const newCount = prevCount + 1
        totalCount(newCount)
        return newCount
      })
    }
  }
  return (
    <>
      <div className='relative top-[2rem] py-3 w-max-[100px] h-max-[100px]'>
        {svgParts.slice(0, 1).map((part, index) => (
          <div key={index} dangerouslySetInnerHTML={{ __html: part }} />
        ))}
      </div>
      <div className='flex-col justify-end mt-[50px]'>
        <button
          onClick={handleClick}
          className='button-color px-4 py-2 rounded-full text-white font-bold w-[130px] '
        >
          Next Hint
        </button>
      </div>
    </>
  )
}

export default PokemonFusion
