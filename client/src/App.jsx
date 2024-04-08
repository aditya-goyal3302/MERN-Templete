import React from 'react';
import './App.css';
import { useRoutes } from 'react-router';
import { CssBaseline } from '@mui/material';
import route from './router';
import { useSelector } from 'react-redux';


function App() {
  const user = useSelector((state) => state.persistedReducer)
  const content = useRoutes(route(user.isLogedin, user.user.role))
  return (
    <>
      <CssBaseline>
        {content}
      </CssBaseline>
    </>
  );
}

export default App;
