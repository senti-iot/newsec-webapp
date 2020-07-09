import { create } from 'apisauce'

const demoApi = create({
	baseURL: 'https://jsonplaceholder.typicode.com/',
	timout: 30000,
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	}
});

/**
 * Endpoint for getting the data
 */
export const getDemoDataFromServer = () => {
	let result = demoApi.get('/posts').then(rs => rs.ok ? rs.data : [])
	return result
}