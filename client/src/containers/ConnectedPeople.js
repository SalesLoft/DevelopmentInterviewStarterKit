import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as peopleActions from '../actions/PeopleActions';
import People from '../components/People';

export default connect(state => ({
  people: state.people,
}), dispatch => ({
  peopleActions: bindActionCreators(peopleActions, dispatch),
}))(People);
