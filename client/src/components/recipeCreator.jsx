import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom"; //redirige a la ruta que yo le indique (useHistory)
import { postRecipe, getDiets } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "The name of the recipe is required";
  } else if (!input.diets) {
    errors.diets = "You must mark at least one diet";
  }

  return errors;
}

export default function RecipeCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const diets = useSelector((state) => state.diets);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    summary: "",
    healthScore: 0,
    image: "",
    steps: "",
    diets: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleCheck(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        status: e.target.value,
      });
    }
  }

  function handleBox(e) {
    setInput({
      ...input,
      diets: [...input.diets, e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    dispatch(postRecipe(input));
    alert("Recipe Created!"); //No me gusta, modificar si hay tiempo
    setInput({
      name: "",
      summary: "",
      healthScore: 0,
      image: "",
      steps: "",
      diets: [],
    });
    history.push("/home");
  }

  useEffect(() => {
    dispatch(getDiets());
  }, []);
  return (
    <div>
      <Link to="/home">
        <button>Back</button>
      </Link>
      <h1>Create your recipe</h1>
      <form>
        <div>
          <label>Recipe Name:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <label>Summary:</label>
          <input
            type="text"
            value={input.summary}
            name="summary"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Health Score:</label>
          <input
            type="number"
            value={input.healthScore}
            name="healthScore"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>image:</label>
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Steps:</label>
          <input
            type="text"
            value={input.steps}
            name="steps"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Diets:</label>
          <label>
            {" "}
            Gluten Free
            <input
              type="checkbox"
              name="gluten free"
              value="gluten free"
              onChange={(e) => handleCheck(e)}
            />
          </label>
          <label>
            {" "}
            Dairy Free
            <input
              type="checkbox"
              name="dairy free"
              value="dairy free"
              onChange={(e) => handleCheck(e)}
            />
          </label>
          <label>
            {" "}
            Lacto Ovo Venetarian
            <input
              type="checkbox"
              name="lacto ovo vegetarian"
              value="lacto ovo vegetarian"
              onChange={(e) => handleCheck(e)}
            />
          </label>
          <label>
            {" "}
            Primal
            <input
              type="checkbox"
              name="primal"
              value="primal"
              onChange={(e) => handleCheck(e)}
            />
          </label>
          <label>
            {" "}
            Whole 30
            <input
              type="checkbox"
              name="whole 30"
              value="whole 30"
              onChange={(e) => handleCheck(e)}
            />
          </label>
          <label>
            {" "}
            Pescatarian
            <input
              type="checkbox"
              name="pescatarian"
              value="pescatarian"
              onChange={(e) => handleCheck(e)}
            />
          </label>
          <label>
            {" "}
            Fodmap Friendly
            <input
              type="checkbox"
              name="fodmap friendly"
              value="fodmap friendly"
              onChange={(e) => handleCheck(e)}
            />
          </label>
          <label>
            {" "}
            Vegan
            <input
              type="checkbox"
              name="vegan"
              value="vegan"
              onChange={(e) => handleCheck(e)}
            />
          </label>
          <label>
            {" "}
            Paleolithic
            <input
              type="checkbox"
              name="paleolithic"
              value="paleolithic"
              onChange={(e) => handleCheck(e)}
            />
          </label>
          <label>
            {" "}
            Ketogenic
            <input
              type="checkbox"
              name="ketogenic"
              value="ketogenic"
              onChange={(e) => handleCheck(e)}
            />
          </label>
          <ul>
            <li>{input.diets.map((el) => el + " ,")}</li>
          </ul>
        </div>
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
}

// "gluten free" "dairy free" "lacto ovo vegetarian""primal""whole 30""pescatarian""fodmap friendly""vegan""paleolithic""ketogenic"
