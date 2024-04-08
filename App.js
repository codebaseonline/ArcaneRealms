// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import PortfolioPage from './pages/PortfolioPage';
import TradingPage from './pages/TradingPage';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/portfolio" component={PortfolioPage} />
          <Route path="/trading" component={TradingPage} />
          {/* Add more routes for other pages */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;

