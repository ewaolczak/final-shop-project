import { Routes, Route } from 'react-router-dom';
import Main from './components/layout/Main/Main';
import Home from './components/pages/Home/Home';
import SingleProductPage from './components/pages/SingleProductPage/SingleProductPage';
import NotFound from './components/pages/NotFound/NotFound';
import Cart from './components/pages/CartPage/CartPage';
import Summary from './components/pages/SummaryPage/SummaryPage';
import Container from 'react-bootstrap/Container';

function App() {
  return (
    <Container>
      <Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/product/:id" element={<SingleProductPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Main>
    </Container>
  );
}

export default App;
