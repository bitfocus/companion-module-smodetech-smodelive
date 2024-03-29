export function getVariables() {
	const variables = []

	//███████ ████████  █████  ████████ ██    ██ ███████
	//██         ██    ██   ██    ██    ██    ██ ██
	//███████    ██    ███████    ██    ██    ██ ███████
	//     ██    ██    ██   ██    ██    ██    ██      ██
	//███████    ██    ██   ██    ██     ██████  ███████
	//
	variables.push({ variableId: 'status_state', name: 'Smode Live State' })
	variables.push({ variableId: 'status_frame_rate', name: 'Frame rate' })
	// variables.push({ variableId: 'status_gpu_ram', name: 'GPU RAM' })
	// variables.push({ variableId: 'status_cpu_ram', name: 'CPU RAM' })
	variables.push({ variableId: 'status_on_air', name: 'ON AIR' })
	variables.push({ variableId: 'status_eco_mode', name: 'Power Save Mode' })
	variables.push({ variableId: 'status_output', name: 'Output' })

	//███████ ████████  █████  ████████ ██ ███████ ████████ ██  ██████
	//██         ██    ██   ██    ██    ██ ██         ██    ██ ██
	//███████    ██    ███████    ██    ██ ███████    ██    ██ ██
	//	   ██    ██    ██   ██    ██    ██      ██    ██    ██ ██
	//███████    ██    ██   ██    ██    ██ ███████    ██    ██  ██████
	//
	variables.push({ variableId: 'statistic_fps', name: 'FPS' })
	variables.push({ variableId: 'statistic_vram', name: 'VRam' })
	variables.push({ variableId: 'statistic_vramMax', name: 'VRam Max' })
	variables.push({ variableId: 'statistic_vramPC', name: 'VRam %' })

	//██    ██ ███████ ██████  ███████ ██  ██████  ███    ██
	//██    ██ ██      ██   ██ ██      ██ ██    ██ ████   ██
	//██    ██ █████   ██████  ███████ ██ ██    ██ ██ ██  ██
	// ██  ██  ██      ██   ██      ██ ██ ██    ██ ██  ██ ██
	//  ████   ███████ ██   ██ ███████ ██  ██████  ██   ████
	//
	variables.push({ variableId: 'ver_program', name: 'Progam Name' })
	variables.push({ variableId: 'ver_versionLong', name: 'Version' })
	variables.push({ variableId: 'ver_major', name: 'Major' })
	variables.push({ variableId: 'ver_minor', name: 'Minor' })
	variables.push({ variableId: 'ver_revision', name: 'Revision' })

	//██████  ███████ ██    ██ ██  ██████ ███████ ███████
	//██   ██ ██      ██    ██ ██ ██      ██      ██
	//██   ██ █████   ██    ██ ██ ██      █████   ███████
	//██   ██ ██       ██  ██  ██ ██      ██           ██
	//██████  ███████   ████   ██  ██████ ███████ ███████
	//
	if (this.smodeLiveData.devices != {}) {
		for (let d in this.smodeLiveData.devices) {
			variables.push({
				variableId: `device_${this.smodeLiveData.devices[d].uuid}_isMuted`,
				name: `${this.smodeLiveData.devices[d].label} isMuted`,
			})
			variables.push({
				variableId: `device_${this.smodeLiveData.devices[d].uuid}_name`,
				name: `${this.smodeLiveData.devices[d].label} name`,
			})
		}
	}

	//███████  ██████ ███████ ███    ██ ███████ ███████
	//██      ██      ██      ████   ██ ██      ██
	//███████ ██      █████   ██ ██  ██ █████   ███████
	//     ██ ██      ██      ██  ██ ██ ██           ██
	//███████  ██████ ███████ ██   ████ ███████ ███████
	//
	if (this.smodeLiveData.scenes != {}) {
		let scenes = this.smodeLiveData.scenes
		Object.keys(scenes).forEach((key) => {
			variables.push({
				variableId: `scene_${key}_uuid`,
				name: `${scenes[key].label} uuid`,
			})
			variables.push({
				variableId: `scene_${key}_activation`,
				name: `${scenes[key].label} activation`,
			})
			variables.push({
				variableId: `scene_${key}_loading`,
				name: `${scenes[key].label} loading`,
			})
			variables.push({
				variableId: `scene_${key}_name`,
				name: `${scenes[key].label} name`,
			})
			// variables.push({
			// 	variableId: `scene_${key}_color`,
			// 	name: `${scenes[key].label} color`,
			// })
		})
	}

	//████████ ██ ███    ███ ███████ ██      ██ ███    ██ ███████ ███████
	//   ██    ██ ████  ████ ██      ██      ██ ████   ██ ██      ██
	//   ██    ██ ██ ████ ██ █████   ██      ██ ██ ██  ██ █████   ███████
	//   ██    ██ ██  ██  ██ ██      ██      ██ ██  ██ ██ ██           ██
	//   ██    ██ ██      ██ ███████ ███████ ██ ██   ████ ███████ ███████
	//
	if (this.smodeLiveData.timelines != {}) {
		let tl = this.smodeLiveData.timelines
		Object.keys(tl).forEach((key) => {
			variables.push({
				variableId: `tl_${key}_uuid`,
				name: `${tl[key].parent} ${tl[key].label} uuid`,
			})
			variables.push({
				variableId: `tl_${key}_activation`,
				name: `${tl[key].parent} ${tl[key].label} activation`,
			})
			variables.push({
				variableId: `tl_${key}_loading`,
				name: `${tl[key].parent} ${tl[key].label} loading`,
			})
			variables.push({
				variableId: `tl_${key}_name`,
				name: `${tl[key].parent} ${tl[key].label} name`,
			})
			variables.push({
				variableId: `tl_${key}_parent`,
				name: `${tl[key].parent} ${tl[key].label} parent`,
			})
			// variables.push({
			// 	variableId: `tl_${key}_color`,
			// 	name: `${tl[key].parent} ${tl[key].label} color`,
			// })
			variables.push({
				variableId: `tl_${key}_playing`,
				name: `${tl[key].parent} ${tl[key].label} playing`,
			})
			variables.push({
				variableId: `tl_${key}_looping`,
				name: `${tl[key].parent} ${tl[key].label} looping`,
			})
			// MAKERS VARIABLE
			let makersOBJ = tl[key].timeMarkers
			for (let i = 0; i < makersOBJ.length; i++) {
				variables.push({
					variableId: `tl_marker_${makersOBJ[i].uuid}_uuid`,
					name: `${tl[key].parent} ${tl[key].label} ${makersOBJ[i].label} UUID`,
				})
				variables.push({
					variableId: `tl_marker_${makersOBJ[i].uuid}_name`,
					name: `${tl[key].parent} ${tl[key].label} ${makersOBJ[i].label} name`,
				})
			}
		})
	}

	// PARAMETERS BANKS
	if (this.smodeLiveData.parameters.length !== 0) {
		let para = this.smodeLiveData.parameters
		for (let i = 0; i < para.length; i++) {
			variables.push({
				variableId: `para_${para[i].uuid}_uuid`,
				name: `${para[i].sceneLabel} ${para[i].parentLabel} ${para[i].label} UUID`,
			})
			variables.push({
				variableId: `para_${para[i].uuid}_name`,
				name: `${para[i].sceneLabel} ${para[i].parentLabel} ${para[i].label} name`,
			})
		}
	}

	// BANKS INDEX
	if (Object.keys(this.smodeLiveData.banksIndex).length !== 0) {
		let b = this.smodeLiveData.banksIndex
		Object.keys(b).forEach((key) => {
			variables.push({
				variableId: `bank_${b[key].uuid}_uuid`,
				name: `${b[key].label} uuid`,
			})
			variables.push({
				variableId: `bank_${b[key].uuid}_currentStateIndex`,
				name: `${b[key].label} currentStateIndex`,
			})
			variables.push({
				variableId: `bank_${b[key].uuid}_name`,
				name: `${b[key].label} name`,
			})
		})
	}

	return variables
}

