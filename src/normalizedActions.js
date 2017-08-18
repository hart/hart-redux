export const normalizedAction = ({ negativeCondition, operationActions, actionPromise }) => (...params) => (dispatch, getState) => {

	if(negativeCondition(getState, params)){
		return Promise.resolve();
	}

	dispatch({
		type: operationActions.REQUEST
	});

	return actionPromise(getState, ...params).then(
		response => {
			dispatch({
				type: operationActions.SUCCESS,
				response
			});
			return response;
		},
		error => {
			dispatch({
				type: operationActions.ERROR,
				response: {error}
			});
			return {error};
		}
	);
};