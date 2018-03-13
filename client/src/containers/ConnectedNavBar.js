import NavBar from '../components/NavBar'
import { connect } from 'react-redux'

const mapStateToProps = state => ({ user: state.me.user });

export const ConnectedNavBar = connect(
  mapStateToProps
)(NavBar);

export default ConnectedNavBar
