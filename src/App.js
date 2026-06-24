import { useState } from "react";
import "./App.css";
import MenuSection from "./components/MenuSection";
import menuData from "./data/menuData";

function App() {

  const [searchTerm, setSearchTerm] = useState("");

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

  const noResults =
    searchTerm &&
    Object.values(filteredMenu)
      .flat()
      .length === 0;

  return (
    <div className="container">

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
            onChange={(e) => setSearchTerm(e.target.value)}
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
                .replace(/^./, str => str.toUpperCase())}
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
                    .replace(/^./, str => str.toUpperCase())
                }
                items={filteredMenu[category]}
              />

            </section>

          );

        })}

        {noResults && (

          <div className="no-results">
            Item Not Available
          </div>

        )}

        <div className="info-box">

          <h4>Opening Hours</h4>

          <p>Monday - Sunday</p>
          <p>10:00 AM - 11:00 PM</p>

        </div>

        <div className="info-box">

          <h4>Contact</h4>

          <p>Connaught Place, New Delhi</p>
          <p>+91 9876543210</p>

        </div>

        <footer className="footer">

          <p>Crispy Spuds Restaurant</p>

          <p>Serving Quality Food Since 2024</p>

        </footer>

      </div>

    </div>
  );
}

export default App;