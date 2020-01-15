import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { levDist } from '../../utils';

class PossibleDuplicatesModal extends Component {
  getPossibleDuplicates() {
    let peopleRecords = [...this.props.peopleDetails];
    let possibleDuplicatesIds = {};

    const isAlreadyPossibleDuplicate = person => typeof possibleDuplicatesIds[person.id] !== 'undefined';

    let results = [];

    while (peopleRecords.length > 1) {
      let currentPerson = peopleRecords.shift(),
        currentPossibleDuplicates = [];

      if (!isAlreadyPossibleDuplicate(currentPerson)) {
        peopleRecords.forEach(person => {
          let addPossibleDuplicate = false;
          if (!isAlreadyPossibleDuplicate(person)) {
            if (levDist(person.email, currentPerson.email) === 1) {
              if (person.email[0] !== currentPerson.email[0]) {
                // If the first letter of their email is the only difference,
                // and if the first letter is NOT also the first letter of their first name,
                // then indicate that this could be a possible duplicate
                let differentFirstLetterOfFirstNames =
                  person.email[0].toLowerCase() === person.firstName[0].toLowerCase()
                  && currentPerson.email[0].toLowerCase() === currentPerson.firstName[0].toLowerCase();
                if (!differentFirstLetterOfFirstNames) {
                  addPossibleDuplicate = true;
                }
              }
              else {
                // If the difference is NOT just the first letter of the email,
                // then add this as a possible duplicate
                addPossibleDuplicate = true;
              }
            }

            if (addPossibleDuplicate) {
              if (!currentPossibleDuplicates.length) {
                currentPossibleDuplicates.push(currentPerson);
              }
              currentPossibleDuplicates.push(person);

              // Indicate that the person iterated to is now already a possible duplicate (so not to duplicate detection)
              possibleDuplicatesIds[person.id] = true;
            }
          }
        });
      }

      if (currentPossibleDuplicates.length) {
        results.push(currentPossibleDuplicates);
      }
    }

    return results;
  }

  render() {
    const {
      onClose,
      isOpen,
      personDetails,
      peopleDetails,
    } = this.props;

    return (
      <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby="simple-dialog-title"
      >
        <MuiDialogTitle disableTypography id="customized-dialog-title">
          <Typography variant="h6">Modal Title</Typography>
        </MuiDialogTitle>
        <MuiDialogContent dividers>
          <Typography gutterBottom>
            Here's a list of other People records that may potential be duplicates of <b>{personDetails.firstName}</b>:
          </Typography>
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
            auctor fringilla.
          </Typography>
        </MuiDialogContent>
        <MuiDialogActions>
          <Button autoFocus onClick={onClose} color="primary">
            Close
          </Button>
          <Button autoFocus onClick={() => console.log(this.getPossibleDuplicates())} color="primary">
            Check Duplicates
          </Button>
        </MuiDialogActions>
      </Dialog>
    );
  }
}

export default PossibleDuplicatesModal;
