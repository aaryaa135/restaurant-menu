function MenuItem({ item, addToCart }) {
  return (
    <div
      className="item"
      id={item.name.replace(/\s+/g, "-")}
    >

      <div className="item-left">

        <h4>{item.name}</h4>

        <p>{item.desc}</p>

      </div>

      <div className="item-right">

        <span className="price">
          ₹{item.price}
        </span>

        <button
          className="add-btn"
          onClick={() => addToCart(item)}
        >
          Add
        </button>

      </div>

    </div>
  );
}

export default MenuItem;