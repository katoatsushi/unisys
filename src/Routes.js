/* eslint-disable react/prop-types */
import React , { useEffect } from 'react';
import axios from 'axios'
import { useHistory , BrowserRouter, Route, Switch} from 'react-router-dom';
import { useSnackbar } from 'notistack';
// import './index.css';
// import Root from './components/root';
import Root from './App';
import AllQuestion from './QuestionAll';
// import { useSelector, useDispatch } from 'react-redux';
// import SelectStoreFitness from './components/appointments/select_store_fitness_func';
// import AppointmentNew from './components/appointments/appointment_new_func';

const Routes: React.FC = () => {
//   const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return (
    <BrowserRouter>
    <Switch>

        <Route exact path="/" component={ Root } />
        <Route exact path="/question" component={ AllQuestion } />
    </Switch>
    </BrowserRouter>
  );
};


export default Routes;
