import { useEffect } from "react";
import "./App.scss";
import Home from "./Home";
import { useAppDispatch, useAppSelector } from "./hooks";
import { getMessages, getSendedMessages, setUsername } from "./store/reducer";

function App() {
  const { isAuth, username } = useAppSelector((state) => state.app);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!isAuth) {
      const username = prompt("Введите никнейм");
      dispatch(setUsername(username));
    }
  }, []);
  useEffect(() => {
    if (isAuth) {
      setInterval(() => {
        dispatch(getSendedMessages(username));
        dispatch(getMessages(username));
      }, 5000);
    }
  }, [username]);

  return isAuth ? (
    <div className="App">
      <Home />
    </div>
  ) : (
    <div>Введите никнейм чтоб посмотреть свои сообщения</div>
  );
}

export default App;
