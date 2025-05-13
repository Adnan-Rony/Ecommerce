import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { AppRouter } from './routes/AppRouter.jsx'
import "./index.css";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    
<QueryClientProvider client={queryClient}>

<RouterProvider router={AppRouter}/>
<Toaster />
</QueryClientProvider>



  </StrictMode>,
)
