export const normalizedAction = ({ negativeCondition, operationActions, actionPromise }) => (dispatch, getState) => {
	if(negativeCondition(getState())){
		return Promise.resolve();
	}

	dispatch({
		type: operationActions.REQUEST
	});

	return actionPromise.then(
		response => {
			dispatch({
				type: operationActions.SUCCESS,
				response
			});
		},
		error => {
			dispatch({
				type: operationActions.ERROR,
				error
			});
		}
	);
};