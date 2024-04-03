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
    <div className='absolute bg-gray-800 text-base z-50 mt-2 w-32 rounded-xl shadow-md '>
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onSelect(option.route)}
          className='block w-full px-4 py-2 dropdown-items font-bold text-black bg-opacity-25'
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default DropdownMenu
