/* eslint-disable react/prop-types */
import React , { useEffect } from 'react';
import axios from 'axios'
import { useHistory , BrowserRouter, Route, Switch} from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Root from './App';
import AskDe　from './askFixedQ';
import AllQuestion from './QuestionAll';

const Routes: React.FC = () => {

  return (
    <BrowserRouter>
    <Switch>

        <Route exact path="/" component={ Root } />
        <Route exact path="/question" component={ AllQuestion } />
        <Route exact path="/ask/question" component={ AskDe } />
    </Switch>
    </BrowserRouter>
  );
};


export default Routes;
