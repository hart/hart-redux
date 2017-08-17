export const normalizedAction = ({ negativeCondition, operationActions, actionPromise }) => (dispatch, getState) => {

	console.log("checking negativeCondition");

	if(negativeCondition(getState())){
		console.log("negativeCondition was true, resolving immediately");
		return Promise.resolve();
	}

	console.log("Dispatching REQUEST");

	dispatch({
		type: operationActions.REQUEST
	});

	console.log("Returning actionPromise");

	return actionPromise.then(
		response => {
			console.log("actionPromise response", response);
			console.log("Dispatching SUCCESS");
			dispatch({
				type: operationActions.SUCCESS,
				response
			});
		},
		error => {
			console.log("actionPromise error", error);
			console.log("Dispatching ERROR");
			dispatch({
				type: operationActions.ERROR,
				response: {error}
			});
		}
	);
};