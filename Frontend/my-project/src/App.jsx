import React from 'react';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import UserTable from './Components/UserTable';

function App() {
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <UserTable />
    </div>
  );
}

export default App;