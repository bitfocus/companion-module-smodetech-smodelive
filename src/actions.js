import axios from 'axios'
import { smodeLive } from './smode_live.js'
import { HttpPatchOptions, HttpPostOptions } from './httpObject.js'

export function getActionDefinitions(self) {
	self.setActionDefinitions({
		// ██████  ██████  ███    ██ ████████ ███████ ███    ██ ████████ ███████ 
		// ██      ██    ██ ████   ██    ██    ██      ████   ██    ██    ██      
		// ██      ██    ██ ██ ██  ██    ██    █████   ██ ██  ██    ██    ███████ 
		// ██      ██    ██ ██  ██ ██    ██    ██      ██  ██ ██    ██         ██ 
		//  ██████  ██████  ██   ████    ██    ███████ ██   ████    ██    ███████ 
		// 
		getContentsAction: {
			name: 'Get Contents',
			tooltip: 'Smode Live Get Contents',
			options: [],
			callback: async (action, context) => {
				await smodeLive.getContents(self)
			},
		},

		//████████ ██ ███    ███ ███████ ██      ██ ███    ██ ███████ ███████
		//   ██    ██ ████  ████ ██      ██      ██ ████   ██ ██      ██
		//   ██    ██ ██ ████ ██ █████   ██      ██ ██ ██  ██ █████   ███████
		//   ██    ██ ██  ██  ██ ██      ██      ██ ██  ██ ██ ██           ██
		//   ██    ██ ██      ██ ███████ ███████ ██ ██   ████ ███████ ███████
		//
		getTimelinesActions: {
			name: 'Get TimeLines',
			tooltip: 'Smode Live Get TimeLines',
			options: [],
			callback: async (action, context) => {
				await smodeLive.getTimelinesList(self)
			},
		},

		markersMove: {
			name: 'TimeLines Marker Move',
			tooltip: 'TimeLines Marker Move',
			options: [
				{
					id: 'uuid',
					type: 'textinput',
					label: 'UUID',
					default: '0',
				},
			],
			callback: async (action, context) => {
				// AXIOS
				const postOptions = new HttpPostOptions(
					self,
					'MARKERMOVE',
					`/api/live/animations/${action.options.uuid}/move`
				)
				axios
					.request(postOptions)
					.then(async function (response) {
						console.log(response.data)
						console.log(response.status)
						console.log(response.statusText)
						console.log(response.headers)
						console.log(response.config)
						if (response.status === 200) {
						}
					})
					.catch(function (error) {
						
						smodeLive.actionsError(self, 'MARKERMOVE', error)
					})
			},
		},

		tlPlayingToggle: {
			name: 'TimeLine Play Pause',
			tooltip: 'TimeLine Play Pause',
			options: [
				{
					id: 'uuid',
					type: 'textinput',
					label: 'UUID',
					default: '0',
				},
			],
			callback: async (action, context) => {
				let val = 'play'
				if (self.getVariableValue(`tl_${action.options.uuid}_playing`) === true) val = 'pause'
				// AXIOS
				const postOptions = new HttpPostOptions(
					self,
					'TLPLAYING',
					`/api/live/animations/${action.options.uuid}/trigger?state=${val}`
				)
				axios
					.request(postOptions)
					.then(async function (response) {
						console.log(response.data)
						console.log(response.status)
						console.log(response.statusText)
						console.log(response.headers)
						console.log(response.config)
						if (response.status === 200) {
							let tl = self.smodeLiveData.timelines
							tl[action.options.uuid].transport.playing = response.data.transport.playing
							await smodeLive.checkTimeLinesVariables(self)
						}
					})
					.catch(function (error) {
						smodeLive.actionsError(self, 'TLPLAYING', error)
					})
			},
		},

		tlPlay: {
			name: 'TimeLine Play',
			tooltip: 'TimeLine Play',
			options: [
				{
					id: 'uuid',
					type: 'textinput',
					label: 'UUID',
					default: '0',
				},
			],
			callback: async (action, context) => {
				// AXIOS
				const postOptions = new HttpPostOptions(
					self,
					'TLPLAY',
					`/api/live/animations/${action.options.uuid}/trigger?state=play`
				)
				axios
					.request(postOptions)
					.then(async function (response) {
						// console.log(response.data)
						// console.log(response.status)
						// console.log(response.statusText)
						// console.log(response.headers)
						// console.log(response.config)
						if (response.status === 200) {
							let tl = self.smodeLiveData.timelines
							tl[action.options.uuid].transport.playing = response.data.transport.playing
							await smodeLive.checkTimeLinesVariables(self)
						}
					})
					.catch(function (error) {
						smodeLive.actionsError(self, 'TLPLAY', error)
					})
			},
		},

		tlPause: {
			name: 'TimeLine Pause',
			tooltip: 'TimeLine Pause',
			options: [
				{
					id: 'uuid',
					type: 'textinput',
					label: 'UUID',
					default: '0',
				},
			],
			callback: async (action, context) => {
				// AXIOS
				const postOptions = new HttpPostOptions(
					self,
					'TLPAUSE',
					`/api/live/animations/${action.options.uuid}/trigger?state=pause`
				)
				axios
					.request(postOptions)
					.then(async function (response) {
						// console.log(response.data)
						// console.log(response.status)
						// console.log(response.statusText)
						// console.log(response.headers)
						// console.log(response.config)
						if (response.status === 200) {
							let tl = self.smodeLiveData.timelines
							tl[action.options.uuid].transport.playing = response.data.transport.playing
							await smodeLive.checkTimeLinesVariables(self)
						}
					})
					.catch(function (error) {
						smodeLive.actionsError(self, 'TLPAUSE', error)
					})
			},
		},

		tlReset: {
			name: 'TimeLines Reset',
			tooltip: 'TimeLines Reset',
			options: [
				{
					id: 'uuid',
					type: 'textinput',
					label: 'UUID',
					default: '0',
				},
			],
			callback: async (action, context) => {
				// AXIOS
				const postOptions = new HttpPostOptions(
					self,
					'TL_RESET',
					`/api/live/animations/${action.options.uuid}/trigger?state=reset`
				)
				axios
					.request(postOptions)
					.then(async function (response) {
						if (response.status === 200) {
							let tl = self.smodeLiveData.timelines
							tl[action.options.uuid].transport.playing = response.data.transport.playing
							await smodeLive.checkTimeLinesVariables(self)
						}
					})
					.catch(function (error) {
						smodeLive.actionsError(self, 'TLRESET', error)
					})
			},
		},

		tlFinalize: {
			name: 'TimeLines Finalize',
			tooltip: 'TimeLines Finalize',
			options: [
				{
					id: 'uuid',
					type: 'textinput',
					label: 'UUID',
					default: '0',
				},
			],
			callback: async (action, context) => {
				// AXIOS
				const postOptions = new HttpPostOptions(
					self,
					'TL_FINALIZE',
					`/api/live/animations/${action.options.uuid}/trigger?state=finalize`
				)
				axios
					.request(postOptions)
					.then(async function (response) {
						if (response.status === 200) {
							let tl = self.smodeLiveData.timelines
							tl[action.options.uuid].transport.playing = response.data.transport.playing
							await smodeLive.checkTimeLinesVariables(self)
						}
					})
					.catch(function (error) {
						smodeLive.actionsError(self, 'TLFINALIZE', error)
					})
			},
		},

		tlNext: {
			name: 'TimeLines Next',
			tooltip: 'TimeLines Next',
			options: [
				{
					id: 'uuid',
					type: 'textinput',
					label: 'UUID',
					default: '0',
				},
			],
			callback: async (action, context) => {
				// AXIOS
				const postOptions = new HttpPostOptions(
					self,
					'TL_NEXT',
					`/api/live/animations/${action.options.uuid}/trigger?state=next`
				)
				axios
					.request(postOptions)
					.then(async function (response) {
						if (response.status === 200) {
							let tl = self.smodeLiveData.timelines
							tl[action.options.uuid].transport.playing = response.data.transport.playing
							await smodeLive.checkTimeLinesVariables(self)
						}
					})
					.catch(function (error) {
						smodeLive.actionsError(self, 'TLNEXT', error)
					})
			},
		},

		tlPrevious: {
			name: 'TimeLines Previous',
			tooltip: 'TimeLines Previous',
			options: [
				{
					id: 'uuid',
					type: 'textinput',
					label: 'UUID',
					default: '0',
				},
			],
			callback: async (action, context) => {
				// AXIOS
				const postOptions = new HttpPostOptions(
					self,
					'TL_PREVIOUS',
					`/api/live/animations/${action.options.uuid}/trigger?state=previous`
				)
				axios
					.request(postOptions)
					.then(async function (response) {
						if (response.status === 200) {
							let tl = self.smodeLiveData.timelines
							tl[action.options.uuid].transport.playing = response.data.transport.playing
							await smodeLive.checkTimeLinesVariables(self)
						}
					})
					.catch(function (error) {
						smodeLive.actionsError(self, 'TLPREVIOUS', error)
					})
			},
		},

		tlLooping: {
			name: 'TimeLines Looping',
			tooltip: 'TimeLines Looping',
			options: [
				{
					id: 'uuid',
					type: 'textinput',
					label: 'UUID',
					default: '0',
				},
			],
			callback: async (action, context) => {
				let val = true
				if (self.getVariableValue(`tl_${action.options.uuid}_looping`) === true) val = false
				// AXIOS
				const patchOptions = new HttpPatchOptions(
					self,
					'TL_LOOPING',
					`/api/live/objects/${action.options.uuid}?variablePath=parameters.looping`,
					{ value: val }
				)

				self.log('info', `ACTIONS | TL LOOPING >>> ${patchOptions.url}\n${JSON.stringify(patchOptions.data, null, 4)} `)

				axios
					.request(patchOptions)
					.then(async function (response) {
						console.log(response.data)
						console.log(response.status)
						console.log(response.statusText)
						console.log(response.headers)
						console.log(response.config)
						if (response.status === 200) {
							let tl = self.smodeLiveData.timelines
							tl[action.options.uuid].parameters.looping = response.data.parameters.looping
							await smodeLive.checkTimeLinesVariables(self)
						}
					})
					.catch(function (error) {
						smodeLive.actionsError(self, 'TLLOOPING', error)
					})
			},
		},

		//
		//███████  ██████ ███████ ███    ██ ███████ ███████
		//██      ██      ██      ████   ██ ██      ██
		//███████ ██      █████   ██ ██  ██ █████   ███████
		//     ██ ██      ██      ██  ██ ██ ██           ██
		//███████  ██████ ███████ ██   ████ ███████ ███████
		//
		getScenesActions: {
			name: 'Get Scenes',
			tooltip: 'Smode Live Get Scenes',
			options: [],
			callback: async (action, context) => {
				await smodeLive.getScenesInContents(self)
			},
		},

		// SCENE ACTIVE TOOGLE
		sceneActivationToggle: {
			name: 'Scene Activation Toggle',
			tooltip: 'Scene Activation Toggle',
			options: [
				{
					id: 'uuid',
					type: 'textinput',
					label: 'UUID',
					default: '0',
				},
			],
			callback: async (action, context) => {
				let contents = self.smodeLiveData.scenes
				let val = false
				if (self.getVariableValue(`scene_${action.options.uuid}_activation`) === 'inactive') val = true
				self.log(
					'info',
					`ACTIONS | SCENE ACTIVATION TOGGLE >>> ${self.getVariableValue(`scene_${action.options.uuid}_activation`)}`
				)
				// AXIOS
				const patchOptions = new HttpPatchOptions(
					self,
					'SCENEACTIVETOOGLE',
					`/api/live/objects/${action.options.uuid}?variablePath=activation`,
					{ value: val }
				)

				self.log(
					'info',
					`ACTIONS | CONTENTS ACTIVATION TOGGLE >>> ${patchOptions.url}\n${JSON.stringify(patchOptions.data, null, 4)} `
				)

				axios
					.request(patchOptions)
					.then(async function (response) {
						console.log(response.data)
						console.log(response.status)
						console.log(response.statusText)
						console.log(response.headers)
						console.log(response.config)
						if (response.status === 200) {
							Object.keys(contents).forEach((key) => {
								if ((key = action.options.uuid)) {
									contents[key].activation = response.data.activation
									smodeLive.checkSceneVariables(self)
								}
							})
						}
					})
					.catch(function (error) {
						smodeLive.actionsError(self, 'CONTENTACTIVETOOGLE', error)
					})
			},
		},

		sceneActivationOn: {
			name: 'Contents Activation On',
			tooltip: 'Contents Activation On',
			options: [
				{
					id: 'uuid',
					type: 'textinput',
					label: 'UUID',
					default: '0',
				},
			],
			callback: async (action, context) => {
				let contents = self.smodeLiveData.scenes
				// AXIOS
				const patchOptions = new HttpPatchOptions(
					self,
					'CONTENTACTIVEON',
					`/api/live/objects/${action.options.uuid}?variablePath=activation`,
					{ value: true }
				)
				axios
					.request(patchOptions)
					.then(async function (response) {
						if (response.status === 200) {
							Object.keys(contents).forEach((key) => {
								if ((contents[key].uuid = action.options.uuid)) {
									contents[key].activation = response.data.activation
									smodeLive.checkSceneVariables(self)
								}
							})
						}
					})
					.catch(function (error) {
						smodeLive.actionsError(self, 'CONTENTACTIVEON', error)
					})
			},
		},

		sceneActivationOff: {
			name: 'Contents Activation Off',
			tooltip: 'Contents Activation Off',
			options: [
				{
					id: 'uuid',
					type: 'textinput',
					label: 'UUID',
					default: '0',
				},
			],
			callback: async (action, context) => {
				let contents = self.smodeLiveData.scenes
				// AXIOS
				const patchOptions = new HttpPatchOptions(
					self,
					'CONTENTACTIVEOFF',
					`/api/live/objects/${action.options.uuid}?variablePath=activation`,
					{ value: false }
				)
				axios
					.request(patchOptions)
					.then(async function (response) {
						if (response.status === 200) {
							Object.keys(contents).forEach((key) => {
								if ((contents[key].uuid = action.options.uuid)) {
									contents[key].activation = response.data.activation
									smodeLive.checkSceneVariables(self)
								}
							})
						}
					})
					.catch(function (error) {
						smodeLive.actionsError(self, 'CONTENTACTIVEOFF', error)
					})
			},
		},

		sceneLoadingToogle: {
			name: 'Contents Loading Toggle',
			tooltip: 'Contents Loading Toggle',
			options: [
				{
					id: 'uuid',
					type: 'textinput',
					label: 'UUID',
					default: '0',
				},
			],
			callback: async (action, context) => {
				let contents = self.smodeLiveData.scenes
				let val = false
				if (self.getVariableValue(`scene_${action.options.uuid}_loading`) === 'inactive') val = true
				// AXIOS
				const patchOptions = new HttpPatchOptions(
					self,
					'CONTENTLOADINGTOOGLE',
					`/api/live/objects/${action.options.uuid}?variablePath=loading`,
					{ value: val }
				)
				axios
					.request(patchOptions)
					.then(async function (response) {
						console.log(response.data)
						console.log(response.status)
						console.log(response.statusText)
						console.log(response.headers)
						console.log(response.config)
						if (response.status === 200) {
							Object.keys(contents).forEach((key) => {
								if ((contents[key].uuid = action.options.uuid)) {
									contents[key].loading = response.data.loading
									smodeLive.checkSceneVariables(self)
								}
							})
						}
					})
					.catch(function (error) {
						smodeLive.actionsError(self, 'CONTENTLOADINGTOOGLE', error)
					})
			},
		},

		sceneLoadingOn: {
			name: 'Contents Loading On',
			tooltip: 'Contents Loading On',
			options: [
				{
					id: 'uuid',
					type: 'textinput',
					label: 'UUID',
					default: '0',
				},
			],
			callback: async (action, context) => {
				let contents = self.smodeLiveData.scenes
				// AXIOS
				const patchOptions = new HttpPatchOptions(
					self,
					'CONTENTLOADINGON',
					`/api/live/objects/${action.options.uuid}?variablePath=loading`,
					{ value: true }
				)
				axios
					.request(patchOptions)
					.then(async function (response) {
						if (response.status === 200) {
							Object.keys(contents).forEach((key) => {
								if ((contents[key].uuid = action.options.uuid)) {
									contents[key].loading = response.data.loading
									smodeLive.checkSceneVariables(self)
								}
							})
						}
					})
					.catch(function (error) {
						smodeLive.actionsError(self, 'CONTENTLOADINGON', error)
					})
			},
		},

		sceneLoadingOff: {
			name: 'Contents Loading Off',
			tooltip: 'Contents Loading Off',
			options: [
				{
					id: 'uuid',
					type: 'textinput',
					label: 'UUID',
					default: '0',
				},
			],
			callback: async (action, context) => {
				let contents = self.smodeLiveData.scenes
				// AXIOS
				const patchOptions = new HttpPatchOptions(
					self,
					'CONTENTLOADINGOFF',
					`/api/live/objects/${action.options.uuid}?variablePath=loading`,
					{ value: false }
				)
				axios
					.request(patchOptions)
					.then(async function (response) {
						if (response.status === 200) {
							Object.keys(contents).forEach((key) => {
								if ((contents[key].uuid = action.options.uuid)) {
									contents[key].loading = response.data.loading
									smodeLive.checkSceneVariables(self)
								}
							})
						}
					})
					.catch(function (error) {
						smodeLive.actionsError(self, 'CONTENTLOADINGOFF', error)
					})
			},
		},

		//██████  ███████ ██    ██ ██  ██████ ███████ ███████
		//██   ██ ██      ██    ██ ██ ██      ██      ██
		//██   ██ █████   ██    ██ ██ ██      █████   ███████
		//██   ██ ██       ██  ██  ██ ██      ██           ██
		//██████  ███████   ████   ██  ██████ ███████ ███████
		//
		devices_is_muted: {
			name: 'Devices Mute',
			options: [
				{
					id: 'uuid',
					type: 'textinput',
					label: 'UUID',
					default: '0',
				},
			],
			callback: async (action, context) => {
				let val = false
				if (self.getVariableValue(`device_${action.options.uuid}_isMuted`) === false) val = true
				// AXIOS
				const patchOptions = new HttpPatchOptions(
					self,
					'DEVICEMUTE',
					`/api/live/devices/${action.options.uuid}?variablePath=mute`,
					{ value: val }
				)

				axios
					.request(patchOptions)
					.then(async function (response) {
						console.log(response.data)
						console.log(response.status)
						console.log(response.statusText)
						console.log(response.headers)
						console.log(response.config)
						if (response.status === 200) {
							for (const device in self.smodeLiveData.devices){
								if (self.smodeLiveData.devices[device].uuid == action.options.uuid) {
									self.smodeLiveData.devices[device].isMuted = response.data
								}
							}
							smodeLive.checkDevicesVariables(self)
						}
					})
					.catch(function (error) {
						smodeLive.actionsError(self, 'SET ON AIR', error)
					})
			},
		},

		getDeviceActions: {
			name: 'Get Devices',
			tooltip: 'Smode Live Get Devices',
			options: [],
			callback: async (action, context) => {
				await smodeLive.getDevices(self)
			},
		},

		// ██████  ███    ██      █████  ██ ██████
		//██    ██ ████   ██     ██   ██ ██ ██   ██
		//██    ██ ██ ██  ██     ███████ ██ ██████
		//██    ██ ██  ██ ██     ██   ██ ██ ██   ██
		// ██████  ██   ████     ██   ██ ██ ██   ██
		//
		setOnAir: {
			name: 'On Air',
			tooltip: 'Smode Live On Air',
			options: [],
			callback: async (action) => {
				let val = false
				if (!self.getVariableValue(`status_on_air`)) val = true
				// AXIOS
				const patchOptions = new HttpPatchOptions(self, 'ONAIR', `/api/live/on-air`, { onAir: val })
				//self.log('info', `SMODE LIVE | HTTP RESPONSE | ONAIR OPTIONS >>> ${JSON.stringify(patchOptions, null, 4)}`)
				axios
					.request(patchOptions)
					.then(async function (response) {
						self.smodeLiveData.onAir = response.data
						await smodeLive.checkOnAir(self)
					})
					.catch(function (error) {
						smodeLive.actionsError(self, 'SET ON AIR', error)
					})
			},
		},

		//███████  ██████  ██████      ███    ███  ██████  ██████  ███████
		//██      ██      ██    ██     ████  ████ ██    ██ ██   ██ ██
		//█████   ██      ██    ██     ██ ████ ██ ██    ██ ██   ██ █████
		//██      ██      ██    ██     ██  ██  ██ ██    ██ ██   ██ ██
		//███████  ██████  ██████      ██      ██  ██████  ██████  ███████
		//
		setEcoMode: {
			name: 'Power Save Mode',
			tooltip: 'Smode Live Power Save Mode',
			options: [],
			callback: async (action) => {
				let val = false
				if (!self.getVariableValue(`status_eco_mode`)) val = true
				// AXIOS
				const patchOptions = new HttpPatchOptions(self, 'ECOMODE', `/api/live/eco-mode`, { ecoMode: val })
				self.log('info', `SMODE LIVE | HTTP RESPONSE | ECOMODE OPTIONS >>> ${JSON.stringify(patchOptions, null, 4)}`)
				axios
					.request(patchOptions)
					.then(async function (response) {
						self.smodeLiveData.onAir = response.data
						await smodeLive.checkEcoMode(self)
					})
					.catch(function (error) {
						smodeLive.actionsError(self, 'SET ECO MODE', error)
					})
			},
		},

		// ██████  ██    ██ ████████ ██████  ██    ██ ████████
		//██    ██ ██    ██    ██    ██   ██ ██    ██    ██
		//██    ██ ██    ██    ██    ██████  ██    ██    ██
		//██    ██ ██    ██    ██    ██      ██    ██    ██
		// ██████   ██████     ██    ██       ██████     ██
		//
		setOutPut: {
			name: 'Output',
			tooltip: 'Smode Live Output',
			options: [],
			callback: async (action) => {
				let val = false
				if (self.getVariableValue(`status_output`) === 'disabled') val = true
				// AXIOS
				const patchOptions = new HttpPatchOptions(self, 'OUTPUT', `/api/live/output`, { output: val })
				self.log('info', `SMODE LIVE | HTTP RESPONSE | OUTPUT OPTIONS >>> ${JSON.stringify(patchOptions, null, 4)}`)
				axios
					.request(patchOptions)
					.then(async function (response) {
						self.smodeLiveData.output = response.data
						await smodeLive.checkOutput(self)
					})
					.catch(function (error) {
						smodeLive.actionsError(self, 'SET OUTPUT', error)
					})
			},
		},

		//███████ ████████  █████  ████████ ██    ██ ███████
		//██         ██    ██   ██    ██    ██    ██ ██
		//███████    ██    ███████    ██    ██    ██ ███████
		//     ██    ██    ██   ██    ██    ██    ██      ██
		//███████    ██    ██   ██    ██     ██████  ███████
		//
		statusActions: {
			name: 'Get Status',
			tooltip: 'Smode Live Get Status',
			options: [],
			callback: async (action, context) => {
				await smodeLive.getSmodeLiveStatus(self)
			},
		},

		//███████ ████████  █████  ████████ ██ ███████ ████████ ██  ██████
		//██         ██    ██   ██    ██    ██ ██         ██    ██ ██
		//███████    ██    ███████    ██    ██ ███████    ██    ██ ██
		//	   ██    ██    ██   ██    ██    ██      ██    ██    ██ ██
		//███████    ██    ██   ██    ██    ██ ███████    ██    ██  ██████
		//
		statusActions: {
			name: 'Get Statistics',
			tooltip: 'Smode Live Get Statistics',
			options: [],
			callback: async (action, context) => {
				await smodeLive.getStatistics(self)
			},
		},

		//██    ██ ███████ ██████  ███████ ██  ██████  ███    ██
		//██    ██ ██      ██   ██ ██      ██ ██    ██ ████   ██
		//██    ██ █████   ██████  ███████ ██ ██    ██ ██ ██  ██
		// ██  ██  ██      ██   ██      ██ ██ ██    ██ ██  ██ ██
		//  ████   ███████ ██   ██ ███████ ██  ██████  ██   ████
		//
		versionActions: {
			name: 'Get Version',
			tooltip: 'Smode Live Get Version',
			options: [],
			callback: async (action, context) => {
				await smodeLive.getVersion(self)
			},
		},
	})
}
