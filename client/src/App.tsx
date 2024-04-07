import React from 'react';
import './App.css';
import { useRoutes } from 'react-router';
import { CssBaseline } from '@mui/material';
import route from './router';
import { useAppSelector } from './hooks';
import { RootState } from './store/store';

function App() {
  const user = useAppSelector((state: RootState) => state.persistedReducer)
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
