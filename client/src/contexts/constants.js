export const apiUrl =
	process.env.NODE_ENV !== 'production'
		// ? 'https://protected-earth-98280-4f8eea74f6f5.herokuapp.com/api'
		? 'http://localhost:5000/api'
		: 'some'