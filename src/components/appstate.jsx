import { createContext, useReducer } from 'react';
import { parser } from '../utils/parser';
import { sum, divide, multiply, subtract } from '../utils/math';

const actionmap = {
	'+': sum,
	'-': subtract,
	'/': divide,
	x: multiply,
};

const initialState = {
	text: '',
	currentAction: null,
	history: [],
};

export const AppContext = createContext(initialState);

function reducer(state, { type, payload }) {
	if (type === 'EVALUATE') {
		let parsed = parser(state.text);
		let added_values = actionmap[state.currentAction](...parsed);
		return {
			...state,
			text: added_values,
			history: [
				...state.history,
				`${state.text}=${added_values}`,
			],
		};
	}
	if (type === 'UPDATE_HISTORY') {
		return {
			...state,
			history: [...state.history, payload],
		};
	}
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
