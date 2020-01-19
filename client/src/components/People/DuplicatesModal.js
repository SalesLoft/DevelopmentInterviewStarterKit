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

export const getPossibleDuplicates = people => {
  let peopleRecords = [...people];
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
          if (levDist(person.email_address, currentPerson.email_address) === 1) {
            if (person.email_address[0] !== currentPerson.email_address[0]) {
              // If the first letter of their email is the only difference,
              // and if the first letter is NOT also the first letter of their
              // first name, then indicate that this could be a possible duplicate.
              //
              // This is to avoid thinking "ssmith@company.com" is a possible duplicate
              // of "bsmith@company.com" where the email addresses are for Sam Smith and
              // Brad Smith respectively at the same company.
              let differentFirstLetterOfFirstNames =
                person.email_address[0].toLowerCase() === person.first_name[0].toLowerCase()
                && currentPerson.email_address[0].toLowerCase() === currentPerson.first_name[0].toLowerCase();
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

const DuplicatesModal = props => {
  const {
    onClose,
    isOpen,
    peopleData,
  } = props,
    possibleDuplicates = getPossibleDuplicates(peopleData || []);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="simple-dialog-title"
    >
      <MuiDialogTitle disableTypography id="customized-dialog-title">
        <Typography variant="h6">Level 3: Detect Possible Duplicate People Records</Typography>
      </MuiDialogTitle>
      {possibleDuplicates.map((duplicateGroup, index) => (
        <MuiDialogContent key={index} dividers>
          <ul>
            {duplicateGroup.map((person, index) => (
              <li key={index}>{person.first_name + ' ' + person.last_name}&lt;{person.email_address}&gt;</li>
            ))}
          </ul>
        </MuiDialogContent>
      ))}
      <MuiDialogActions>
        <Button autoFocus onClick={onClose}>
          Close
        </Button>
      </MuiDialogActions>
    </Dialog>
  );
}

export default DuplicatesModal;
