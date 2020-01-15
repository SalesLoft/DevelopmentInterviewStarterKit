import { merge } from '../utils'
import * as PeopleConstants from '../constants/PeopleConstants'

const initialState = {
  pageData: null,
  pageNumber: null,
  pagesTotal: null,
  requesting: false,
  requested: false,
  error: false,
};

export function people(state = initialState, action) {
  switch (action.type) {
    case PeopleConstants.GET_PEOPLE_REQUEST:
      return Object.assign({}, state, {
        requesting: true,
        requested: false,
      });
    case PeopleConstants.GET_PEOPLE_SUCCESS:
      return {
        pageData: action.data.data.map(result => ({
          id: result.id,
          firstName: result.first_name,
          lastName: result.last_name,
          displayName: result.display_name,
          email: result.email_address,
          jobTitle: result.title,
        })),
        pageNumber: action.data.metadata.paging.current_page,
        pagesTotal: action.data.metadata.paging.total_pages,
        requesting: false,
        requested: true,
        error: false,
      };
    case PeopleConstants.GET_PEOPLE_FAILURE:
      return Object.assign({}, state, {
        requesting: false,
        requested: true,
        error: action.error,
      });
    default:
      return state
  }
}
