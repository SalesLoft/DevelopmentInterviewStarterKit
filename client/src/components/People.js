import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchPeople } from '../actions/AsyncActions';
import styled from 'styled-components';

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column nowrap;
  margin-top: 30px;
`;

class People extends Component {
  componentDidMount() {
    this.props.updatePeople();
  }

  render() {
    return (
      <FlexBox>
        <h1>SalesLoft People</h1>
        <div>
          {this.props.people.map((person) => (
            <p key={person.id}>
              Name: {person.display_name}
              <br></br>
              Email: {person.email_address}
              <br></br>
              Title: {person.title}
            </p>
          ))}
        </div>
      </FlexBox>
    );
  }
}

const mapStateToProps = state => {
  return {
    people: state.people
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updatePeople: () => dispatch(fetchPeople())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(People);
