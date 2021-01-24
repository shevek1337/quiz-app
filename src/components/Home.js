import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Home = (props) => {
  const history = useHistory();
  const [categoriesList, setCategoriesList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("https://opentdb.com/api_category.php").then((res) => {
      setCategoriesList(res.data["trivia_categories"]);
      setLoading(true);
    });
  }, []);

  // parameters for quiz page
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("Any");
  const [difficulty, setDifficulty] = useState("");

  const handleChange = (e) => {
    const { options, selectedIndex, value } = e.target;
    const selectedId = value;
    const selectedCategoryName = options[selectedIndex].innerHTML;
    setCategoryId(selectedId);
    setCategoryName(selectedCategoryName);
  };

  return (
    <>
      {loading ? (
        <div className="home">
          <div className="quote">
            <h1>“As for me, all I know is that I know nothing.”</h1>
            <h2>- Socrates</h2>
          </div>
          <div className="select">
            <div className="select-option">
              <label htmlFor="category">Select Category:</label>
              <select name={categoryName} id="category" onChange={handleChange}>
                <option value="0">Any Category</option>
                {categoriesList.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                    name={category.name}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="select-option">
              <label htmlFor="difficulty">Select Difficulty:</label>
              <select
                name="difficulty"
                id="difficulty"
                onChange={(e) => {
                  const selectedCategory = e.target.value;
                  setDifficulty(selectedCategory);
                }}
              >
                <option value="any">Any Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <button
              className="play"
              onClick={() =>
                history.push({
                  pathname: `/quiz`,
                  state: {
                    categoryName: categoryName,
                    categoryId: categoryId,
                    difficulty: difficulty,
                  },
                })
              }
            >
              Play
            </button>
          </div>
        </div>
      ) : (
        "LOADING..."
      )}
    </>
  );
};

export default Home;
