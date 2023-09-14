import "./index.module.scss";
import { withProviders } from "./providers";
import { Routing } from "../pages";
import style from "./index.module.scss";

const App = () => {
  return (
    <div className={style.App}>
      <Routing />
    </div>
  );
};

export default withProviders(App);
