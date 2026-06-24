import { useState, useEffect } from "react";
import "./App.css";
import MenuSection from "./components/MenuSection";
import menuData from "./data/menuData";

function App() {

  const [searchTerm, setSearchTerm] = useState("");

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [tableNumber, setTableNumber] = useState("");

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const categories = Object.keys(menuData);

  const filteredMenu = {};

  categories.forEach(category => {

    filteredMenu[category] =

      searchTerm.toLowerCase() === "all" ||
      searchTerm === ""

        ? menuData[category]

        : category
            .toLowerCase()
            .includes(searchTerm.toLowerCase())

          ? menuData[category]

          : menuData[category].filter(item =>
              item.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            );

  });

  const addToCart = (item) => {

    const existing = cart.find(
      cartItem => cartItem.name === item.name
    );

    if (existing) {

      setCart(
        cart.map(cartItem =>
          cartItem.name === item.name
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1
              }
            : cartItem
        )
      );

    } else {

      setCart([
        ...cart,
        {
          ...item,
          quantity: 1
        }
      ]);

    }

  };

  const increaseQty = (name) => {

    setCart(
      cart.map(item =>
        item.name === name
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      )
    );

  };

  const decreaseQty = (name) => {

    setCart(
      cart
        .map(item =>
          item.name === name
            ? {
                ...item,
                quantity: item.quantity - 1
              }
            : item
        )
        .filter(item => item.quantity > 0)
    );

  };

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const gst = Math.round(subtotal * 0.05);

  const total = subtotal + gst;

  const noResults =
    searchTerm &&
    Object.values(filteredMenu)
      .flat()
      .length === 0;

  const placeOrder = () => {

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    if (!tableNumber) {
      alert("Enter table number");
      return;
    }

    alert(
      `Order Placed Successfully for Table ${tableNumber}`
    );

    setCart([]);
    localStorage.removeItem("cart");

  };

  return (
    <div className="container">

      <div className="menu-content">

        <div className="menu-section">

          <h1>Crispy Spuds</h1>

          <h2>RESTAURANT</h2>

          <div className="divider">
            ● ● ●
          </div>

          <p className="tagline">
            Freshly Prepared • Served Daily
          </p>

          <div className="search-container">

            <input
              type="text"
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />

          </div>

          <div className="menu-nav">

            {categories.map(category => (

              <a
                key={category}
                href={`#${category}`}
              >
                {category
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, str =>
                    str.toUpperCase()
                  )}
              </a>

            ))}

          </div>

          {categories.map(category => {

            if (
              searchTerm &&
              filteredMenu[category].length === 0
            ) {
              return null;
            }

            return (

              <section
                key={category}
                id={category}
              >

                <MenuSection
                  title={
                    category
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, str =>
                        str.toUpperCase()
                      )
                  }
                  items={filteredMenu[category]}
                  addToCart={addToCart}
                />

              </section>

            );

          })}

          {noResults && (

            <div className="no-results">
              Item Not Available
            </div>

          )}

        </div>

      </div>

      <div className="cart-panel">

        <h3>
          Cart ({cart.length})
        </h3>

        {cart.map(item => (

          <div
            key={item.name}
            className="cart-item"
          >

            <div>

              <strong>
                {item.name}
              </strong>

              <p>
                ₹{item.price}
              </p>

            </div>

            <div className="qty-controls">

              <button
                onClick={() =>
                  decreaseQty(item.name)
                }
              >
                -
              </button>

              <span>
                {item.quantity}
              </span>

              <button
                onClick={() =>
                  increaseQty(item.name)
                }
              >
                +
              </button>

            </div>

          </div>

        ))}

        <div className="bill">

          <p>
            Subtotal:
            ₹{subtotal}
          </p>

          <p>
            GST (5%):
            ₹{gst}
          </p>

          <h4>
            Total:
            ₹{total}
          </h4>

        </div>

        <input
          type="number"
          placeholder="Table Number"
          value={tableNumber}
          onChange={(e) =>
            setTableNumber(e.target.value)
          }
          className="table-input"
        />

        <button
          className="order-btn"
          onClick={placeOrder}
        >
          Place Order
        </button>

      </div>

    </div>
  );
}

export default App;