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
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSnackbar } from 'notistack';
import AllQuestion from './QuestionAll'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: '#4DA7F0',
    '&:hover': {
      backgroundColor: '#4DA7F0',
    },
  },
  submitButtonSuccess: {
    backgroundColor: 'silver',
    '&:hover': {
      backgroundColor: 'silver',
    },
  },
  fabProgress: {
    color: '#4DA7F0',
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: '#4DA7F0',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function App() {
  const classes = useStyles();
  const [q, setQ] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [fullfill, setFullfill] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  function handleTextChange(e){
    setQ(e.target.value);
    setFullfill(true)
  }

  function submit(){
    if (!loading) {
      setSuccess(false);
      setLoading(true);
    }
    // const url = `http://localhost:3000/hello-world`
    const url = 'https://first-project-9474-dev.twil.io/hello-world'
    setFullfill(false)
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
      setSuccess(true);
      setLoading(false);
      var message = "質問を登録しました"
      enqueueSnackbar(message, { 
          variant: 'success',
      });
    }).catch(function (response) { 
      console.log(response)
      var message = "エラーがおきました"
      enqueueSnackbar(message, { 
          variant: 'error',
      });
    })
  }

  return (<>
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            UNISYS
          </Typography>
          <Button variant="contained" color="secondary" style={{marginLeft: 'auto'}} href={`/question`} >
            全ての質問項目へ
          </Button>
        </Toolbar>
      </AppBar>
    </div>

    <div className={classes.root}>
      <Grid container spacing={3} style={{marginTop: 50}}>
        <Grid item xs={3}/>
        <Grid item xs={12} sm={6}>
         質問したい内容をお送りしてください
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
          <div className={classes.wrapper}>
            <Button variant="contained" color="primary" disabled={!fullfill} onClick={submit} style={{width: '100%'}}>
              アンケートを送信する
            </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
        </Grid>
        <Grid item xs={3}/>
      </Grid>
    </div>
  </>);
}

export default App;