// // CONTENTS
// if (this.smodeLiveData.contents != []) {
// 	let contents = this.smodeLiveData.contents
// 	Object.keys(contents).forEach(async (key) => {
// 		//this.log('info', `VARIABLES | SCENE >>> ${key}`)
// 		variables.push({
// 			variableId: `${contents[key].uuid}_uuid`,
// 			name: `${contents[key].label} uuid`,
// 		})
// 		variables.push({
// 			variableId: `${contents[key].uuid}_activation`,
// 			name: `${contents[key].label} activation`,
// 		})
// 		variables.push({
// 			variableId: `${contents[key].uuid}_loading`,
// 			name: `${contents[key].label} loading`,
// 		})
// 		variables.push({
// 			variableId: `${contents[key].uuid}_name`,
// 			name: `${contents[key].label} name`,
// 		})
// 		// variables.push({
// 		// 	variableId: `scene_${key}_color`,
// 		// 	name: `${scenes[key].label} color`,
// 		// })
// 		// ACTIONS
// 		// let actions = contents.actions
// 		// if (actions != []) {
// 		// 	variables = await getActionsVariables(variables ,actions, contents[key].label)
// 		// }
// 	})
// }

// async function getActionsVariables(variables, actions, parent) {
// 	for (let i = 0; i < actions.length; i++) {
// 		let action = actions[i]

// 		variables.push({
// 			variableId: `${actions[i].uuid}_uuid`,
// 			name: `${parent} ${actions[i].label} uuid`,
// 		})
// 		variables.push({
// 			variableId: `${actions[i].uuid}_activation`,
// 			name: `${tl[key].label} activation`,
// 		})
// 		variables.push({
// 			variableId: `${actions[i].uuid}_loading`,
// 			name: `${tl[key].label} loading`,
// 		})
// 		variables.push({
// 			variableId: `${actions[i].uuid}_name`,
// 			name: `${tl[key].label} name`,
// 		})
// 		variables.push({
// 			variableId: `${actions[i].uuid}_parent`,
// 			name: `${tl[key].label} parent`,
// 		})
// 		// variables.push({
// 		// 	variableId: `tl_${key}_color`,
// 		// 	name: `${tl[key].parent} ${tl[key].label} color`,
// 		// })
// 		variables.push({
// 			variableId: `${actions[i].uuid}_transport_state`,
// 			name: `${tl[key].label} transport state`,
// 		})
// 		variables.push({
// 			variableId: `${actions[i].uuid}_transport_playing`,
// 			name: `${tl[key].label} transport playing`,
// 		})
// 		variables.push({
// 			variableId: `${actions[i].uuid}_parameters_looping`,
// 			name: `${tl[key].label} looping`,
// 		})
// 	}
// 	return variables
// }
