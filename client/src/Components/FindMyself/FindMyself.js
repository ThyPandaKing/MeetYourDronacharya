import { List, ListItem, ListItemText, Grid, Paper, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel, Divider, Pagination, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import "./findMyself.css"
import { questions } from "./FindMyselfQuestion.json";
import React, { useState } from 'react';
import findyourpassion from './findyourpassion.png';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles({
  listitem_findmyself: {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .4)',
    color: 'white',
    height: 48,
    padding: '0 20px',
    margin: '20px 20px',
  },
  list_findmyself: {
    width: '90%',
  },
  paper_findmyself: {
    width: '95%',
    marginBottom: '20px',
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    border: 0,
    borderRadius: 3,
    color: 'white',
  },
  formcontrol_findmyself: {
    width: '90%',
    marginTop: '10px',
  },
  pagination_findmyself: {
    marginTop: '10px',
    paddingBottom: '10px',
    justifyContent:'center',
    display:'flex',
  },
  result_modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    background: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  },
  submitbutton_findmyself: {
    marginBottom: '2%',
    background: 'white',
    color: 'black',
  }
});

const FindMyself = () => {
  const classes = useStyles();
  const [questionSetId, setQuestionSetId] = useState("t0");
  const [resultDisplay, setResultModalOpen] = React.useState(false);
  const resultModalOpen = () => setResultModalOpen(true);
  const resultModalClose = () => setResultModalOpen(false);

  var score = {};
  var careeroptions;
  var result = 0;
  var careerchoice;

  const loadQuestion = (id) => {
    setQuestionSetId(id);
    questions.filter(queid => queid.id === id).map( queset => (
      careeroptions = queset.options[0],
      queset.questionset.map( q => (
        score[q.id] = -1
        // options = Object.keys(queset.options[0]).length,
      ))
    ))
    console.log(careeroptions);
  }

  const optionSelect = (event) => {
    const id = event.target.value
    const quesid = id.substring(0,5);
    const optionid = id.substring(5, id.length);
    switch (optionid) {
      case "option1":
        score[quesid] = 1;
        break;
      case "option2":
        score[quesid] = 2;
        break;
      case "option3":
        score[quesid] = 3;
        break;
      default:
        window.alert("Select every options");
    }
    console.log(careeroptions)
  }

  const resultPreparation = () => {
    if (careeroptions === undefined) careeroptions = {'option1': 'Science', 'option2': 'Commerce', 'option3': 'Arts'};
    for (const [id, option] in score.entries) {
      result += option;
    }
    if (result>25) careerchoice = careeroptions['option1'];
    else if (result>15) careerchoice = careeroptions['option2'];
    else careerchoice = careeroptions['option3'];
    console.log(careerchoice);
    resultModalOpen();
  }

  return (
    <div>
      <h1 className="h1_findmyself">Find My Passion</h1>
      <Grid container>
        {/* Left part: Showing list of topics */}
        <Grid item sm={6}>
          <List className={classes.list_findmyself} component="nav" aria-label="mailbox folders">
            {
              questions.map(m => (
                <ListItem className={classes.listitem_findmyself} button divider onClick = {() => loadQuestion(m.id)}>
                  <ListItemText primary={m.name} />
                </ListItem>
              ))}
          </List>
        </Grid>
        {/* Right Part: showing questions for that list */}
        <Grid item sm={6}>
        {questionSetId !== "t0" ? (
          <Paper className={classes.paper_findmyself} variant="outlined" square elevation={24} >
            <h1><u>Question Set</u></h1>
            <p align='left'>: : : Choose the most suitable options:</p>
            {
              questions.filter(queid => queid.id === questionSetId).map (queset => (
                queset.questionset.map (q => (
                  <FormControl className={classes.formcontrol_findmyself} component="fieldset">
                    <FormLabel component="legend">{q.que}</FormLabel>
                    <RadioGroup row aria-label={q.que} name="row-radio-buttons-group" onChange={optionSelect}>
                      <FormControlLabel value={q.id + "option1"} control={<Radio />} label="Low" />
                      <FormControlLabel value={q.id + "option2"}  control={<Radio />} label="Medium" />
                      <FormControlLabel value={q.id + "option3"}  control={<Radio />} label="High" />
                    </RadioGroup>
                    <Divider />
                  </FormControl>
                ))
              ))
            }
            <Pagination className={classes.pagination_findmyself} count={1} color="primary" />
            <Button className={classes.submitbutton_findmyself} variant="outlined" onClick={resultPreparation}>Submit</Button>
          </Paper>
        ) : (
          <Paper className={classes.paper_findmyself} variant="outlined" square elevation={24} >
            <div className="message_findmyself">
              <h1><u><b>WELCOME</b></u></h1>
              <p>Hey, its me Anand and welcome to the page "Find your Passion" to know one of the most difficult
                and equally important question of student life "What should be our career???"<br/><br/>
                Select a domain from the left and start answering to the questions asked by thinking from mind 
                and answering through your heart.
              </p>
              <img src={findyourpassion} alt="FIND YOUR PASSION"/>
              <p>
                The career shown by us will be calculated according to the given score for each options.
                We strongly advice you to talk to you known ones, explore this website and googles and 
                then select a career which really suits you. Don't go with flow by thinking everyone is
                doing this or that, it must be awesome. Everyone is different and possess unique talents.
              </p>
            </div>
          </ Paper>
        )}
        </Grid>
      </Grid>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={resultDisplay}
        onClose={resultModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={resultDisplay}>
          <Box className={classes.result_modal}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Suggested career Option:
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Science
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default FindMyself;
