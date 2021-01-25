import Routes from "./routes/routes";
import "./i18n";
import { SnackbarProvider } from "notistack";
import { FormProvider, ModalProvider } from "./providers";

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <FormProvider>
        <ModalProvider>
          <Routes />
        </ModalProvider>
      </FormProvider>
    </SnackbarProvider>
  );
}

export default App;
