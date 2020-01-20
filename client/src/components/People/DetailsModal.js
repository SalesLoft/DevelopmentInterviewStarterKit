import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';

/**
 * Get the frequency of each unique character in the provided string by descending frequency.
 * @param  {string} string The string to use to count the frequency of all its unique characters
 * @return {Array<Array<String, Number>>} An array of arrays where each inner array contains a unique
 * character and a number indicating its frequency. Format:
 * <pre>[
 *   [
 *     String: Number, // Each unique character maps to its frequency
 *   ],
 *   ... // The remaining unique characters in descending paired frequency
 * ]</pre>
 */
export function getCharacterFrequencies(string) {
  // Get a map of all unique characters that appear in the provided string,
  // and map each character to the number of times it appears in the provided string
  let uniqueChars = {};
  string.split('').forEach(char => {
    if (typeof uniqueChars[char] !== 'undefined') {
      uniqueChars[char]++;
    }
    else {
      uniqueChars[char] = 1;
    }
  });

  // Create and return an array of characters paired with the frequency in which they
  // appear in the provided string in descending order regarding their frequencies
  let result = [];
  Object.keys(uniqueChars)
  .sort((a, b) => uniqueChars[b] - uniqueChars[a])
  .forEach(char => {
    result.push([char, uniqueChars[char]]);
  });
  return result;
}

function DetailsModal(props) {
  const {
    onClose,
    isOpen,
    data,
  } = props,
    characterFrequencies = getCharacterFrequencies(data || '');

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="simple-dialog-title"
    >
      <MuiDialogTitle disableTypography id="customized-dialog-title">
        <Typography variant="h6">Level 2: Unique Characters</Typography>
      </MuiDialogTitle>
      <MuiDialogContent dividers>
        <Typography gutterBottom style={{ fontSize: '0.8em' }}>
          Create a button that, when clicked, displays a frequency count of all the unique characters in all the email addresses of all the People you have access to, sorted by frequency count (the count below).
        </Typography>
      </MuiDialogContent>
      <MuiDialogContent>
        <Typography gutterBottom>
          Here is the frequency of every unique character in descending order:
        </Typography>
        {characterFrequencies && characterFrequencies.map(([char, frequency]) => (
          <p key={char} style={{ margin: '0 auto', width: '7em' }}>
            <b style={{ display: 'inline-block', minWidth: '3em', textAlign: 'right', marginRight: '1em' }}>{char}:</b>
            <span style={{ display: 'inline-block', minWidth: '3em', textAlign: 'left' }}>{frequency}</span>
          </p>
        ))}
        {!characterFrequencies && 'Loading...'}
      </MuiDialogContent>
      <MuiDialogActions>
        <Button autoFocus onClick={onClose}>
          Close
        </Button>
      </MuiDialogActions>
    </Dialog>
  );
}

DetailsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired, // Whether this modal window is currently open
  onClose: PropTypes.func.isRequired, // Function called when the modal indicates it is closing
  data: PropTypes.string, // The string to get all of its character's frequencies
};

export default DetailsModal;
