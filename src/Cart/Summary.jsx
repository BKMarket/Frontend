import "./cart.css";

function Summary() {
  return (
    <div className="cart-list-col-md-4 summary">
      <h5 className=".h5">
        <b>Summary</b>
      </h5>
      <hr className=".hr" />
      <div className="row">
        <div className="col" style={{ paddingLeft: 0 }}>
          ITEMS 3
        </div>
        <div className="col text-right">€132.00</div>
      </div>
      <form>
        <p>Hình thức vận chuyển</p>
        <select className="select">
          <option className="text-muted">Standard-Delivery- €5.00</option>
          <option className="text-muted">Fast-Delivery- €15.00</option>
        </select>
        <p>Mã giảm giá</p>
        <input id="code" placeholder="Enter your code" className="input-code" />
        <p>Địa chỉ</p>
        <input
          id="add"
          placeholder="Nhập địa chỉ của bạn"
          className="input-code"
        />
        <p>Số điện thoại nhận hàng</p>
        <input
          id="Num"
          placeholder="Nhập số điện thoại của bạn"
          className="input-code"
        />
      </form>
      <div className="row total">
        <div className="col">TOTAL PRICE</div>
        <div className="col text-right">€137.00</div>
      </div>
      <button className="btn">XÁC NHẬN ĐẶT HÀNG</button>
    </div>
  );
}

export default Summary;
