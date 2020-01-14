/**
 * Creates the function responsible for handling the provided API call as well as the specified API action names
 * @param  {Function} api The API call that returns a Promise
 * @param  {Array} apiActionsData Structured data concerning the API actions. Format:
 * <pre>[
 *  String|Function, // The action type for the API action (REQUEST, SUCCESS, FAILURE) OR a function that receives the data response as a parameter and is expected to return the action object
 *  ... // The other two API actions in the following order: [REQUEST, SUCCESS, FAILURE]
 * ]</pre>
 * Example: [
 *  (...params) => ({
 *    type: ActionTypes.API_CALL_REQUEST,
 *    ... // Any other data to add to this action object
 *  }), // Alternatively just pass the name of the event type: ActionTypes.API_CALL_REQUEST, which creates an action like so: { type: ActionTypes.API_CALL_REQUEST }
 *  (data, ...params) => ({
 *    type: ActionTypes.API_CALL_SUCCESS,
 *    data: data, // The data that was returned by the API's response
 *    ... // Any other data to add to this action object
 *  }), // Alternatively just pass the name of the event type: ActionTypes.API_CALL_SUCCESS, which creates an action like so: { type: ActionTypes.API_CALL_SUCCESS, data }
 *  ({ error, errorCode, errorMessage }, ...params) => ({
 *    type: ActionTypes.API_CALL_FAILURE,
 *    errorCode,
 *    errorMessage,
 *    ... // Any other data to add to this action object
 *  }), // Alternatively just pass the name of the event type: ActionTypes.API_CALL_FAILURE, which creates an action like so: { type: ActionTypes.API_CALL_FAILURE, errorCode, errorMessage }
 * ]
 * @return {Function} The created API function with appropriate action events handling
 * @todo Logout user when a 401 error code is received
 */
export const make = (api, apiActionsData) => {
  let [ request, success, failure ] = apiActionsData;

  return (...params) => (dispatch, getState) => {
    dispatch(typeof request === 'function'
      ? request(...params, getState)
      : { type: request }
    );

    return api(...params, getState)
    .then(response => {
      // If an error message is received then fallback to the failure scenario
      if (response && response.ok === false && response.statusText && response.status) {
        throw {
          message: response.statusText,
          code: response.status,
        };
      }

      dispatch(typeof success === 'function'
        ? success(response, ...params, getState)
        : { type: success, data: response.data }
      );
    })
    .catch(error => {
      let errorMessage = error && error.message
          ? String(error.message)
          : JSON.stringify(error),
        errorCode = error && error.code,
        action = typeof failure === 'function'
          ? failure({ error, errorCode, errorMessage, getState }, ...params, getState)
          : {
            type: failure,
            errorCode: errorCode,
            errorMessage: errorMessage,
            error: errorMessage,
          };

      // If the error is 401, logout the current user
      if (errorCode === 401) {
        /**
         * TODO: Logout user
         */
      }

      return dispatch(action);
    });
  };
};
