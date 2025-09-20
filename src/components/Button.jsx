import React, { Children } from 'react'

const Button = ({
    Children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'white',
    className = '',
    ...props //spread-jitni bhi prop di gyi hai wo sab aa jayengi ...props me

}) => {
  return (
    <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
        {Children}
    </button>
  )
}

export default Button