import React, { Children } from 'react'
import './card.scss'

interface ICard {
    children: string;
    cardClass: string;
}

const Card = ({children,cardClass}:ICard) => {
  return (
    <div className={`card ${cardClass}`}>
        {children}
    </div>
  )
}

export default Card