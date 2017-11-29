const requestAction = ({ shouldSkip, operation, promise }) => (...params) => (dispatch, getState) => {

	if(shouldSkip && shouldSkip(getState, params)){
		return Promise.resolve();
	}

	dispatch({
		type: operation.REQUEST
	});

	return promise(dispatch, getState, ...params).then(
		response => {
			dispatch({
				type: operation.SUCCESS,
				response
			});
			return response;
		},
		error => {
			dispatch({
				type: operation.ERROR,
				response: {error}
			});
			return {error};
		}
	);
};

export default requestAction;