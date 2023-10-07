export const reducer = (state, action) => {
	switch (action.type) {
		case 'INPUT':
			return {
				...state,
				[action.payload.name]: action.payload.value,
			};
		case 'FILE':
			return {
				...state,
				image: action.payload,
			};
		case 'API_DATA':
			return {
				...action.payload,
			};

		default:
			return { state };
	}
};
