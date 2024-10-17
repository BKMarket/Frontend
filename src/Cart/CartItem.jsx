// CartItem.js
import "./cart.css";

function CartItem({ imageUrl, name, description, price }) {
  return (
    <div className="cart-item">
      <div className="cart-item-main">
        <div className="cart-item-image">
          <img className="img-fluid" src={imageUrl} alt={name} />
        </div>
        <div className="cart-item-details">
          <div className="cart-item-name text-muted">{name}</div>
          <div className="cart-item-description">{description}</div>
        </div>
        <div className="cart-item-quantity">
          <a href="#">-</a>
          <a href="#" className="border">
            1
          </a>
          <a href="#">+</a>
        </div>
        <div className="cart-item-price">
          {price} <span className="close">&#10005;</span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
