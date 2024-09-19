import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { useRoutes } from 'react-router';
import './App.css';
import { useAppDispatch, useAppSelector } from './hooks';
import route from './router';
import { RootState } from './store/store';

function App() {

  const user = useAppSelector((state: RootState) => state.persistedReducer)
  const dispatch = useAppDispatch()
  const content = useRoutes(route(user.isLogedin, user.user?.User_role?.role_type || ""));

  return (
    <>
      <SnackbarProvider>
        <CssBaseline>
          {content}
        </CssBaseline>
      </SnackbarProvider>

    </>
  );
}

export default App;
