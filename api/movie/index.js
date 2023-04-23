import requests from '@/api/request.js'
export const reqTopMovie = (page) => {
	return requests({
		url: `https://rank.8610000.xyz/top250/${page}.json`,
		method: 'get'
	})
}