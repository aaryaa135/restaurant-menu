import { useState } from "react";
import "./App.css";
import MenuSection from "./components/MenuSection";
import menuData from "./data/menuData";

function App() {

  const [searchTerm, setSearchTerm] = useState("");

  const categories = Object.keys(menuData);

  const allItems = Object.values(menuData).flat();

  const matchedCategories =
    searchTerm.toLowerCase() === "all"
      ? categories
      : categories.filter(category =>
          category
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );

  const matchedItems =
    searchTerm.toLowerCase() === "all"
      ? allItems
      : allItems.filter(item =>
          item.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );

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

        {searchTerm && (

          <div className="search-results">

            {matchedCategories.length > 0 && (

              <div className="category-results">

                <h4>Categories</h4>

                {matchedCategories.map(category => (

                  <div
                    key={category}
                    className="category-result"
                    onClick={() => {

                      const element =
                        document.getElementById(category);

                      if (element) {
                        element.scrollIntoView({
                          behavior: "smooth",
                          block: "start"
                        });
                      }

                    }}
                  >
                    {category
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, str => str.toUpperCase())}
                  </div>

                ))}

              </div>

            )}

            {matchedItems.length > 0 && (

              <div className="item-results">

                <h4>Items</h4>

                {matchedItems.map(item => (

                  <div
                    key={item.name}
                    className="item-result"
                    onClick={() => {

                      const element =
                        document.getElementById(
                          item.name.replace(/\s+/g, "-")
                        );

                      if (element) {
                        element.scrollIntoView({
                          behavior: "smooth",
                          block: "center"
                        });
                      }

                    }}
                  >
                    {item.name}
                  </div>

                ))}

              </div>

            )}

            {matchedCategories.length === 0 &&
             matchedItems.length === 0 && (

              <div className="no-results">
                Item Not Available
              </div>

            )}

          </div>

        )}

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

        {categories.map(category => (

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
              items={menuData[category]}
            />

          </section>

        ))}

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

      <div className="image-section">

        <img
          src="https://images.unsplash.com/photo-1576107232684-1279f390859f"
          alt="Fries"
        />

      </div>

    </div>
  );
}

export default App;