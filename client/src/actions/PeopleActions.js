import * as ApiActions from './ApiActions';
import * as PeopleActionTypes from '../constants/PeopleConstants';
import axios from 'axios';
import { encodeGetParams } from '../utils';

/**
 * Fetch People with the provided search settings
 * @param {?Object} settings Format:
 * <pre>{
 *  'limit': ?Number, // The number of results to limit the response to; defaults to 100
 *  'pageNumber': ?Number, // The page number to fetch results for; defaults to 1
 * }</pre>
 */
export const getPeople = ApiActions.make((settings = {}) => {
  return axios.get('/api/people?' + encodeGetParams({
    page: settings.pageNumber || 1,
    // limit: settings.limit || 100,
  }));
}, [
  PeopleActionTypes.GET_PEOPLE_REQUEST,
  PeopleActionTypes.GET_PEOPLE_SUCCESS,
  PeopleActionTypes.GET_PEOPLE_FAILURE
]);
