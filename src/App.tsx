import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import CurrencyRate from './routes/currency-rate/CurrencyRate'
import CurrencyExchange from './routes/currency-exchange/CurrencyExchange'
import ErrorPage from './routes/error/ErrorPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
      refetchOnWindowFocus: false,
    },
  },
})

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route errorElement={<ErrorPage />}>
        <Route path='/' element={<CurrencyExchange />} />
        <Route path='/rate' element={<CurrencyRate />} />
      </Route>
    )
  )
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
