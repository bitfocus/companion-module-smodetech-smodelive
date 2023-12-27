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
			//this.log('debug', `GET VARIABLEs ${this.smodeLiveData.devices[d].uuid} ${this.smodeLiveData.devices[d].label} ${this.smodeLiveData.devices[d].isMuted } `)
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
			//this.log('info', `VARIABLES | SCENE >>> ${key}`)
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
			//this.log('info', `VARIABLES | TIMELINES >>> ${key}`)
			variables.push({
				variableId: `tl_${key}_uuid`,
				name: `${tl[key].label} uuid`,
			})
			variables.push({
				variableId: `tl_${key}_activation`,
				name: `${tl[key].label} activation`,
			})
			variables.push({
				variableId: `tl_${key}_loading`,
				name: `${tl[key].label} loading`,
			})
			variables.push({
				variableId: `tl_${key}_name`,
				name: `${tl[key].label} name`,
			})
			variables.push({
				variableId: `tl_${key}_parent`,
				name: `${tl[key].label} parent`,
			})
			// variables.push({
			// 	variableId: `tl_${key}_color`,
			// 	name: `${tl[key].parent} ${tl[key].label} color`,
			// })
			variables.push({
				variableId: `tl_${key}_transport_state`,
				name: `${tl[key].label} transport state`,
			})
			variables.push({
				variableId: `tl_${key}_transport_playing`,
				name: `${tl[key].label} transport playing`,
			})
			variables.push({
				variableId: `tl_${key}_parameters_looping`,
				name: `${tl[key].label} parameters looping`,
			})
			// MAKERS VARIABLE
			let makersOBJ = tl[key].timeMarkers
			for (let i = 0; i < makersOBJ.length; i++) {
				//this.log('info', `VARIABLES | TIMELINES >>> ${JSON.stringify(makersOBJ[i], null, 4)}`)
				variables.push({
					variableId: `tl_maker_${key}_${makersOBJ[i].uuid}_uuid`,
					name: `${tl[key].label} ${makersOBJ[i].label} UUID`,
				})
				variables.push({
					variableId: `tl_maker_${key}_${makersOBJ[i].uuid}_name`,
					name: `${tl[key].label} ${makersOBJ[i].label} name`,
				})
			}
		})
	}

	return variables
}
