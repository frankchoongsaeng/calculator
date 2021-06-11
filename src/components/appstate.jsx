import { createContext, useReducer } from 'react';

export const AppContext = createContext();

const initialState = {
	text: '',
	currentAction: null,
};

function reducer(state, { type, payload }) {
	if (type === 'UPDATE_TEXT') {
		return {
			...state,
			text: state.text + payload,
		};
	}
	if (type === 'SET_TEXT') {
		return {
			...state,
			text: payload,
		};
	}
	if (type === 'SET_ACTION') {
		return {
			...state,
			currentAction: payload,
		};
	}
	if (type === 'DELETE') {
		return {
			...state,
			text: state.text.slice(0, state.text.length - 1),
		};
	}
	if (type === 'CLEAR') {
		return {
			...state,
			text: '',
			currentAction: null,
		};
	}

	return state;
}

function AppState({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<AppContext.Provider value={{ state, dispatch }}>
			{children}
		</AppContext.Provider>
	);
}

export default AppState;
