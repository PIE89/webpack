import { useState } from "react";
import * as classes from "./App.module.scss";
import { Link, Outlet } from "react-router-dom";
import { About } from "@/pages/About";

const App = () => {
  const [count, setCount] = useState<number>(0);

  function ToDo() {
    Todo2();
  }

  function Todo2() {
    throw new Error();
  }

  const increase = () => {
    ToDo();
    // setCount((count) => count + 1);
  };

  const decrease = () => {
    setCount((count) => count - 1);
  };

  return (
    <>
      <Link to="./about">О нас</Link>
      <br />
      <br />
      <Link to="./shop">В магазин</Link>

      <br />
      <br />
      <h1 data-test={"Header.testId"}>Platform={__PLATFORM__}</h1>
      <br />
      <br />
      <h1 className={classes.value}>{count}</h1>
      <button
        className={classes.button}
        onClick={() => {
          decrease();
        }}
      >
        Уменьшение
      </button>
      <button
        className={classes.button}
        onClick={() => {
          increase();
        }}
      >
        Увеличение
      </button>

      <About />
    </>
  );
};

export default App;
