import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Users from './components/Users';
import './App.css';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Users />
    </QueryClientProvider>
  );
}

export default App;
