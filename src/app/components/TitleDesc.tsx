import React from 'react'

interface TitleDesc {
  title: string
  description: string
}

const TitleDesc: React.FC<TitleDesc> = ({ title, description }) => {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray mb-3">
        {title}
      </h1>
      <p className="text-gray mb-6 font-normal text-xs md:text-sm">
        {description}
      </p>
    </div>
  )
}

export default TitleDesc
