export class HttpPatchOptions {
	constructor(self, id, url, datas, resultStringify) {
		this.id = id
		this.url = self.smodeLiveData.prefix + url
		this.baseURL = self.smodeLiveData.prefix
		this.method = 'patch'
		this.headers = {accept: "application/json, text/plain, */*",}
		this.params = { ID: id }
		this.timeout = 30000
		this.data = datas
		// this.contenttype = 'application/json'
		// this.body = body //'{}'
		// this.jsonResultDataVariable = '{}'
		// this.result_stringify = resultStringify
	}
	// constructor(id, url, body, resultStringify) {
	// 	this.id = id
	// 	this.url = url
	// 	this.method = 'PATCH'
	// 	this.header = '{"Content-Type": "application/json"}'
	// 	this.contenttype = 'application/json'
	// 	this.body = body //'{}'
	// 	this.jsonResultDataVariable = '{}'
	// 	this.result_stringify = resultStringify
	// }
}


export class HttpGetOptions {
	constructor(self, id, url, filterClass, agent) {
		this.id = id
		this.url = self.smodeLiveData.prefix + url
		this.method = 'get'
		this.baseURL = self.smodeLiveData.prefix
		//this.header = ''
		// this.contenttype = 'application/json'
		// this.body = '{}'
		// this.jsonResultDataVariable = '{}'
		// this.result_stringify = resultStringify
		this.params = { ID: id }
		this.timeout = 30000
		this.headers = {accept: "application/json, text/plain, */*",}
		this.filterClass = filterClass
		this.httpsAgent = agent
	}
	// constructor(id, url, resultStringify) {
	// 	this.id = id
	// 	this.url = url
	// 	this.method = 'GET'
	// 	this.header = ''
	// 	this.contenttype = 'application/json'
	// 	this.body = '{}'
	// 	this.jsonResultDataVariable = '{}'
	// 	this.result_stringify = resultStringify
	// }
}

export class HttpPostOptions {
	constructor(self, id, url, resultStringify) {
		this.id = id
		this.url = self.smodeLiveData.prefix + url
		this.baseURL = self.smodeLiveData.prefix
		this.method = 'post'
		this.headers = {accept: "application/json, text/plain, */*",}
		this.params = { ID: id }
		this.timeout = 30000
		//this.data = datas
		// this.contenttype = 'application/json'
		// this.body = body //'{}'
		// this.jsonResultDataVariable = '{}'
		// this.result_stringify = resultStringify
	}
	// constructor(id, url, resultStringify) {
	// 	this.id = id
	// 	this.url = url
	// 	this.method = 'POST'
	// 	this.header = ''
	// 	this.contenttype = 'text/plain; charset=utf-8'
	// 	this.body = '{}'
	// 	this.jsonResultDataVariable = '{}'
	// 	this.result_stringify = resultStringify
	// }
}
