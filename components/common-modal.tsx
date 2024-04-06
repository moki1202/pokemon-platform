import React from 'react'

export interface ProfileOption {
  label: string
  onClick: () => void
}

interface ProfileModalProps {
  isOpen: boolean
  options: ProfileOption[]
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, options }) => {
  if (!isOpen) return null

  return (
    <div className='absolute top-[5rem] right-[3rem] z-50 overflow-y-auto'>
      <div className='bg-white rounded-lg overflow-hidden shadow-xl'>
        <div className='p-4'>
          {options.map((option, index) => (
            <button
              key={index}
              className='block w-full py-2 px-4 text-left text-gray-800 hover:bg-gray-100'
              onClick={option.onClick}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProfileModal
