import Routes from "./routes/routes";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Routes />
    </SnackbarProvider>
  );
}

export default App;
