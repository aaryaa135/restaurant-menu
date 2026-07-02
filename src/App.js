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
  
  const [showBill, setShowBill] = useState(false);

  const [placedOrder, setPlacedOrder] = useState(null);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  

  const [orderHistory, setOrderHistory] = useState(() => {

    const saved = localStorage.getItem("orders");

    return saved ? JSON.parse(saved) : [];

  });
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

      if (existing.quantity >= 10) {
        alert("Maximum 10 quantity allowed for one item.");
        return;
      }

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

    const selectedItem = cart.find(
      item => item.name === name
    );

    if (selectedItem.quantity >= 10) {
      alert("Maximum 10 quantity allowed for one item.");
      return;
    }

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

    const orderId = Date.now();

    setPlacedOrder({

      orderId: orderId,

      date: new Date().toLocaleDateString(),

      time: new Date().toLocaleTimeString(),

      table: tableNumber,

      items: cart,

      subtotal,

      gst,

      total

    });  



const updatedOrders = [

  {

    orderId: orderId,

    date: new Date().toLocaleDateString(),

    time: new Date().toLocaleTimeString(),

    table: tableNumber,

    items: cart,

    subtotal,

    gst,

    total

  },

  ...orderHistory

];

setOrderHistory(updatedOrders);

localStorage.setItem(

  "orders",

  JSON.stringify(updatedOrders)

);
setShowBill(true);

setCart([]);

localStorage.removeItem("cart");

  };

  if (showBill) {

  return (

    <div className="bill-page">

      <h1>Crispy Spuds</h1>

      <h2>Receipt</h2>

      <p
        style={{
          color: "#2e7d32",
          fontWeight: "600",
          textAlign: "center",
          marginBottom: "20px"
        }}
      >
        ✓ Order Placed Successfully
      </p>

      <p><b>Order ID:</b> CS-{String(placedOrder.orderId).slice(-4)}</p>

      <p><b>Date:</b> {placedOrder.date}</p>

      <p><b>Time:</b> {placedOrder.time}</p>

      <p><b>Estimated Preparation Time:</b> 15-20 mins</p>

      <p><b>Table:</b> {placedOrder.table}</p>

      <hr />

      {placedOrder.items.map(item => (

        <div
          key={item.name}
          className="bill-item"
        >

          <span>

            {item.name} × {item.quantity}

          </span>

          <span>

            ₹{item.price * item.quantity}

          </span>

        </div>

      ))}

      <hr />

      <p>

        Subtotal : ₹{placedOrder.subtotal}

      </p>

      <p>

        GST : ₹{placedOrder.gst}

      </p>

      <h3>

        Total : ₹{placedOrder.total}

      </h3>

      <button

        className="order-btn"

        onClick={() => {

          setShowBill(false);

          setPlacedOrder(null);

        }}

      >

        Back To Menu

      </button>

      <hr style={{ marginTop: "25px" }} />

      <p
        style={{
          textAlign: "center",
          color: "#666",
          marginTop: "20px",
          lineHeight: "1.8"
        }}
      >
        Thank you for dining with Crispy Spuds.
        <br />
        We look forward to serving you again.
      </p>

    </div>

  );

}

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

        {cart.length === 0 && (
          <p className="empty-cart">
            Your cart is empty.
            <br />
            Add delicious items to begin your order.
          </p>
        )}

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
          disabled={cart.length === 0}
        >
          Place Order
        </button>

      </div>

    </div>
  );
}

export default App;