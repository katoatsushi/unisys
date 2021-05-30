import React, { useEffect, useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
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
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
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

export default　function AskDe() {
  const classes = useStyles();
  const [data, setData] = React.useState('');
  const [a, setA] = React.useState(false);
  const [b, setB] = React.useState(false);
  const [c, setC] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [fullfill, setFullfill] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  function handleTextChange(e){
    setData(e.target.value);
    setFullfill(true)
  }
  function handleChangeA(e){
      console.log({e})
      setA(e.target.value);
  }
  function handleChangeB(e){
      console.log({e})
      setB(e.target.value);
  }
  function handleChangeC(e){
      console.log({e})
      setC(e.target.value);
  }
  function submit(){
    if (!loading) {
      setSuccess(false);
      setLoading(true);
    }
    // const url = `http://localhost:3000/hello-world`
    const url = 'https://first-project-9474-dev.twil.io/defalut_question'

    setFullfill(false)
    axios.post( url,

        {
            "app": 6,
            "record":{
                "aImpressions":{
                    "value": data
                },
                "attend":{
                    "value": a
                },
                "dom": {
                    "value": b
                },
                "attend_for_new_comer": {
                    "value": c
                }
            }
        }
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
         アンケートに答えてください

          <Paper className={classes.paper}>

            <FormLabel component="legend">内定式に出席しましたか？</FormLabel>
            <RadioGroup aria-label="gender" name="gender1" value={a} onChange={handleChangeA}>
                <FormControlLabel value="1" control={<Radio />} label="はい" />
                <FormControlLabel value="0" control={<Radio />} label="いいえ" />
            </RadioGroup>

            <TextField
              id="outlined-multiline-static"
              label="内定式の感想を教えてください"
              style={{width: '100%'}}
              multiline
              onChange={handleTextChange}
              rows={9}
              variant="outlined"
            />
            <br/>
            <FormLabel component="legend">独身寮への入力を希望しますか？</FormLabel>
            <RadioGroup aria-label="gender" name="gender1" value={b} onChange={handleChangeB}>
                <FormControlLabel value="1" control={<Radio />} label="はい" />
                <FormControlLabel value="0" control={<Radio />} label="いいえ" />
            </RadioGroup>

            <FormLabel component="legend">新人研修座談会への出席について回答ください</FormLabel>
            <RadioGroup aria-label="gender" name="gender1" value={c} onChange={handleChangeC}>
                <FormControlLabel value="1" control={<Radio />} label="はい" />
                <FormControlLabel value="0" control={<Radio />} label="いいえ" />
            </RadioGroup>

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

