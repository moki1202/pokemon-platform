import React from 'react'

interface CardProps {
  imageUrl: string
  heading: string
  content: string
}

const ContentCard: React.FC<CardProps> = ({ imageUrl, heading, content }) => {
  return (
    <div className='max-w-sm rounded overflow-hidden shadow-lg'>
      <img src={imageUrl} alt='Card' className='w-full' />
      <div className='px-6 py-4'>
        <div className='font-bold text-xl mb-2'>{heading}</div>
        <p className='text-gray-700 text-base'>{content}</p>
      </div>
    </div>
  )
}

export default ContentCard
