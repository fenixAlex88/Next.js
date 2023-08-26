export const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

export const API = {
	topPage: {
		find: DOMAIN + "/api/top-page/find",
		byAlias: DOMAIN + "/api/top-page/byAlias/"
	},
	product: {
		find: DOMAIN + "/api/product/find/"
	},
	review: {
		createDemo: DOMAIN + '/api/review/create-demo'
	}
};