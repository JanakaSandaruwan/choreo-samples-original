// Update import statement
import React from 'react';
import logo from './logo.svg';
import './App.css';
import Component from './Component.tsx'; // Add .tsx extension

// Add missing dependencies in terminal:
// npm install @material-ui/core

function App() {
  return (
    <div className="App">
      <Component />
    </div>
  );
}

export default App;