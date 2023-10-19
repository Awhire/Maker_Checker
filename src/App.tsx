import { ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import { StateProvider } from "./context/Context";



import theme from "./theme";
import Routes from "./router/Routes";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <ThemeProvider theme={theme}>
      <StateProvider>
        <Routes />
        <ToastContainer />
      </StateProvider>
    </ThemeProvider>
  );
}

export default App;
