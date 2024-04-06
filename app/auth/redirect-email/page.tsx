import ContentCard from '@/components/content-card'
import React from 'react'

const RedirectEmail: React.FC = () => {
  const heading = 'Email Verification'
  const content = 'Please check your email and verify to login'
  return (
    <>
      <div className='flex justify-center items-center'>
        <ContentCard
          imageUrl='/assets/logo/pikachu_icon.svg'
          heading={heading}
          content={content}
        />
      </div>
    </>
  )
}

export default RedirectEmail
