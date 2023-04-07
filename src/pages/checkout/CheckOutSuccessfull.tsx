import React from 'react'
import { Link } from 'react-router-dom'

const CheckOutSuccessfull = () => {
  return (
    <section>
      <div className='container'>
        <h2>Checkout Successful</h2>
        <p>Thank you for your purchase</p>
        <br />
        <Link to='/order-history'>
          <button className='--btn --btn-primary'> View Order Status</button>
        </Link>
      </div>
    </section>
  )
}

export default CheckOutSuccessfull