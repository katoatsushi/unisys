import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import logo from './logo.svg';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    // padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function App() {
  const classes = useStyles();
  const [q, setQ] = React.useState('');
  const [fullfill, setFullfill] = React.useState(false);

  function handleTextChange(e){
    setQ(e.target.value);
    setFullfill(true)
  }

  function submit(){
    // const url = `http://localhost:3000/hello-world`
    const url = 'https://first-project-9474-dev.twil.io/hello-world'
    axios.post( url,
        {"app": 3,
          "record":{
          "question":{
            "value": q,
          },
          "answer":{
            "value":"未回答"
          }
        }}
    )
    .then(function (response) {
      console.log(response)
    }).catch(function (response) { 
      console.log(response)
    })
  }

  return (<>
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            UNISYS
          </Typography>
        </Toolbar>
      </AppBar>
    </div>

    <div className={classes.root}>
      <Grid container spacing={3} style={{marginTop: 50}}>
        <Grid item xs={3}/>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>

            <TextField
              id="outlined-multiline-static"
              label="何か疑問に思うことがあればお聞きください"
              style={{width: '100%'}}
              multiline
              onChange={handleTextChange}
              rows={9}
              variant="outlined"
            />
          </Paper>
          <Button variant="contained" color="primary" disabled={!fullfill} onClick={submit} style={{width: '100%'}}>
            アンケートを送信する
          </Button>
        </Grid>
        <Grid item xs={3}/>
      </Grid>
    </div>
  </>);
}

export default App;


