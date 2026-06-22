function MenuItem({ item }) {
  return (
    <div
      className="item"
      id={item.name.replace(/\s+/g, "-")}
    >
      <div className="item-left">
        <h4>{item.name}</h4>
        <p>{item.desc}</p>
      </div>

      <span className="price">
        ₹{item.price}
      </span>
    </div>
  );
}

export default MenuItem;