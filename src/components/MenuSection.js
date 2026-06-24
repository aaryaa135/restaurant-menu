import MenuItem from "./MenuItem";

function MenuSection({
  title,
  items,
  addToCart
}) {
  return (
    <div className="section">

      <h3 className="section-title">
        {title}
      </h3>

      {items.map((item, index) => (

        <MenuItem
          key={index}
          item={item}
          addToCart={addToCart}
        />

      ))}

    </div>
  );
}

export default MenuSection;