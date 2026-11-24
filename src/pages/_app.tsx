import "../styles/globals.css";
import "../styles/colors.css";
import { CategoryProvider } from "../contexts/CategoryContext";

function MyApp({ Component, pageProps }) {
  return (
    <CategoryProvider>
      <Component {...pageProps} />
    </CategoryProvider>
  );
}    

export default MyApp;
