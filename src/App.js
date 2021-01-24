import Routes from "./routes/routes";
import "./i18n";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Routes />
    </SnackbarProvider>
  );
}

export default App;
