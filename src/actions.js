import axios from 'axios'
import { smodeLive } from './smode_live.js'
import { HttpPatchOptions, HttpPostOptions } from './httpObject.js'

export function getActionDefinitions(self) {
	self.setActionDefinitions({
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
				await smodeLive.getTimelinesUUID(self)
			},
		},

		makersMove: {
			name: 'TimeLines Maker Move',
			tooltip: 'TimeLines Maker Move',
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
					'TL_MOVE',
					`/api/live/timelines/markers/${action.options.uuid}/move`
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
						}
					})
					.catch(function (error) {
						console.log(error)
						this.httpError(self, 'TLMOVE', error)
					})
			},
		},

		tlTransportPlaying: {
			name: 'TimeLines Play Pause',
			tooltip: 'TimeLines Play Pause',
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
				if (self.getVariableValue(`tl_${action.options.uuid}_transport_playing`) === true) val = 'pause'
				// AXIOS
				const postOptions = new HttpPostOptions(
					self,
					'TL_PLAYING',
					`/api/live/trigger/${action.options.uuid}?variablePath==transport.${val}`
				)
				axios
					.request(postOptions)
					.then(async function (response) {
						if (response.status === 200) {
							await smodeLive.getTimelinesUUID(self)
							await smodeLive.checkTimeLinesVariables(self)
						}
					})
					.catch(function (error) {
						console.log(error)
						this.httpError(self, 'TLPLAYING', error)
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
					`/api/live/trigger/${action.options.uuid}?variablePath=transport.reset`
				)
				axios
					.request(postOptions)
					.then(async function (response) {
						if (response.status === 200) {
						}
					})
					.catch(function (error) {
						console.log(error)
						this.httpError(self, 'TLRESET', error)
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
					`/api/live/trigger/${action.options.uuid}?variablePath=transport.finalize`
				)
				axios
					.request(postOptions)
					.then(async function (response) {
						if (response.status === 200) {
						}
					})
					.catch(function (error) {
						console.log(error)
						this.httpError(self, 'TLFINALIZE', error)
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
					`/api/live/trigger/${action.options.uuid}?variablePath=transport.next`
				)
				axios
					.request(postOptions)
					.then(async function (response) {
						if (response.status === 200) {
						}
					})
					.catch(function (error) {
						console.log(error)
						this.httpError(self, 'TLNEXT', error)
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
					`/api/live/trigger/${action.options.uuid}?variablePath=transport.previous`,
				)
				axios
					.request(postOptions)
					.then(async function (response) {
						if (response.status === 200) {
						}
					})
					.catch(function (error) {
						console.log(error)
						this.httpError(self, 'TLPREVIOUS', error)
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
				if (self.getVariableValue(`tl_${action.options.uuid}_parameters_looping`) === true) val = false
				// AXIOS
				const patchOptions = new HttpPatchOptions(
					self,
					'TL_LOOPING',
					`/api/live/objects/${action.options.uuid}?variablePath=parameters.looping`,
					{ value: val },
				)

				self.log("info", `ACTIONS | TL LOOPING >>> ${patchOptions.url}\n${JSON.stringify(patchOptions.data,null,4)} `)
	
				axios
					.request(patchOptions)
					.then(async function (response) {
						console.log(response.data)
						console.log(response.status)
						console.log(response.statusText)
						console.log(response.headers)
						console.log(response.config)
						if (response.status === 200) {
							await smodeLive.getTimelinesUUID(self)
							await smodeLive.checkTimeLinesVariables(self)
						}
					})
					.catch(function (error) {
						console.log(error)
						this.httpError(self, 'TLLOOPING', error)
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
				await smodeLive.getObjects(self, 'Scene')
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
				let scenes = self.smodeLiveData.scenes
				let val = false
				if (self.getVariableValue(`scene_${action.options.uuid}_activation`) === 'inactive') val = true
				// AXIOS
				const patchOptions = new HttpPatchOptions(
					self,
					'SCENEACTIVETOOGLE',
					`/api/live/objects/${action.options.uuid}?variablePath=activation`,
					{ value: val }
				)

				//self.log("info", `ACTIONS | SCENE ACTIVATION TOGGLE >>> ${patchOptions.url}\n${JSON.stringify(patchOptions.data,null,4)} `)

				axios
					.request(patchOptions)
					.then(async function (response) {
						console.log(response.data)
						console.log(response.status)
						console.log(response.statusText)
						console.log(response.headers)
						console.log(response.config)
						if (response.status === 200) {
							Object.keys(scenes).forEach((key) => {
								if ((key = action.options.uuid)) {
									scenes[key].activation = response.data.activation
									smodeLive.checkSceneVariables(self)
								}
							})
						}
					})
					.catch(function (error) {
						console.log(error)
						this.httpError(self, 'SCENEACTIVETOOGLE', error)
					})
			},
		},

		sceneActivationOn: {
			name: 'Scene Activation On',
			tooltip: 'Scene Activation On',
			options: [
				{
					id: 'uuid',
					type: 'textinput',
					label: 'UUID',
					default: '0',
				},
			],
			callback: async (action, context) => {
				let scenes = self.smodeLiveData.scenes
				// AXIOS
				const patchOptions = new HttpPatchOptions(
					self,
					'SCENEACTIVEON',
					`/api/live/objects/${action.options.uuid}?variablePath=activation`,
					{ value: true }
				)
				axios
					.request(patchOptions)
					.then(async function (response) {
						if (response.status === 200) {
							Object.keys(scenes).forEach((key) => {
								if ((key = action.options.uuid)) {
									scenes[key].activation = response.data.activation
									smodeLive.checkSceneVariables(self)
								}
							})
						}
					})
					.catch(function (error) {
						console.log(error)
						this.httpError(self, 'SCENEACTIVEON', error)
					})
			},
		},

		sceneActivationOff: {
			name: 'Scene Activation Off',
			tooltip: 'Scene Activation Off',
			options: [
				{
					id: 'uuid',
					type: 'textinput',
					label: 'UUID',
					default: '0',
				},
			],
			callback: async (action, context) => {
				let scenes = self.smodeLiveData.scenes
				// AXIOS
				const patchOptions = new HttpPatchOptions(
					self,
					'SCENEACTIVEOFF',
					`/api/live/objects/${action.options.uuid}?variablePath=activation`,
					{ value: false }
				)
				axios
					.request(patchOptions)
					.then(async function (response) {
						if (response.status === 200) {
							Object.keys(scenes).forEach((key) => {
								if ((key = action.options.uuid)) {
									scenes[key].activation = response.data.activation
									smodeLive.checkSceneVariables(self)
								}
							})
						}
					})
					.catch(function (error) {
						console.log(error)
						this.httpError(self, 'SCENEACTIVEOFF', error)
					})
			},
		},

		sceneLoadingToogle: {
			name: 'Scene Loading Toggle',
			tooltip: 'Scene Loading Toggle',
			options: [
				{
					id: 'uuid',
					type: 'textinput',
					label: 'UUID',
					default: '0',
				},
			],
			callback: async (action, context) => {
				let scenes = self.smodeLiveData.scenes
				let val = false
				if (self.getVariableValue(`scene_${action.options.uuid}_loading`) === 'inactive') val = true
				// AXIOS
				const patchOptions = new HttpPatchOptions(
					self,
					'SCENELOADINGTOOGLE',
					`/api/live/objects/${action.options.uuid}?variablePath=loading`,
					{ value: val },
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
							Object.keys(scenes).forEach((key) => {
								if ((key = action.options.uuid)) {
									scenes[key].loading = response.data.loading
									smodeLive.checkSceneVariables(self)
								}
							})
						}
					})
					.catch(function (error) {
						console.log(error)
						this.httpError(self, 'SCENELOADINGTOOGLE', error)
					})
			},
		},

		sceneLoadingOn: {
			name: 'Scene Loading On',
			tooltip: 'Scene Loading On',
			options: [
				{
					id: 'uuid',
					type: 'textinput',
					label: 'UUID',
					default: '0',
				},
			],
			callback: async (action, context) => {
				let scenes = self.smodeLiveData.scenes
				// AXIOS
				const patchOptions = new HttpPatchOptions(
					self,
					'SCENELOADINGON',
					`/api/live/objects/${action.options.uuid}?variablePath=loading`,
					{ value: true },
				)
				axios
					.request(patchOptions)
					.then(async function (response) {
						if (response.status === 200) {
							Object.keys(scenes).forEach((key) => {
								if ((key = action.options.uuid)) {
									scenes[key].loading = response.data.loading
									smodeLive.checkSceneVariables(self)
								}
							})
						}
					})
					.catch(function (error) {
						console.log(error)
						this.httpError(self, 'SCENELOADINGON', error)
					})
			},
		},

		sceneLoadingOff: {
			name: 'Scene Loading Off',
			tooltip: 'Scene Loading Off',
			options: [
				{
					id: 'uuid',
					type: 'textinput',
					label: 'UUID',
					default: '0',
				},
			],
			callback: async (action, context) => {
				let scenes = self.smodeLiveData.scenes
				// AXIOS
				const patchOptions = new HttpPatchOptions(
					self,
					'SCENELOADINGOFF',
					`/api/live/objects/${action.options.uuid}?variablePath=loading`,
					{ value: false },
				)
				axios
					.request(patchOptions)
					.then(async function (response) {
						if (response.status === 200) {
							Object.keys(scenes).forEach((key) => {
								if ((key = action.options.uuid)) {
									scenes[key].loading = response.data.loading
									smodeLive.checkSceneVariables(self)
								}
							})
						}
					})
					.catch(function (error) {
						console.log(error)
						this.httpError(self, 'SCENELOADINGOFF', error)
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
					{ value: val },
				)

				axios
					.request(patchOptions)
					.then(async function (response) {
						if (response.status === 200 && response.data.state === 'success') {
							smodeLive.getDevices(self)
						}
					})
					.catch(function (error) {
						console.log(error)
						this.httpError(self, 'SET ON AIR', error)
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
						console.log(error)
						this.httpError(self, 'SET ON AIR', error)
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
						console.log(error)
						this.httpError(self, 'SET ECO MODE', error)
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
						console.log(error)
						this.httpError(self, 'SET OUTPUT', error)
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
