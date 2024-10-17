// Cart.js
import CartItem from "./CartItem";
import "./cart.css";

const Cart = () => {
  const cartItems = [
    {
      imageUrl: "https://i.imgur.com/1GrakTl.jpg",
      name: "Shirt",
      description: "Cotton T-shirt",
      price: "€44.00",
    },
    {
      imageUrl: "https://i.imgur.com/ba3tvGm.jpg",
      name: "Shirt",
      description: "Cotton T-shirt",
      price: "€44.00",
    },
    {
      imageUrl: "https://i.imgur.com/pHQ3xT3.jpg",
      name: "Shirt",
      description: "Cotton T-shirt",
      price: "€44.00",
    },
  ];

  return (
    <div className="col-md-8 cart">
      <div className="title">
        <div className="row flex justify-between">
          <div className="col align-self-center text-muted ">
            Phiếu mua hàng
          </div>
          <div className="col align-self-center text-right text-muted">
            {cartItems.length} items
          </div>
        </div>
      </div>
      {cartItems.map((item, index) => (
        <CartItem
          key={index}
          imageUrl={item.imageUrl}
          name={item.name}
          description={item.description}
          price={item.price}
        />
      ))}
      <div className="back-to-shop">
        <a href="#">
          &leftarrow; <span className="text-muted">Back to shop</span>
        </a>
      </div>
    </div>
  );
};

export default Cart;
