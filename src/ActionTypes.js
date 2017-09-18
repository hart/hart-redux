const defaultOperationNames = ["CREATE", "READ", "UPDATE", "DELETE"];
const defaultActionNames = ["REQUEST", "SUCCESS", "ERROR"];

function createActionTypes(name, operationNames = defaultOperationNames, actionNames = defaultActionNames){

	operationNames = operationNames.map(x => x.toUpperCase());
	actionNames = actionNames.map(x => x.toUpperCase());

	let objectName = name.toUpperCase();

	return operationNames.reduce((actions, operationName) => {

		let action = actionNames.reduce((constants, actionName) => {
			let constant = `${objectName}_${operationName}_${actionName}`;

			constants[actionName] = constant;

			return constants;
		}, {});

		actions[operationName] = action;

		return actions;
	} , {});
}

export default createActionTypes;

export const Defaults = {
	operations: { ...defaultOperationNames },
	actions: { ...defaultActionNames }
}