import MenuItem from "./MenuItem";

function MenuSection({ title, items }) {
  return (
    <div className="section">

      <h3 className="section-title">
        {title}
      </h3>

      {items.map((item, index) => (
        <MenuItem
          key={index}
          item={item}
        />
      ))}

    </div>
  );
}

export default MenuSection;