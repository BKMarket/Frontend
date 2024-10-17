// Card.js
import CartList from "./CartList";
import Summary from "./Summary";
import "./cart.css";

function Card() {
  return (
    <div className="card-container">
      <div className="card">
        <div className="row flex">
          <CartList />
          <Summary />
        </div>
      </div>
    </div>
  );
}

export default Card;
