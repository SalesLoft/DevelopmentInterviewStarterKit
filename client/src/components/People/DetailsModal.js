import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import PeopleUtils from './PeopleUtils';

class DetailsModal extends Component {
  render() {
    const {
      onClose,
      isOpen,
      personDetails,
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
        </MuiDialogContent>
      </Dialog>
    );
  }
}

export default DetailsModal;
