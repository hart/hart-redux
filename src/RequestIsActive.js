export default function createIsActive(name, Actions){
  const isActiveReducer = (state = false, action) => {
    switch (action.type) {
      case Actions.REQUEST:
        return true;
      case Actions.SUCCESS:
      case Actions.ERROR:
        return false;
      default:
        return state;
    }
  }

  const isActiveSelector = (state) => state[name];

  return {
    reducers: {
      [name]: isActiveReducer
    },
    selectors: {
      [name]: isActiveSelector
    }
  }
}