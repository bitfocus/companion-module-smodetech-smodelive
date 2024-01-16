let httpsAgent = null

export function sethttpsAgent(value) {
	httpsAgent = value
}

export class HttpPatchOptions {
	constructor(self, id, url, datas) {
		this.id = id
		this.url = self.smodeLiveData.prefix + url
		this.baseURL = self.smodeLiveData.prefix
		this.method = 'patch'
		this.headers = {accept: "application/json, text/plain, */*",}
		this.params = {}
		this.timeout = 5000
		this.data = datas
		this.httpsAgent = httpsAgent
	}
}

export class HttpGetOptions {
	constructor(self, id, url) {
		this.id = id
		this.url = self.smodeLiveData.prefix + url
		this.method = 'get'
		this.baseURL = self.smodeLiveData.prefix
		this.params = {}
		this.timeout = 5000
		this.headers = {accept: "application/json, text/plain, */*",}
		this.httpsAgent = httpsAgent
	}
}

export class HttpPostOptions {
	constructor(self, id, url) {
		this.id = id
		this.url = self.smodeLiveData.prefix + url
		this.baseURL = self.smodeLiveData.prefix
		this.method = 'post'
		this.headers = {accept: "application/json, text/plain, */*",}
		this.params = {}
		this.timeout = 5000
		this.httpsAgent = httpsAgent
	}
}
