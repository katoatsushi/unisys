/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import axios from 'axios'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  table: {
    minWidth: 650,
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

export default function AllQuestion(props) {
    const url = `https://first-project-9474-dev.twil.io/set_question`
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [questions, setQuestions] = useState();
    useEffect(()=>{
        if (!loading) {
        setSuccess(false);
        setLoading(true);
        }
        axios.get(url)
        .then(function(res) {
            console.log(res.data)
            setSuccess(true);
            setLoading(false);
            setQuestions(res.data);
        })
        .catch(function(error) {
            console.log({error})
        });
    },[])

    function ShowObj(){
        return(<>

        </>)
    }
    
    return(
        <>
            <div className="App">
            <AppBar position="static">
                <Toolbar>
                <Typography variant="h6">
                    UNISYS
                </Typography>
                <Button variant="contained" color="secondary" style={{marginLeft: 'auto'}} href={`/`} >
                    質問を追加する
                </Button>
                </Toolbar>
            </AppBar>
            </div>
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="right">質問</TableCell>
                    <TableCell align="right">回答</TableCell>
                    <TableCell align="right">作成者</TableCell>
                    <TableCell align="right">更新者</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {questions? (<>
                    {questions.map((row) => (
                        <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                            {row["レコード番号"]["value"]}
                        </TableCell>
                        <TableCell align="right">
                            {row["question"]["value"]}
                        </TableCell>
                        <TableCell align="right">
                            {row["answer"]["value"]}
                        </TableCell>
                        <TableCell align="right">{row["更新者"]["value"]["name"]}</TableCell>
                        <TableCell align="right">{row["作成者"]["value"]["name"]}</TableCell>
                        </TableRow>
                    ))}
                </>):<>{loading && <CircularProgress size={100} className={classes.buttonProgress} />}</>}
                </TableBody>
            </Table>
            </TableContainer>
        </>
    );
}