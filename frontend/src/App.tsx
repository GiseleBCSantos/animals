import { ToastContainer } from "react-toastify";
import { ParallaxProviderWrapper } from "@/components/providers/parallax-provider";
import { QueryProvider } from "@/lib/providers/query-provider";
import "react-toastify/dist/ReactToastify.css";
import { AppRouter } from "./router";

function App() {
  return (
    <QueryProvider>
      <ParallaxProviderWrapper>
        <AppRouter />
      </ParallaxProviderWrapper>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </QueryProvider>
  );
}

export default App;
