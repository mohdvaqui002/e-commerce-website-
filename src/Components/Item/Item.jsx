import React from 'react'
import "./Item.css"
import { Link } from 'react-router-dom'

const Item = (props) => {
  // Generate random ratings and review counts for authentic Meesho look
  const randomRating = (3.5 + Math.random() * 1.3).toFixed(1);
  const randomReviews = Math.floor(20 + Math.random() * 200);
  const discountPercentage = Math.round(((props.old_price - props.new_price) / props.old_price) * 100) || 15;

  return (
    <div className='item'>
        <Link to={`/product/${props.id}`}>
          <img onClick={() => window.scrollTo(0, 0)} src={props.image} alt={props.name} />
        </Link>
        
        <div className="item-details">
            <p className="item-name">{props.name}</p>
            
            <div className='item-prices'>
                <span className="item-price-new">${props.new_price}</span>
                <span className="item-price-old">${props.old_price}</span>
                <span className="item-discount">{discountPercentage}% off</span>
            </div>

            {/* Meesho Style first order discount offer */}
            <div className="item-first-order-offer">
                <span>⚡ $2 discount on first order</span>
            </div>

            {/* Meesho Style Rating and Free Delivery Badges */}
            <div className="item-badges-row">
                <div className="item-rating-badge">
                    <span>{randomRating} ★</span>
                </div>
                <span className="item-reviews-count">{randomReviews} Reviews</span>
            </div>

            <div className="item-delivery-badge">
                <span>Free Delivery</span>
            </div>
        </div>
    </div>
  )
}

export default Item