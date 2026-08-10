import React from 'react'
import "./Hero.css"
import arrow_icon from "../../assets/arrow_icon.png"
import banner_img from "../../assets/exclu.webp" // We can use the existing exclusive image as banner graphic

const Hero = () => {
  return (
    <div className='hero'>
        <div className="hero-left">
            <h1>Lowest Prices <br />Best Quality Shopping</h1>
            
            <div className="hero-features">
                <div className="feature-item">
                    <span className="feature-icon">🚚</span>
                    <span>Free Delivery</span>
                </div>
                <div className="feature-item">
                    <span className="feature-icon">💵</span>
                    <span>Cash on Delivery</span>
                </div>
                <div className="feature-item">
                    <span className="feature-icon">🔄</span>
                    <span>Easy Returns</span>
                </div>
            </div>

            <div className="hero-download-badge">
                <span className="download-icon">📲</span>
                <div>
                    <p className="badge-subtitle">Get 30% Off on 1st Order</p>
                    <p className="badge-title">Download the Shopify App</p>
                </div>
            </div>

            <div className="hero-latest-btn">
                <div>Shop Now</div>
                <img src={arrow_icon} alt="Arrow" height="20px"/>
            </div>
        </div>
        
        <div className="hero-right">
            <img src={banner_img} alt="Meesho Banner Promo" />
        </div>
    </div>
  )
}

export default Hero