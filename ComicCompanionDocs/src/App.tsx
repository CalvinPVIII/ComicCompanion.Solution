import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import DocsWrapper from "./components/DocsWrapper";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#aa62f9",
    },
    secondary: {
      main: "#ffffff",
    },
    background: {
      default: "#000000",
    },
  },
  typography: {
    fontFamily: "Mulish",
    h1: {
      fontFamily: "Bangers",
    },
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div id="main-content">
          <DocsWrapper />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
