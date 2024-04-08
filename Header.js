// Header.js

import React from 'react';

function Header() {
  return (
    <header>
      <h1>WealthWave DeFi Platform</h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/portfolio">Portfolio</a></li>
          <li><a href="/trading">Trading</a></li>
          {/* Add more navigation links */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
