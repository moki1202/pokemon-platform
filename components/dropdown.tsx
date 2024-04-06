import React from 'react'

export interface Option {
  label: string
  route: string
}

interface DropdownMenuProps {
  options: Option[]
  onSelect: (route: string) => void
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ options, onSelect }) => {
  return (
    <div className='absolute text-base z-50 mt-2 w-32 rounded-md shadow-md bg-white'>
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onSelect(option.route)}
          className='block w-full px-4 py-2 font-bold text-black hover:bg-gray-200 rounded-md'
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default DropdownMenu
