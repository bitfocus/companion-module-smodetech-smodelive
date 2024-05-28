import { combineRgb } from '@companion-module/base'

export function getFeedbackDefinitions(self) {
	const feedbacks = {}

	// PARAMATERS
	Object.keys(self.smodeLiveData.parameters).forEach((key) => {

		let pOBJ = self.smodeLiveData.parameters[key]
		const rgb = [
			Math.ceil(pOBJ.colorLabel.red * 255),
			Math.ceil(pOBJ.colorLabel.green * 255),
			Math.ceil(pOBJ.colorLabel.blue * 255),
		]
		feedbacks[`${pOBJ.uuid}_index`] = {
			name: `${pOBJ.label}`,
			type: 'boolean',
			label: `${pOBJ.label}`,
			defaultStyle: {
				bgcolor: combineRgb(rgb[0], rgb[1], rgb[2]),
				color: combineRgb(0, 0, 0),
			},
			options: [],
			callback: function (feedback) {
				if (self.getVariableValue(`bank_${pOBJ.parentUuid}_currentStateIndex`) === pOBJ.index) {
					return true
				}
			},
		}
	})

	//████████ ██ ███    ███ ███████ ██      ██ ███    ██ ███████ ███████
	//   ██    ██ ████  ████ ██      ██      ██ ████   ██ ██      ██
	//   ██    ██ ██ ████ ██ █████   ██      ██ ██ ██  ██ █████   ███████
	//   ██    ██ ██  ██  ██ ██      ██      ██ ██  ██ ██ ██           ██
	//   ██    ██ ██      ██ ███████ ███████ ██ ██   ████ ███████ ███████
	//

	Object.keys(self.smodeLiveData.timelines).forEach((key) => {
		let tlOBJ = self.smodeLiveData.timelines[key]
		const fbTS = `${key}_playing`
		const fbLoop = `${key}_loop`
		const rgb = [
			Math.ceil(tlOBJ.colorLabel.red * 255),
			Math.ceil(tlOBJ.colorLabel.green * 255),
			Math.ceil(tlOBJ.colorLabel.blue * 255),
		]
		feedbacks[fbTS] = {
			name: `${tlOBJ.label} Playing`,
			type: 'boolean',
			label: `${tlOBJ.label} Playing`,
			defaultStyle: {
				bgcolor: combineRgb(rgb[0], rgb[1], rgb[2]),
				color: combineRgb(0, 0, 0),
			},
			options: [],
			callback: function (feedback) {
				if (self.getVariableValue(`tl_${key}_playing`) === false) {
					return true
				}
			},
		}
		feedbacks[fbLoop] = {
			name: `${tlOBJ.label} Looping`,
			type: 'boolean',
			label: `${tlOBJ.label} Looping`,
			defaultStyle: {
				bgcolor: combineRgb(rgb[0], rgb[1], rgb[2]),
				color: combineRgb(0, 0, 0),
			},
			options: [],
			callback: function (feedback) {
				if (self.getVariableValue(`tl_${key}_looping`) === true) {
					return true
				}
			},
		}
	})

	//███████  ██████ ███████ ███    ██ ███████ ███████
	//██      ██      ██      ████   ██ ██      ██
	//███████ ██      █████   ██ ██  ██ █████   ███████
	//     ██ ██      ██      ██  ██ ██ ██           ██
	//███████  ██████ ███████ ██   ████ ███████ ███████
	//
	Object.keys(self.smodeLiveData.scenes).forEach((key) => {
		let sceneOBJ = self.smodeLiveData.scenes[key]
		const fbAC = `${key}_activation`
		const fbLD = `${key}_loading`
		const rgb = [
			Math.ceil(sceneOBJ.colorLabel.red * 255),
			Math.ceil(sceneOBJ.colorLabel.green * 255),
			Math.ceil(sceneOBJ.colorLabel.blue * 255),
		]

		feedbacks[fbAC] = {
			name: `${sceneOBJ.label} activation`,
			type: 'boolean',
			label: `${sceneOBJ.label} activation`,
			defaultStyle: {
				bgcolor: combineRgb(rgb[0], rgb[1], rgb[2]),
				color: combineRgb(0, 0, 0),
			},
			options: [],
			callback: function (feedback) {
				if (self.getVariableValue(`scene_${key}_activation`) === 'inactive') {
					return true
				}
			},
		}

		feedbacks[fbLD] = {
			name: `${sceneOBJ.label} loading`,
			type: 'boolean',
			label: `${sceneOBJ.label} loading`,
			defaultStyle: {
				bgcolor: combineRgb(rgb[0], rgb[1], rgb[2]),
				color: combineRgb(0, 0, 0),
			},
			options: [],
			callback: function (feedback) {
				if (self.getVariableValue(`scene_${key}_loading`) === 'inactive') {
					return true
				}
			},
		}
	})

	//██████  ███████ ██    ██ ██  ██████ ███████ ███████
	//██   ██ ██      ██    ██ ██ ██      ██      ██
	//██   ██ █████   ██    ██ ██ ██      █████   ███████
	//██   ██ ██       ██  ██  ██ ██      ██           ██
	//██████  ███████   ████   ██  ██████ ███████ ███████
	//
	Object.keys(self.smodeLiveData.devices).forEach((key) => {
		let deviceOBJ = self.smodeLiveData.devices[key]
		const fbMT = `${deviceOBJ.uuid}_isMuted`
		feedbacks[fbMT] = {
			name: `${deviceOBJ.label} isMuted`,
			type: 'boolean',
			label: `${deviceOBJ.label} isMuted`,
			defaultStyle: {
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			options: [],
			callback: function (feedback) {
				if (self.getVariableValue(`device_${deviceOBJ.uuid}_isMuted`) === true) {
					return true
				}
			},
		}
	})

	// ██████  ███    ██      █████  ██ ██████
	//██    ██ ████   ██     ██   ██ ██ ██   ██
	//██    ██ ██ ██  ██     ███████ ██ ██████
	//██    ██ ██  ██ ██     ██   ██ ██ ██   ██
	// ██████  ██   ████     ██   ██ ██ ██   ██
	//
	feedbacks['on_air'] = {
		name: 'Smode On Air',
		type: 'boolean',
		label: 'Smode On Air',
		defaultStyle: {
			bgcolor: combineRgb(32, 32, 32),
			color: combineRgb(65, 65, 65),
		},
		options: [],
		callback: function (feedback) {
			if (self.getVariableValue(`status_on_air`)) {
				return true
			}
		},
	}

	//███████  ██████  ██████      ███    ███  ██████  ██████  ███████
	//██      ██      ██    ██     ████  ████ ██    ██ ██   ██ ██
	//█████   ██      ██    ██     ██ ████ ██ ██    ██ ██   ██ █████
	//██      ██      ██    ██     ██  ██  ██ ██    ██ ██   ██ ██
	//███████  ██████  ██████      ██      ██  ██████  ██████  ███████
	//
	feedbacks['eco_mode'] = {
		name: 'Smode Power Save Mode',
		type: 'boolean',
		label: 'Smode Power Save Mode',
		defaultStyle: {
			bgcolor: combineRgb(32, 32, 32),
			color: combineRgb(65, 65, 65),
		},
		options: [],
		callback: function (feedback) {
			if (self.getVariableValue(`status_eco_mode`)) {
				return true
			}
		},
	}

	// ██████  ██    ██ ████████ ██████  ██    ██ ████████
	//██    ██ ██    ██    ██    ██   ██ ██    ██    ██
	//██    ██ ██    ██    ██    ██████  ██    ██    ██
	//██    ██ ██    ██    ██    ██      ██    ██    ██
	// ██████   ██████     ██    ██       ██████     ██
	//
	feedbacks['output'] = {
		name: 'Smode Output',
		type: 'boolean',
		label: 'Smode Output',
		defaultStyle: {
			bgcolor: combineRgb(32, 32, 32),
			color: combineRgb(65, 65, 65),
		},
		options: [],
		callback: function (feedback) {
			if (self.getVariableValue(`status_output`) === 'active') {
				return true
			}
		},
	}

	//███████ ████████  █████  ████████ ██    ██ ███████
	//██         ██    ██   ██    ██    ██    ██ ██
	//███████    ██    ███████    ██    ██    ██ ███████
	//     ██    ██    ██   ██    ██    ██    ██      ██
	//███████    ██    ██   ██    ██     ██████  ███████
	//
	feedbacks['smode_state'] = {
		name: 'Smode state',
		type: 'boolean',
		label: 'Smode Running',
		defaultStyle: {
			bgcolor: combineRgb(255, 0, 0),
			color: combineRgb(255, 255, 255),
		},
		options: [
			{
				id: 'smodeState',
				type: 'number',
				label: 'State',
				default: 0,
			},
		],
		callback: function (feedback) {
			let stateNumber = -1
			if (self.smodeLiveData.status.state == 'running') {
				stateNumber = 0
			}
			if (stateNumber === feedback.options.smodeState) {
				return true
			}
		},
	}

	//███████ ████████  █████  ████████ ██ ███████ ████████ ██  ██████
	//██         ██    ██   ██    ██    ██ ██         ██    ██ ██
	//███████    ██    ███████    ██    ██ ███████    ██    ██ ██
	//	   ██    ██    ██   ██    ██    ██      ██    ██    ██ ██
	//███████    ██    ██   ██    ██    ██ ███████    ██    ██  ██████
	//
	feedbacks['vramStep0'] = {
		name: 'VRam00',
		type: 'boolean',
		label: 'VRam Step 00',
		defaultStyle: {
			bgcolor: combineRgb(0, 255, 0),
			color: combineRgb(255, 255, 255),
		},
		options: [
			{
				id: 'step',
				type: 'number',
				label: 'Step',
				default: 50,
			},
		],
		callback: function (feedback) {
			if (self.smodeLiveData.staticstics.vramPC <= feedback.options.step) {
				return true
			}
		},
	}

	feedbacks['vramStep1'] = {
		name: 'VRam01',
		type: 'boolean',
		label: 'VRam Step 01',
		defaultStyle: {
			bgcolor: combineRgb(255, 191, 0),
			color: combineRgb(255, 255, 255),
		},
		options: [
			{
				id: 'step',
				type: 'number',
				label: 'Step',
				default: 80,
			},
		],
		callback: function (feedback) {
			if (
				self.smodeLiveData.staticstics.vramPC <= feedback.options.step &&
				self.smodeLiveData.staticstics.vramPC >= 50
			) {
				return true
			}
		},
	}

	feedbacks['vramStep2'] = {
		name: 'VRam02',
		type: 'boolean',
		label: 'VRam Step 02',
		defaultStyle: {
			bgcolor: combineRgb(255, 0, 0),
			color: combineRgb(255, 255, 255),
		},
		options: [
			{
				id: 'step',
				type: 'number',
				label: 'Step',
				default: 80,
			},
		],
		callback: function (feedback) {
			if (self.smodeLiveData.staticstics.vramPC > feedback.options.step) {
				return true
			}
		},
	}

	self.setFeedbackDefinitions(feedbacks)
}

// CONTENTS
// Object.keys(self.smodeLiveData.contents).forEach((key) => {
// 	let ctOBJ = self.smodeLiveData.contents[key]
// 	//self.log('info', `FEEDBACKS | CONTENTS >>> ${JSON.stringify(ctOBJ, null, 4)}`)
// 	const fbAC = `${ctOBJ.uuid}_activation`
// 	const fbLD = `${ctOBJ.uuid}_loading`
// 	const rgb = [
// 		Math.ceil(ctOBJ.colorLabel.red * 255),
// 		Math.ceil(ctOBJ.colorLabel.green * 255),
// 		Math.ceil(ctOBJ.colorLabel.blue * 255),
// 	]

// 	feedbacks[fbAC] = {
// 		name: `${ctOBJ.label} activation`,
// 		type: 'boolean',
// 		label: `${ctOBJ.label} activation`,
// 		defaultStyle: {
// 			bgcolor: combineRgb(rgb[0], rgb[1], rgb[2]),
// 			color: combineRgb(0, 0, 0),
// 		},
// 		options: [],
// 		callback: function (feedback) {
// 			//console.log(`FEEDBACK | SCENES ACTION`)
// 			if (self.getVariableValue(`${ctOBJ.uuid}_activation`) === "inactive") {
// 				return true
// 			}
// 		},
// 	}

// 	feedbacks[fbLD] = {
// 		name: `${ctOBJ.label} loading`,
// 		type: 'boolean',
// 		label: `${ctOBJ.label} loading`,
// 		defaultStyle: {
// 			bgcolor: combineRgb(rgb[0], rgb[1], rgb[2]),
// 			color: combineRgb(0, 0, 0),
// 		},
// 		options: [],
// 		callback: function (feedback) {
// 			//console.log(`FEEDBACK | SCENES LOADING`)
// 			if (self.getVariableValue(`${ctOBJ.uuid}_loading`) === "inactive") {
// 				return true
// 			}
// 		},
// 	}
// })
