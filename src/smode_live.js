import { InstanceStatus } from '@companion-module/base'
import fs from 'fs'
import https from 'https'
import axios from 'axios'
import { HttpGetOptions } from './httpObject.js'

let sceneTMP = {}
let tlTMP = {}
let tlMakersTMP = {}
let httpsAgent

export const smodeLive = {
	//██ ███    ██ ██ ████████     ███████ ███    ███  ██████  ██████  ███████     ██      ██ ██    ██ ███████
	//██ ████   ██ ██    ██        ██      ████  ████ ██    ██ ██   ██ ██          ██      ██ ██    ██ ██
	//██ ██ ██  ██ ██    ██        ███████ ██ ████ ██ ██    ██ ██   ██ █████       ██      ██ ██    ██ █████
	//██ ██  ██ ██ ██    ██             ██ ██  ██  ██ ██    ██ ██   ██ ██          ██      ██  ██  ██  ██
	//██ ██   ████ ██    ██        ███████ ██      ██  ██████  ██████  ███████     ███████ ██   ████   ███████
	//
	async init_smode_live(self) {
		self.log('info', `AXIOS IS CANCEL >>> ${axios.isCancel('something')}`)
		if (self.config.https) {
			console.info(`SMODE LIVE | INIT HTTPS !`)
			self.smodeLiveData.prefix = `https://${self.config.host}:${self.config.port}`
			console.info(`SMODE LIVE | INIT HTTPS >>> ${self.config.certFilePath} | ${self.config.keyFilePath}`)
			if (self.config.certFilePath !== "" && self.config.keyFilePath !== "" && self.config.certFilePath !== undefined && self.config.keyFilePath !== undefined) {
				console.info(`SMODE LIVE | INIT HTTPS FILES | CERT FILE >>> ${fs.existsSync(self.config.certFilePath)}  | KEY FILE >>> ${fs.existsSync(self.config.keyFilePath)}`)
				let certFile = fs.readFileSync(self.config.certFilePath)
				let keyFile = fs.readFileSync(self.config.keyFilePath)
				httpsAgent = new https.Agent({
					rejectUnauthorized: false,
					cert: certFile,
					key: keyFile,
					passphrase: 'Password',
				})
			} else {
				console.info(`SMODE LIVE | INIT HTTPS ! BAD HTTPS`)
				self.updateStatus(InstanceStatus.BadConfig, "Certifacte Default")
				return
			}
		} else {
			console.info(`SMODE LIVE | INIT HTTP !`)
			self.smodeLiveData.prefix = `http://${self.config.host}:${self.config.port}`
		}

		if (!this.getHttpValide(self)) {
			self.updateStatus(InstanceStatus.BadConfig)
			return
		} else {
			await this.getVersion(self)
			await this.getContents(self)
			await this.getDevices(self)
		}
	},

	// ██████  ██████  ███    ██ ████████ ███████ ███    ██ ████████ ███████
	// ██      ██    ██ ████   ██    ██    ██      ████   ██    ██    ██
	// ██      ██    ██ ██ ██  ██    ██    █████   ██ ██  ██    ██    ███████
	// ██      ██    ██ ██  ██ ██    ██    ██      ██  ██ ██    ██         ██
	//  ██████  ██████  ██   ████    ██    ███████ ██   ████    ██    ███████
	//
	async getContents(self) {
		this.httpSend(self, 'CONTENTS', `/api/live/contents`)
	},

	async checkContentsVariables(self) {
		let contents = self.smodeLiveData.contents
		Object.keys(contents).forEach((key) => {
			// const rgb = [
			// 	Math.ceil(contents[key].colorLabel.red * 255),
			// 	Math.ceil(contents[key].colorLabel.green * 255),
			// 	Math.ceil(contents[key].colorLabel.blue * 255),
			// ]
			self.setVariableValues({
				[`${contents[key].uuid}_uuid`]: contents[key].uuid,
				[`${contents[key].uuid}_activation`]: contents[key].activation,
				[`${contents[key].uuid}_loading`]: contents[key].loading,
				[`${contents[key].uuid}_name`]: contents[key].label,
				// [`scene_${key}_color`]: combineRgb(rgb[0], rgb[1], rgb[2]),
			})
		})
		await self.checkFeedbacks()
	},

	// PARAMETERS
	// async getParameters(self) {
	// 	let parametersTMP = {}
	// 	let contents = self.smodeLiveData.contents
	// 	for (const scene in contents) {
	// 		//self.log('warn', `SMODELIVE | GET PARAMETERS SCENE UUID >>> ${contents[scene].actions}`)
	// 		//if (contents[scene].uuid != '00000000-0000-0000-0000-000000000000') {
	// 			let paras = {}
	// 			for (const para in contents[scene].actions) {
	// 				//self.log('warn', `SMODELIVE | GET PARAMETERS SCENE ACTIONS CLASS >>> ${contents[scene].actions[para].class}`)
	// 				if (contents[scene].actions[para].class === "ParametersState"){
	// 					self.log('warn', `SMODELIVE | GET PARAMETERS PARENT LABEL >>> ${paras[contents[scene].actions[para].parentUuid]}`)
	// 					//self.log('warn', `SMODELIVE | GET PARAMETERS PARENT LABEL >>> ${contents[scene].actions[para].parentLabel}`)
	// 					if (paras[contents[scene].actions[para].parentUuid] === undefined) paras[contents[scene].actions[para].parentUuid] = {}
	// 					// paras[contents[scene].actions[para].parentUuid][contents[scene].actions[para].uuid] = contents[scene].actions[para]
	// 					// paras[contents[scene].actions[para].parentUuid][contents[scene].actions[para].uuid]["label"] = contents[scene].actions[para].parentLabel
	// 				}
	// 			}
	// 			if (Object.keys(paras).length !== 0){
	// 			parametersTMP[contents[scene].uuid] = paras
	// 			parametersTMP[contents[scene].uuid]['scene'] = contents[scene].label
	// 			}
	// 		//}
	// 	}
	// 	self.smodeLiveData.parameters = parametersTMP
	// 	self.log('warn', `SMODELIVE | GET PARAMETERS >>> ${JSON.stringify(self.smodeLiveData.parameters, null, 4)}`)
	// },

	//████████ ██ ███    ███ ███████ ██      ██ ███    ██ ███████ ███████
	//   ██    ██ ████  ████ ██      ██      ██ ████   ██ ██      ██
	//   ██    ██ ██ ████ ██ █████   ██      ██ ██ ██  ██ █████   ███████
	//   ██    ██ ██  ██  ██ ██      ██      ██ ██  ██ ██ ██           ██
	//   ██    ██ ██      ██ ███████ ███████ ██ ██   ████ ███████ ███████
	//

	async getTimelinesList(self) {
		let timelinesTMP = {}
		let contents = self.smodeLiveData.contents
		for (const scene in contents) {
			if (contents[scene].animationUuid != '00000000-0000-0000-0000-000000000000') {
				timelinesTMP[contents[scene].animationUuid] = await this.getTimeline(
					self,
					contents[scene].animationUuid,
					contents[scene].label
				)
				let markers = []
				for (const marker in contents[scene].actions) {
					if (contents[scene].actions[marker].class === "TimeMarker"){
						markers.push(contents[scene].actions[marker])
					}
				}
				timelinesTMP[contents[scene].animationUuid].timeMarkers = markers //contents[scene].actions
			}
		}
		//self.log('info', `SMODELIVE | GET TIMELINE PROPS >>> ${JSON.stringify(timelinesTMP, null, 4)}`)
		self.smodeLiveData.timelines = timelinesTMP
		await self.initVariables()
		await self.updateFeedbacks()
		//await self.updateActions()
		await self.updatePresets()
		await this.checkTimeLinesVariables(self)
	},

	async getTimeline(self, uuid, parent) {
		self.log('info', `SMODELIVE | GET TIMELINE >>> ${uuid} ${parent}`)
		await this.httpSend(self, 'TIMELINE', `/api/live/objects/${uuid}`)
		//self.log('info', `SMODELIVE | GET TIMELINE >>> ${JSON.stringify(tlTMP, null, 4)}`)
		let jsonObject = tlTMP
		jsonObject.label = 'MT'
		jsonObject.parent = parent
		return jsonObject
	},

	async checkTimeLinesVariables(self) {
		let tl = self.smodeLiveData.timelines
		//self.log('info', `SMODELIVE | CHECK TIMELINE VARIABLES >>> ${JSON.stringify(self.smodeLiveData.timelines, null,4)} `)
		Object.keys(tl).forEach((key) => {
			self.setVariableValues({
				[`tl_${key}_uuid`]: key,
				[`tl_${key}_activation`]: tl[key].activation,
				[`tl_${key}_loading`]: tl[key].loading,
				[`tl_${key}_name`]: tl[key].parent + '\nMT',
				[`tl_${key}_parent`]: tl[key].parent,
				//[`tl_${key}_color`]: tl[key].colorLabel,
				[`tl_${key}_playing`]: tl[key].transport.playing,
				[`tl_${key}_looping`]: tl[key].parameters.looping,
			})
			// MAKERS VARIABLE
			let makersOBJ = tl[key].timeMarkers
			for (let i = 0; i < makersOBJ.length; i++) {
				self.setVariableValues({
					[`tl_marker_${key}_${makersOBJ[i].uuid}_uuid`]: makersOBJ[i].uuid,
					[`tl_marker_${key}_${makersOBJ[i].uuid}_name`]: makersOBJ[i].label,
				})
			}
		})
		await self.checkFeedbacks()
	},

	//
	//███████  ██████ ███████ ███    ██ ███████ ███████
	//██      ██      ██      ████   ██ ██      ██
	//███████ ██      █████   ██ ██  ██ █████   ███████
	//     ██ ██      ██      ██  ██ ██ ██           ██
	//███████  ██████ ███████ ██   ████ ███████ ███████
	//

	async getScenesInContents(self) {
		if (!this.getHttpValide(self)) return
		//self.log('info', `SMODELIVE | GET SCENES IN CONTENTS | START !`)
		let scenesTMP = {}
		let contents = self.smodeLiveData.contents
		for (const scene in contents) {
			if (contents[scene].label === 'Show') {
				//self.smodeLiveData.show[contents[scene].uuid] = contents[scene]
			} else {
				let uuid = contents[scene].uuid
				await this.httpSend(self, 'SCENE', `/api/live/objects/${uuid}`)
				scenesTMP[uuid] = sceneTMP
				scenesTMP[uuid].label = contents[scene].label
			}
		}
		self.smodeLiveData.scenes = scenesTMP
		await self.initVariables()
		await this.checkSceneVariables(self)
		await self.updateActions()
		await self.updatePresets()
		await self.updateFeedbacks()
	},

	async checkSceneVariables(self) {
		let scenes = self.smodeLiveData.scenes
		Object.keys(scenes).forEach((key) => {
			const rgb = [
				Math.ceil(scenes[key].colorLabel.red * 255),
				Math.ceil(scenes[key].colorLabel.green * 255),
				Math.ceil(scenes[key].colorLabel.blue * 255),
			]
			self.setVariableValues({
				[`scene_${key}_uuid`]: key,
				[`scene_${key}_activation`]: scenes[key].activation,
				[`scene_${key}_loading`]: scenes[key].loading,
				[`scene_${key}_name`]: scenes[key].label,
				// [`scene_${key}_color`]: combineRgb(rgb[0], rgb[1], rgb[2]),
			})
		})
		await self.checkFeedbacks()
	},

	//
	//██████  ███████ ██    ██ ██  ██████ ███████ ███████
	//██   ██ ██      ██    ██ ██ ██      ██      ██
	//██   ██ █████   ██    ██ ██ ██      █████   ███████
	//██   ██ ██       ██  ██  ██ ██      ██           ██
	//██████  ███████   ████   ██  ██████ ███████ ███████
	//
	async getDevices(self) {
		this.httpSend(self, 'DEVICES', `/api/live/devices`)
	},

	async checkDevicesVariables(self) {
		for (const object in self.smodeLiveData.devices) {
			self.setVariableValues({
				[`device_${self.smodeLiveData.devices[object].uuid}_isMuted`]: self.smodeLiveData.devices[object].isMuted,
				[`device_${self.smodeLiveData.devices[object].uuid}_name`]: self.smodeLiveData.devices[object].label,
			})
			self.checkFeedbacks()
		}
	},

	//
	// ██████  ███    ██      █████  ██ ██████
	//██    ██ ████   ██     ██   ██ ██ ██   ██
	//██    ██ ██ ██  ██     ███████ ██ ██████
	//██    ██ ██  ██ ██     ██   ██ ██ ██   ██
	// ██████  ██   ████     ██   ██ ██ ██   ██
	//
	async getOnAir(self) {
		this.httpSend(self, 'ONAIR', `/api/live/on-air`)
	},

	async checkOnAir(self) {
		//self.log('debug', `SMODE LIVE | CHECK ON AIR >>> ${self.smodeLiveData.onAir}`)
		self.setVariableValues({
			status_on_air: self.smodeLiveData.onAir,
		})
		self.checkFeedbacks('on_air')
	},

	//
	//███████  ██████  ██████      ███    ███  ██████  ██████  ███████
	//██      ██      ██    ██     ████  ████ ██    ██ ██   ██ ██
	//█████   ██      ██    ██     ██ ████ ██ ██    ██ ██   ██ █████
	//██      ██      ██    ██     ██  ██  ██ ██    ██ ██   ██ ██
	//███████  ██████  ██████      ██      ██  ██████  ██████  ███████
	//
	async getEcoMode(self) {
		this.httpSend(self, 'ECOMODE', `/api/live/eco-mode`)
	},

	async checkEcoMode(self) {
		self.setVariableValues({
			status_eco_mode: self.smodeLiveData.ecoMode,
		})
		self.checkFeedbacks('eco_mode')
	},

	//
	// ██████  ██    ██ ████████ ██████  ██    ██ ████████
	//██    ██ ██    ██    ██    ██   ██ ██    ██    ██
	//██    ██ ██    ██    ██    ██████  ██    ██    ██
	//██    ██ ██    ██    ██    ██      ██    ██    ██
	// ██████   ██████     ██    ██       ██████     ██
	//
	async getOutput(self) {
		this.httpSend(self, 'OUTPUT', `/api/live/output`)
	},

	async checkOutput(self) {
		self.setVariableValues({
			status_output: self.smodeLiveData.output,
		})
		self.checkFeedbacks('output')
	},

	//
	//███████ ████████  █████  ████████ ██    ██ ███████
	//██         ██    ██   ██    ██    ██    ██ ██
	//███████    ██    ███████    ██    ██    ██ ███████
	//     ██    ██    ██   ██    ██    ██    ██      ██
	//███████    ██    ██   ██    ██     ██████  ███████
	//
	async getSmodeLiveStatus(self) {
		this.httpSend(self, 'STATUS', `/api/live/status`)
	},

	async checkStatus(self) {
		self.setVariableValues({
			status_state: `${self.smodeLiveData.status.state}`,
			status_frame_rate: `${self.smodeLiveData.status.frame_rate}`,
			// status_gpu_ram: `${self.smodeLiveData.status.gpu_ram}`,
			// status_cpu_ram: `${self.smodeLiveData.status.cpu_ram}`,
		})
		self.checkFeedbacks('smode_state')
	},

	//███████ ████████  █████  ████████ ██ ███████ ████████ ██  ██████
	//██         ██    ██   ██    ██    ██ ██         ██    ██ ██
	//███████    ██    ███████    ██    ██ ███████    ██    ██ ██
	//	   ██    ██    ██   ██    ██    ██      ██    ██    ██ ██
	//███████    ██    ██   ██    ██    ██ ███████    ██    ██  ██████
	//
	async getStatistics(self) {
		this.httpSend(self, 'STASTITICS', `/api/engine/stats`)
	},

	async checkStatistics(self) {
		self.setVariableValues({
			statistic_fps: `${self.smodeLiveData.staticstics.fps.toFixed(2)}`,
			statistic_vram: `${self.smodeLiveData.staticstics.vram.toFixed(1)}`,
			statistic_vramMax: `${self.smodeLiveData.staticstics.vramMax.toFixed(1)}`,
			statistic_vramPC: `${self.smodeLiveData.staticstics.vramPC.toFixed(2)}`,
		})
		self.checkFeedbacks('vramStep0')
	},

	//
	//██    ██ ███████ ██████  ███████ ██  ██████  ███    ██
	//██    ██ ██      ██   ██ ██      ██ ██    ██ ████   ██
	//██    ██ █████   ██████  ███████ ██ ██    ██ ██ ██  ██
	// ██  ██  ██      ██   ██      ██ ██ ██    ██ ██  ██ ██
	//  ████   ███████ ██   ██ ███████ ██  ██████  ██   ████
	//
	async getVersion(self) {
		//console.info(httpsAgent)
		this.httpSend(self, 'VERSION', `/api/live/softwareVersion`)
	},

	async checkVersion(self) {
		//self.log('debug', `SMODE LIVE | CHECK VERSION >>> ${JSON.stringify(self.smodeLiveData.version)}`)
		self.setVariableValues({
			ver_program: `${self.smodeLiveData.version.program}`,
			ver_major: `${self.smodeLiveData.version.major}`,
			ver_minor: `${self.smodeLiveData.version.minor}`,
			ver_revision: `${self.smodeLiveData.version.revision}`,
			ver_versionLong: `${self.smodeLiveData.version.major}.${self.smodeLiveData.version.minor}.${self.smodeLiveData.version.revision}`,
		})
		self.checkFeedbacks()
	},

	// SEND & ERROR
	async httpSend(self, id, url, filterClass = '') {
		if (!this.getHttpValide(self)) return
		let options = new HttpGetOptions(self, id, url, filterClass, httpsAgent)
		try {
			let response = await axios.request(options)
			await this.httpReponse(self, response)
		} catch (error) {
			self.log('error', `HTTP GET Request failed (${id} | ${error.message} | ${error.code})`)
			if (error.code === 'ECONNABORTED') {
				self.updateStatus(InstanceStatus.ConnectionFailure, 'Check Smode Live Server!')
			} else if (error.code === 'UNABLE_TO_VERIFY_LEAF_SIGNATURE') {
				self.updateStatus(InstanceStatus.ConnectionFailure, error.message)
			}
			console.error(error.message)
		}
	},

	// respone
	async httpReponse(self, response) {
		if (response && typeof response.data === 'object') {
			self.updateStatus(InstanceStatus.Ok)

			// CONTENTS
			if (response.config.id === 'CONTENTS') {
				self.log('info', `SMODE LIVE | HTTP RESPONSE CONTENTS >>> ${JSON.stringify(response.data, null, 4)}`)
				self.smodeLiveData.contents = response.data
				await this.getScenesInContents(self)
				await this.getTimelinesList(self)
				//await this.getParameters(self)
				return
			}

			// VERSION
			if (response.config.id === 'VERSION') {
				// console.log(response.data)
				// console.log(response.status)
				// console.log(response.statusText)
				// console.log(response.headers)
				// console.log(response.config)
				if (response.status === 200) {
					self.smodeLiveData.version = response.data
					self.init_smodeLive_polling()
					await this.checkVersion(self)
					return
				} else {
					self.updateStatus(InstanceStatus.Connecting)
					return
				}
			}

			// STASTITICS
			if (response.config.id === 'STASTITICS') {
				//self.log('info', `SMODE LIVE | HTTP RESPONSE >>> STASTITICS`)
				self.smodeLiveData.staticstics = response.data
				self.smodeLiveData.staticstics.vramPC =
					(100 * self.smodeLiveData.staticstics.vram) / self.smodeLiveData.staticstics.vramMax
				await this.checkStatistics(self)
				return
			}

			// STATUS
			if (response.config.id === 'STATUS') {
				//self.log('info', `SMODE LIVE | HTTP RESPONSE >>> STATUS`)
				self.smodeLiveData.status = response.data
				await this.checkStatus(self)
				return
			}

			// DEVICES
			if (response.config.id === 'DEVICES') {
				//console.log(response.data)
				console.log(typeof response.data)
				//self.log('info', `SMODE LIVE | HTTP RESPONSE >>> ${JSON.stringify(response.data, null, 4)}`)
				self.smodeLiveData.devices = response.data
				await self.initVariables()
				await self.updateFeedbacks()
				await self.updateActions()
				await self.updatePresets()
				await this.checkDevicesVariables(self)
				return
			}

			// SCENE
			if (response.config.id === 'SCENE') {
				//self.log('info', `SMODE LIVE | HTTP RESPONSE | SCENE >>> ${JSON.stringify(response.data, null, 4)}`)
				sceneTMP = response.data
				return
			}

			// TIMELINE
			if (response.config.id === 'TIMELINE') {
				// console.log(response.data)
				// console.log(response.status)
				// console.log(response.statusText)
				// console.log(response.headers)
				// console.log(response.config)
				//self.log('warn', `SMODE LIVE | HTTP RESPONSE | TIMELINE >>> ${JSON.stringify(response.data, null, 4)}`)
				tlTMP = response.data
				return
			}

			// TIMELINE MAKERS
			if (response.config.id === 'TIMELINEMAKERS') {
				// console.log(response.data)
				// console.log(response.status)
				// console.log(response.statusText)
				// console.log(response.headers)
				// console.log(response.config)
				//self.log('info', `SMODE LIVE | HTTP RESPONSE | TIMELINE MAKERS >>> ${JSON.stringify(response.data, null, 4)}`)
				tlMakersTMP = response.data
				return
			}
		} else if (response && typeof response.data === 'boolean') {
			self.updateStatus(InstanceStatus.Ok)
			// ECOMODE
			if (response.config.id === 'ECOMODE') {
				//self.log('info', `SMODE LIVE | HTTP RESPONSE >>> ECOMODE`)
				self.smodeLiveData.ecoMode = response.data
				await this.checkEcoMode(self)
				return
			}
			// ONAIR
			if (response.config.id === 'ONAIR') {
				//self.log('info', `SMODE LIVE | HTTP RESPONSE >>> ONAIR`)
				self.smodeLiveData.onAir = response.data
				await this.checkOnAir(self)
				return
			}
		} else if (response && typeof response.data === 'string') {
			self.updateStatus(InstanceStatus.Ok)
			// OUTPUT
			if (response.config.id === 'OUTPUT') {
				//self.log('info', `SMODE LIVE | HTTP RESPONSE >>> OUTPUT`)
				self.smodeLiveData.output = response.data
				await this.checkOutput(self)
				return
			}
		} else {
			self.updateStatus(InstanceStatus.ConnectionFailure)
			self.stop_smodeLive_polling()
			return
		}
	},

	// ACTIONS ERROR
	async actionsError(self, id, error) {
		self.log('error', `ACTION ERROR | REQUEST FAILED >>> ${id} | ${error.message} | ${error.code}`)
		if (error.code === 'ECONNABORTED') {
			self.updateStatus(InstanceStatus.ConnectionFailure, 'Check Smode Live Server!')
		} else if (error.code === 'UNABLE_TO_VERIFY_LEAF_SIGNATURE') {
			self.updateStatus(InstanceStatus.ConnectionFailure, error.message)
		}
		//console.error(error.message)
	},

	//
	//██    ██ ██████  ██          ██    ██  █████  ██      ██ ██████  ███████
	//██    ██ ██   ██ ██          ██    ██ ██   ██ ██      ██ ██   ██ ██
	//██    ██ ██████  ██          ██    ██ ███████ ██      ██ ██   ██ █████
	//██    ██ ██   ██ ██           ██  ██  ██   ██ ██      ██ ██   ██ ██
	// ██████  ██   ██ ███████       ████   ██   ██ ███████ ██ ██████  ███████
	//
	getHttpValide(self) {
		//self.log('debug', `SMODE LIVE | HTTP VALID >>> ${self.smodeLiveData.prefix} ${self.smodeLiveData.prefix.length}`)
		if (self.config.host && self.config.port && self.smodeLiveData.prefix.length > 0) return true
		else return false
	},
}

