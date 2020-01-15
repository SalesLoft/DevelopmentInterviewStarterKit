import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import Paginator from '../components/Paginator';
import MergeTypeIcon from '@material-ui/icons/MergeType';
import InfoIcon from '@material-ui/icons/Info';
import { IconButton } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DetailsModal from './People/DetailsModal';
import PossibleDuplicatesModal from './People/PossibleDuplicatesModal';
import '../styles/components/People.css';

class People extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isInfoModalOpen: false,
      isDuplicatesModalOpen: false,
      personDetails: {},
    };
  }

  componentDidMount() {
    this.props.peopleActions.getPeople();
  }

  render() {
    const {
      pageData,
      pageNumber,
      pagesTotal,
    } = this.props.people;

    return (
      <div className='salesloft-people'>
        <div className='page-data salesloft-people-list'>
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Job Title</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(pageData || []).map(pageResult => (
                  <TableRow key={pageResult.id}>
                    <TableCell component="th" scope="row">
                      {pageResult.firstName + ' ' + pageResult.lastName}
                    </TableCell>
                    <TableCell>{pageResult.email}</TableCell>
                    <TableCell>{pageResult.jobTitle}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="primary"
                        aria-label="get info"
                        onClick={() => this.setState({
                          isInfoModalOpen: true,
                          personDetails: pageResult,
                        })}
                      >
                        <InfoIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        aria-label="check for duplicates"
                        onClick={() => this.setState({
                          isDuplicatesModalOpen: true,
                          personDetails: pageResult,
                          peopleDetails: pageData || [],
                        })}
                      >
                        <MergeTypeIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <Paginator
          pagesTotal={pagesTotal}
          currentPage={pageNumber}
          onPageSelect={pageNumber => this.props.peopleActions.getPeople({ pageNumber })}
        />
        <DetailsModal
          isOpen={this.state.isInfoModalOpen}
          onClose={() => this.setState({ isInfoModalOpen: false })}
          personDetails={this.state.personDetails}
        />
        <PossibleDuplicatesModal
          isOpen={this.state.isDuplicatesModalOpen}
          onClose={() => this.setState({ isDuplicatesModalOpen: false })}
          personDetails={this.state.personDetails}
          peopleDetails={pageData}
        />
      </div>
    );
  }
};

People.propTypes = {
  people: PropTypes.shape({
    pageData: PropTypes.array,
    pageNumber: PropTypes.Number,
    pagesTotal: PropTypes.Number,
    requesting: PropTypes.bool.isRequired,
    requested: PropTypes.bool.isRequired,
  }).isRequired,
  peopleActions: PropTypes.object.isRequired,
};

export default People;
