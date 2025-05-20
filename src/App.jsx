import { useReducer, useState } from "react";
import { MovieContext, ThemeContext } from "./context";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import Page from "./Page";
import { CartReducer, initialState } from "./reducers/CartReducers";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const [state, dispatch] = useReducer(CartReducer, initialState);

  return (
    <>
      <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
        <MovieContext.Provider value={{ state, dispatch }}>
          <Page />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            draggable
            pauseOnHover
            theme="light"
          />
        </MovieContext.Provider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