// async getScenesInObjects(self) {
// 	if (!this.getHttpValide(self)) return
// 	self.log('info', `SMODELIVE | GET SCENES IN OBJECTS | START !`)
// 	let scenesTMP = {}
// 	for (const object in self.smodeLiveData.objects) {
// 		if (self.smodeLiveData.objects[object].class === 'Scene') {
// 			let uuid = self.smodeLiveData.objects[object].uuid
// 			await this.httpSend(self, 'SCENE', `/api/live/objects/${uuid}`)
// 			scenesTMP[uuid] = sceneTMP
// 		}
// 	}
// 	let compareJson = JSON.stringify(scenesTMP) === JSON.stringify(self.smodeLiveData.scenes)
// 	let comparecount = Object.keys(scenesTMP).length === Object.keys(self.smodeLiveData.scenes).length
// 	//self.log('debug', `SMODELIVE | GET SCENE TMP PROPS >>> ${JSON.stringify(scenesTMP, null, 4)}`)
// 	//self.log('debug', `SMODELIVE | GET SCENE COMPARE >>> ${compareJson} ${comparecount}`)
// 	self.smodeLiveData.scenes = scenesTMP
// 	if (!comparecount) {
// 		await self.initVariables()
// 		await this.checkSceneVariables(self)
// 		await self.updateFeedbacks()
// 		await self.updateActions()
// 		await self.updatePresets()
// 	} else if (!compareJson) {
// 		await this.checkSceneVariables(self)
// 		await self.updateFeedbacks()
// 		await self.updatePresets()
// 	}
// 	// self.log(
// 	// 	'info',
// 	// 	`SMODELIVE | SMODELIVE DATA SCENES RESULT >>> ${JSON.stringify(self.smodeLiveData.scenes, null, 4)}`
// 	// )
// },

