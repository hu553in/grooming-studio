import './fonts.css';
import './global.css';

import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { MetrikaProvider } from '@/components/MetrikaProvider';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';

const App = () => (
  <MetrikaProvider counterId={104126668}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </MetrikaProvider>
);

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element was not found');
}

createRoot(rootElement).render(<App />);

export default App;
