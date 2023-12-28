export class HttpPatchOptions {
	constructor(self, id, url, datas) {
		this.id = id
		this.url = self.smodeLiveData.prefix + url
		this.baseURL = self.smodeLiveData.prefix
		this.method = 'patch'
		this.headers = {accept: "application/json, text/plain, */*",}
		this.params = { ID: id }
		this.timeout = 30000
		this.data = datas
	}
}

export class HttpGetOptions {
	constructor(self, id, url, filterClass, agent) {
		this.id = id
		this.url = self.smodeLiveData.prefix + url
		this.method = 'get'
		this.baseURL = self.smodeLiveData.prefix
		this.params = { ID: id }
		this.timeout = 30000
		this.headers = {accept: "application/json, text/plain, */*",}
		this.filterClass = filterClass
		this.httpsAgent = agent
	}
}

export class HttpPostOptions {
	constructor(self, id, url) {
		this.id = id
		this.url = self.smodeLiveData.prefix + url
		this.baseURL = self.smodeLiveData.prefix
		this.method = 'post'
		this.headers = {accept: "application/json, text/plain, */*",}
		this.params = { ID: id }
		this.timeout = 30000
	}
}