// async getTimelineMarkers(self, uuid) {
// 	await this.httpSend(self, 'TIMELINEMAKERS', `/api/live/timelines/${uuid}/markers`)
// 	//self.log('info', `SMODELIVE | GET TIMELINE MAKERS >>> ${JSON.stringify(tlMakersTMP, null, 4)}`)
// 	return tlMakersTMP
// },

//
// ██████  ██████       ██ ███████  ██████ ████████ ███████
//██    ██ ██   ██      ██ ██      ██         ██    ██
//██    ██ ██████       ██ █████   ██         ██    ███████
//██    ██ ██   ██ ██   ██ ██      ██         ██         ██
// ██████  ██████   █████  ███████  ██████    ██    ███████
//
// async getObjects(self, filterClass) {
// 	self.log('info', `SMODELIVE | GET OBJECTS | START >>> ${filterClass}`)
// 	let fc = ''
// 	if (filterClass !== '') {
// 		fc = `?filterClass=${filterClass}`
// 	}
// 	this.httpSend(self, 'OBJECTS', `/api/live/objects${fc}`, filterClass)
// },

// // OBJECTS
// if (response.config.id === 'OBJECTS') {
// 	self.smodeLiveData.objects = response.data
// 	await this.checkStatus(self)
// 	if (response.config.filterClass === 'Scene') {
// 		this.getScenesInObjects(self)
// 	}
// }

// async getTimelinesUUID(self) {
// 	this.httpSend(self, 'TIMELINESUUID', `/api/live/animations`)
// },

// TIMELINESUUID
// if (response.config.id === 'TIMELINESUUID') {
// 	// console.log(response.data)
// 	// console.log(response.status)
// 	// console.log(response.statusText)
// 	// console.log(response.headers)
// 	// console.log(response.config)
// 	//self.log('warn', `SMODE LIVE | HTTP RESPONSE | TIMELINEs UUID >>> ${JSON.stringify(response.data, null, 4)}`)
// 	self.smodeLiveData.timelinesUUID = response.data
// 	this.getTimelinesList(self)
// 	return
// }
