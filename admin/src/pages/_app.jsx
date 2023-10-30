import "../styles/globals.scss";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { SSRProvider } from "react-bootstrap";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import { Provider } from "react-redux";
import { store } from "../../reduxStore/store";
import Toast from "../components/Toast/Toast";

config.autoAddCss = false;

function MyApp({ Component, pageProps }) {


  return (
    <Provider store={store}>
      <SSRProvider>
        <ProgressBar />
        <Component {...pageProps} />
        <Toast />
      </SSRProvider>
    </Provider>
  );
}

export default MyApp;
