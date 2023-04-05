import { Provider } from "react-redux";
import "./App.css";
import RouterList from "./router";
import store from "./store/configStore";
import "react-tooltip/dist/react-tooltip.css";

function App() {
 
  return (
    <Provider store={store}>
      <div>
        <RouterList />
      </div>
    </Provider>
  );
}

export default App;
