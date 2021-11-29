import { StrictMode, useState } from "react";
import ReactDOM  from "react-dom";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Calculator from "./Calculator";
import ThemeContext from './ThemeContext';
import ThemeSelector from "./ThemeSelector";

// const App = () => {
//   return React.createElement("div", {}, [
//     React.createElement("h1", { id: "my-brand" }, "Adopt Me!"),
//     React.createElement(Pet, {
//       name: "Luke",
//       animal: "Cat",
//       breed: "Domestic Md",
//     }),
//     React.createElement(Pet, {
//       name: "Rascal",
//       animal: "Dog",
//       breed: "Beagle",
//     }),
//     React.createElement(Pet, {
//       name: "Mocha",
//       animal: "Cat",
//       breed: "Domestic Short",
//     }),
//   ]);
// };

const App = () => {
  const theme = useState("lean")
  return(
    <ThemeContext.Provider value={theme}>
      <div>
        <Router>
          <Switch>
            <Route path = "/">
              <ThemeSelector/>
              <Calculator/>
            </Route>
          </Switch>
        </Router>
      </div>
      </ThemeContext.Provider>
  )
}

// ReactDOM.render(React.createElement(App), document.getElementById("root"));
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>, document.getElementById("root"));
