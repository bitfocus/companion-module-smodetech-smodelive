import { combineRgb } from '@companion-module/base'
import { colors, icons } from './assets.js'

export function getPresetsDefinitions(self) {
	const presets = {}

	// PARAMETERS
	Object.keys(self.smodeLiveData.parameters).forEach((key) => {
		let para = self.smodeLiveData.parameters[key]
		self.log('info', `PRESETS | PARAMETERS >>> ${key} ${JSON.stringify(para,null, 4)}`)
		let cat = para.sceneLabel
		const rgb = [
			Math.ceil(para.colorLabel.red * 255),
			Math.ceil(para.colorLabel.green * 255),
			Math.ceil(para.colorLabel.blue * 255),
		]

		presets[para.uuid] = {
			type: 'button',
			category: cat,
			style: {
				text: '$(Smode_Live:para_' + para.uuid + '_name)',
				size: '12',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(rgb[0], rgb[1], rgb[2]),
				// alignment: 'center:top',
				// png64: icons.ICON_PLAY,
			},
			steps: [
				{
					down: [
						{
							actionId: 'parameterStateIndex',
							options: {
								parUuid: para.uuid,
								bankUuid: para.parentUuid,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				// {
				// 	feedbackId: fbTS,
				// 	options: {
				// 		activation: tlOBJ.transport.state,
				// 	},
				// 	style: {
				// 		png64: icons.ICON_PAUSE,
				// 	},
				// },
			],
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
		//self.log('info', `PRESET | TIMELINE >>> ${key}_${tlOBJ.label}`)
		const fbTS = `${key}_playing`
		const fbLoop = `${key}_loop`
		let cat = tlOBJ.parent
		const rgb = [
			Math.ceil(tlOBJ.colorLabel.red * 255),
			Math.ceil(tlOBJ.colorLabel.green * 255),
			Math.ceil(tlOBJ.colorLabel.blue * 255),
		]

		presets[`${key}_playing`] = {
			type: 'button',
			category: cat,
			style: {
				text: '$(Smode_Live:tl_' + key + '_name)',
				size: '14',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(rgb[0], rgb[1], rgb[2]),
				alignment: 'center:top',
				png64: icons.ICON_PLAY,
			},
			steps: [
				{
					down: [
						{
							actionId: 'tlPlayingToggle',
							options: {
								name: tlOBJ.label,
								uuid: key,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: fbTS,
					options: {
						activation: tlOBJ.transport.state,
					},
					style: {
						png64: icons.ICON_PAUSE,
					},
				},
			],
		}

		presets[`${key}_reset`] = {
			type: 'button',
			category: cat,
			style: {
				text: '$(Smode_Live:tl_' + key + '_name)',
				size: '14',
				color: colors.colorWhite,
				bgcolor: combineRgb(rgb[0], rgb[1], rgb[2]),
				alignment: 'center:top',
				png64: icons.ICON_RESET,
			},
			steps: [
				{
					down: [
						{
							actionId: 'tlReset',
							options: {
								name: tlOBJ.label,
								uuid: key,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}

		presets[`${key}_finalize`] = {
			type: 'button',
			category: cat,
			style: {
				text: '$(Smode_Live:tl_' + key + '_name)',
				size: '14',
				color: colors.colorWhite,
				bgcolor: combineRgb(rgb[0], rgb[1], rgb[2]),
				alignment: 'center:top',
				png64: icons.ICON_FINALIZE,
			},
			steps: [
				{
					down: [
						{
							actionId: 'tlFinalize',
							options: {
								name: tlOBJ.label,
								uuid: key,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}

		presets[`${key}_next`] = {
			type: 'button',
			category: cat,
			style: {
				text: '$(Smode_Live:tl_' + key + '_name)',
				size: '14',
				color: colors.colorWhite,
				bgcolor: combineRgb(rgb[0], rgb[1], rgb[2]),
				alignment: 'center:top',
				png64: icons.ICON_NEXT,
			},
			steps: [
				{
					down: [
						{
							actionId: 'tlNext',
							options: {
								name: tlOBJ.label,
								uuid: key,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}

		presets[`${key}_previous`] = {
			type: 'button',
			category: cat,
			style: {
				text: '$(Smode_Live:tl_' + key + '_name)',
				size: '14',
				color: colors.colorWhite,
				bgcolor: combineRgb(rgb[0], rgb[1], rgb[2]),
				alignment: 'center:top',
				png64: icons.ICON_PREVIOUS,
			},
			steps: [
				{
					down: [
						{
							actionId: 'tlPrevious',
							options: {
								name: tlOBJ.label,
								uuid: key,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}

		presets[`${key}_looping`] = {
			type: 'button',
			category: cat,
			style: {
				text: '$(Smode_Live:tl_' + key + '_name)',
				size: '14',
				color: colors.colorWhite,
				bgcolor: combineRgb(rgb[0], rgb[1], rgb[2]),
				alignment: 'center:top',
				png64: icons.ICON_LOOP_OFF,
			},
			steps: [
				{
					down: [
						{
							actionId: 'tlLooping',
							options: {
								name: tlOBJ.label,
								uuid: key,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: fbLoop,
					options: {
						activation: tlOBJ.parameters.looping,
					},
					style: {
						png64: icons.ICON_LOOP_ON,
					},
				},
			],
		}
		//self.log('debug', `PRESETS | TIMELINE MAKERS >>> ${tlOBJ.timeMarkers.length} ${JSON.stringify(tlOBJ.timeMarkers, null, 4)}`)
		// MARKERS
		for (let i = 0; i < tlOBJ.timeMarkers.length; i++) {
			let tmOBJ = tlOBJ.timeMarkers[i]
			const rgbMaker = [
				Math.ceil(tmOBJ.colorLabel.red * 255),
				Math.ceil(tmOBJ.colorLabel.green * 255),
				Math.ceil(tmOBJ.colorLabel.blue * 255),
			]
			//self.log('debug', `PRESETS | TIMELINE MAKERS >>> ${JSON.stringify(tmOBJ, null, 4)}`)
			presets[`${tmOBJ.label}_${cat}_timemaker`] = {
				type: 'button',
				category: cat,
				style: {
					text: '$(Smode_Live:tl_marker_' + tmOBJ.uuid + '_name)',
					size: '14',
					color: colors.colorWhite,
					bgcolor: combineRgb(rgbMaker[0], rgbMaker[1], rgbMaker[2]),
					alignment: 'center:top',
					png64: icons.ICON_TIME_MAKERS,
				},
				steps: [
					{
						down: [
							{
								actionId: 'markersMove',
								options: {
									uuid: tmOBJ.uuid,
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [],
			}
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

		presets[`${key}_activation`] = {
			type: 'button',
			category: `${sceneOBJ.label}`,
			style: {
				text: '$(Smode_Live:scene_' + key + '_name)\nActivation',
				size: '14',
				color: colors.colorWhite,
				bgcolor: combineRgb(rgb[0], rgb[1], rgb[2]),
				alignment: 'center:top',
				png64: icons.ICON_OCULUS_OPEN,
			},
			steps: [
				{
					down: [
						{
							actionId: 'sceneActivationToggle',
							options: {
								uuid: key,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: fbAC,
					options: {
						activation: sceneOBJ.activation,
					},
					style: {
						png64: icons.ICON_OCULUS_CLOSE,
					},
				},
			],
		}

		presets[`${key}_loading`] = {
			type: 'button',
			category: `${sceneOBJ.label}`,
			style: {
				text: '$(Smode_Live:scene_' + key + '_name)\nLoading',
				size: '14',
				color: colors.colorWhite,
				bgcolor: combineRgb(rgb[0], rgb[1], rgb[2]),
				alignment: 'center:top',
				png64: icons.ICON_OCULUS_OPEN,
			},
			steps: [
				{
					down: [
						{
							actionId: 'sceneLoadingToogle',
							options: {
								uuid: key,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: fbLD,
					options: {
						loading: sceneOBJ.loading,
					},
					style: {
						png64: icons.ICON_OCULUS_CLOSE,
					},
				},
			],
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
		//const fbAC = `device_${deviceOBJ.uuid}`

		presets[`${deviceOBJ.uuid}_isMuted`] = {
			type: 'button',
			category: 'Devices',
			style: {
				text: '$(Smode_Live:device_' + deviceOBJ.uuid + '_name)',
				size: '14',
				color: colors.colorBlack,
				bgcolor: colors.smodeDeviceBG,
				alignment: 'center:top',
				png64: icons.ICON_DEVICE_UNMUTE,
			},
			steps: [
				{
					down: [
						{
							actionId: 'devices_is_muted',
							options: {
								uuid: deviceOBJ.uuid,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: `${deviceOBJ.uuid}_isMuted`,
					options: {
						isMuted: deviceOBJ.isMuted,
					},
					style: {
						png64: icons.ICON_DEVICE_MUTE,
					},
				},
			],
		}
	})

	// ██████  ███    ██      █████  ██ ██████
	//██    ██ ████   ██     ██   ██ ██ ██   ██
	//██    ██ ██ ██  ██     ███████ ██ ██████
	//██    ██ ██  ██ ██     ██   ██ ██ ██   ██
	// ██████  ██   ████     ██   ██ ██ ██   ██
	//
	presets['onAir'] = {
		type: 'button',
		category: 'Interface',
		style: {
			text: ``,
			size: '18',
			bgcolor: colors.smodeBlackBG,
			color: colors.smodeGrayText,
			png64: icons.ICON_ON_AIR_OFF,
		},
		steps: [
			{
				down: [
					{
						actionId: 'setOnAir',
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: `on_air`,
				options: {},
				style: {
					png64: icons.ICON_ON_AIR_ON,
				},
			},
		],
	}

	//███████  ██████  ██████      ███    ███  ██████  ██████  ███████
	//██      ██      ██    ██     ████  ████ ██    ██ ██   ██ ██
	//█████   ██      ██    ██     ██ ████ ██ ██    ██ ██   ██ █████
	//██      ██      ██    ██     ██  ██  ██ ██    ██ ██   ██ ██
	//███████  ██████  ██████      ██      ██  ██████  ██████  ███████
	//
	presets['eco_mode'] = {
		type: 'button',
		category: 'Interface',
		style: {
			text: '',
			size: '14',
			bgcolor: colors.smodeBlackBG,
			color: colors.smodeGrayText,
			png64: icons.ICON_POWER_SAVE_MODE_OFF,
		},
		steps: [
			{
				down: [
					{
						actionId: 'setEcoMode',
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: `eco_mode`,
				options: {},
				style: {
					png64: icons.ICON_POWER_SAVE_MODE_ON,
				},
			},
		],
	}

	// ██████  ██    ██ ████████ ██████  ██    ██ ████████
	//██    ██ ██    ██    ██    ██   ██ ██    ██    ██
	//██    ██ ██    ██    ██    ██████  ██    ██    ██
	//██    ██ ██    ██    ██    ██      ██    ██    ██
	// ██████   ██████     ██    ██       ██████     ██
	//
	presets['output'] = {
		type: 'button',
		category: 'Interface',
		style: {
			text: '',
			size: '14',
			bgcolor: colors.smodeBlackBG,
			color: colors.smodeGrayText,
			png64: icons.ICON_OUTPUT_OFF,
		},
		steps: [
			{
				down: [
					{
						actionId: 'setOutPut',
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: `output`,
				options: {},
				style: {
					png64: icons.ICON_OUTPUT_ON,
				},
			},
		],
	}

	//██    ██  █████  ██████  ██  █████  ██████  ██      ███████ ███████
	//██    ██ ██   ██ ██   ██ ██ ██   ██ ██   ██ ██      ██      ██
	//██    ██ ███████ ██████  ██ ███████ ██████  ██      █████   ███████
	// ██  ██  ██   ██ ██   ██ ██ ██   ██ ██   ██ ██      ██           ██
	//  ████   ██   ██ ██   ██ ██ ██   ██ ██████  ███████ ███████ ███████
	//
	presets['programNameVariable'] = {
		type: 'button',
		category: 'Variable',
		style: {
			text: `$(Smode_Live:ver_program)`,
			size: '14',
			color: colors.colorWhite,
			bgcolor: colors.colorBlack,
		},
		steps: [
			{
				down: [],
				up: [],
			},
		],
		feedbacks: [],
	}

	presets['versionVariable'] = {
		type: 'button',
		category: 'Variable',
		style: {
			text: `$(Smode_Live:ver_versionLong)`,
			size: '14',
			color: colors.colorWhite,
			bgcolor: colors.colorBlack,
		},
		steps: [
			{
				down: [],
				up: [],
			},
		],
		feedbacks: [],
	}

	presets['stateVariable'] = {
		type: 'button',
		category: 'Variable',
		style: {
			text: `$(Smode_Live:status_state)`,
			size: '14',
			color: colors.colorWhite,
			bgcolor: colors.colorRed,
		},
		steps: [
			{
				down: [],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'smode_state',
				options: {
					smodeState: 0,
				},
				style: {
					bgcolor: colors.colorGreen,
				},
			},
		],
	}

	presets['fps'] = {
		type: 'button',
		category: 'Variable',
		style: {
			text: `FPS\n$(Smode_Live:statistic_fps)`,
			size: '14',
			color: colors.colorWhite,
			bgcolor: colors.colorBlack,
		},
		steps: [
			{
				down: [],
				up: [],
			},
		],
		feedbacks: [],
	}

	presets['gpu'] = {
		type: 'button',
		category: 'Variable',
		style: {
			text: `GPU RAM\n$(Live:statistic_vram)\n$(Live:statistic_vramMax) GB`,
			color: colors.colorWhite,
			bgcolor: colors.colorBlack,
		},
		steps: [
			{
				down: [],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'vramStep0',
				options: {
					step: 50,
				},
				style: {
					bgcolor: colors.colorGreen,
				},
			},
			{
				feedbackId: 'vramStep1',
				options: {
					step: 80,
				},
				style: {
					bgcolor: colors.colorOrange,
				},
			},
			{
				feedbackId: 'vramStep2',
				options: {
					step: 80,
				},
				style: {
					bgcolor: colors.colorRed,
				},
			},
		],
	}

	// GENERAL
	presets['getContents'] = {
		type: 'button',
		category: 'General',
		style: {
			text: `Get\nContents`,
			size: '14',
			color: colors.colorWhite,
			bgcolor: colors.colorBlack,
		},
		steps: [
			{
				down: [
					{
						actionId: 'getContentsAction',
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	presets['getDevices'] = {
		type: 'button',
		category: 'General',
		style: {
			text: `Get\nDevices`,
			size: '14',
			color: colors.colorWhite,
			bgcolor: colors.colorBlack,
		},
		steps: [
			{
				down: [
					{
						actionId: 'getDeviceActions',
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}

	return presets
}

	// presets['getScenes'] = {
	// 	type: 'button',
	// 	category: 'General',
	// 	style: {
	// 		text: `Get\nScenes`,
	// 		size: '14',
	// 		color: colors.colorWhite,
	// 		bgcolor: colors.colorBlack,
	// 	},
	// 	steps: [
	// 		{
	// 			down: [
	// 				{
	// 					actionId: 'getScenesActions',
	// 				},
	// 			],
	// 			up: [],
	// 		},
	// 	],
	// 	feedbacks: [],
	// }

	// presets['getTimeLines'] = {
	// 	type: 'button',
	// 	category: 'General',
	// 	style: {
	// 		text: `Get\nTimeLines`,
	// 		size: '14',
	// 		color: colors.colorWhite,
	// 		bgcolor: colors.colorBlack,
	// 	},
	// 	steps: [
	// 		{
	// 			down: [
	// 				{
	// 					actionId: 'getTimelinesActions',
	// 				},
	// 			],
	// 			up: [],
	// 		},
	// 	],
	// 	feedbacks: [],
	// }

			// if (sceneOBJ.tools.length !== 0) {
		// 	for (let i = 0; i < sceneOBJ.tools.length; i++) {
		// 		if (sceneOBJ.tools[i].states.length !== 0) {
		// 			self.log(
		// 				'warn',
		// 				`SMODELIVE | SMODELIVE DATA SCENES RESULT >>>\nScene Name: ${sceneOBJ.label}\nTools Name: ${
		// 					sceneOBJ.tools[i].label
		// 				}\nStates:\n${JSON.stringify(sceneOBJ.tools[i], null, 4)}`
		// 			)
		// 			let states = sceneOBJ.tools[i].states
		// 			for (let j = 0; j < states.length; j++) {
		// 				presets[`${key}_${sceneOBJ.tools[i].label}_${j}_parameters_states`] = {
		// 					type: 'button',
		// 					category: `${sceneOBJ.label}`,
		// 					style: {
		// 						text: `${states[j].label}`,
		// 						size: '14',
		// 						color: colors.colorWhite,
		// 						bgcolor: colors.colorBlack,
		// 						// alignment: 'center:top',
		// 						// png64: icons.ICON_OCULUS_OPEN,
		// 					},
		// 					steps: [
		// 						{
		// 							down: [
		// 								// {
		// 								// 	actionId: 'sceneLoadingToogle',
		// 								// 	options: {
		// 								// 		uuid: key,
		// 								// 	},
		// 								// },
		// 							],
		// 							up: [],
		// 						},
		// 					],
		// 					feedbacks: [
		// 						{
		// 							// feedbackId: fbLD,
		// 							// options: {
		// 							// 	loading: sceneOBJ.loading,
		// 							// },
		// 							// style: {
		// 							// 	png64: icons.ICON_OCULUS_CLOSE,
		// 							// },
		// 						},
		// 					],
		// 				}
		// 			}
		// 		}
		// 	}
		// }

			// CONTENTS
	// Object.keys(self.smodeLiveData.contents).forEach((key) => {
	// 	let ctOBJ = self.smodeLiveData.contents[key]
	// 	self.log('info', `PRESETS | CONTENTS >>> ${JSON.stringify(ctOBJ, null, 4)}`)
	// 	const fbAC = `${ctOBJ.uuid}_activation`
	// 	const fbLD = `${ctOBJ.uuid}_loading`
	// 	const rgb = [
	// 		Math.ceil(ctOBJ.colorLabel.red * 255),
	// 		Math.ceil(ctOBJ.colorLabel.green * 255),
	// 		Math.ceil(ctOBJ.colorLabel.blue * 255),
	// 	]

	// 	presets[fbAC] = {
	// 		type: 'button',
	// 		category: `${ctOBJ.label}`,
	// 		style: {
	// 			text: '$(Smode_Live:' + ctOBJ.uuid + '_name)\nActivation',
	// 			size: '14',
	// 			color: colors.colorWhite,
	// 			bgcolor: combineRgb(rgb[0], rgb[1], rgb[2]),
	// 			alignment: 'center:top',
	// 			png64: icons.ICON_OCULUS_OPEN,
	// 		},
	// 		steps: [
	// 			{
	// 				down: [
	// 					{
	// 						actionId: 'sceneActivationToggle',
	// 						options: {
	// 							uuid: ctOBJ.uuid,
	// 						},
	// 					},
	// 				],
	// 				up: [],
	// 			},
	// 		],
	// 		feedbacks: [
	// 			{
	// 				feedbackId: fbAC,
	// 				options: {
	// 					activation: ctOBJ.activation,
	// 				},
	// 				style: {
	// 					png64: icons.ICON_OCULUS_CLOSE,
	// 				},
	// 			},
	// 		],
	// 	}

	// 	presets[fbLD] = {
	// 		type: 'button',
	// 		category: `${ctOBJ.label}`,
	// 		style: {
	// 			text: '$(Smode_Live:' + ctOBJ.uuid + '_name)\nLoading',
	// 			size: '14',
	// 			color: colors.colorWhite,
	// 			bgcolor: combineRgb(rgb[0], rgb[1], rgb[2]),
	// 			alignment: 'center:top',
	// 			png64: icons.ICON_OCULUS_OPEN,
	// 		},
	// 		steps: [
	// 			{
	// 				down: [
	// 					{
	// 						actionId: 'sceneLoadingToogle',
	// 						options: {
	// 							uuid: ctOBJ.uuid,
	// 						},
	// 					},
	// 				],
	// 				up: [],
	// 			},
	// 		],
	// 		feedbacks: [
	// 			{
	// 				feedbackId: fbLD,
	// 				options: {
	// 					loading: ctOBJ.loading,
	// 				},
	// 				style: {
	// 					png64: icons.ICON_OCULUS_CLOSE,
	// 				},
	// 			},
	// 		],
	// 	}

	// 	//const fbTS = `${key}_transport_state`

	// 	// const rgb = [
	// 	// 	Math.ceil(tlOBJ.colorLabel.red * 255),
	// 	// 	Math.ceil(tlOBJ.colorLabel.green * 255),
	// 	// 	Math.ceil(tlOBJ.colorLabel.blue * 255),
	// 	// ]

	// 	// presets[`${key}_transport_state`] = {
	// 	// 	type: 'button',
	// 	// 	category: 'TimeLines',
	// 	// 	style: {
	// 	// 		text: '$(Smode_Live:tl_' + key + '_name)',//\n$(Live:tl_' + key + '_parent)',
	// 	// 		size: '14',
	// 	// 		color: combineRgb(255, 255, 255),
	// 	// 		bgcolor: combineRgb(rgb[0], rgb[1], rgb[2]),
	// 	// 		alignment: 'center:top',
	// 	// 		png64: icons.ICON_PLAY,
	// 	// 	},
	// 	// 	steps: [
	// 	// 		{
	// 	// 			down: [
	// 	// 				{
	// 	// 					actionId: 'tlTransportPlaying',
	// 	// 					options: {
	// 	// 						name: tlOBJ.label,
	// 	// 						uuid: key,
	// 	// 					},
	// 	// 				},
	// 	// 			],
	// 	// 			up: [],
	// 	// 		},
	// 	// 	],
	// 	// 	feedbacks: [
	// 	// 		{
	// 	// 			feedbackId: fbTS,
	// 	// 			options: {
	// 	// 				activation: tlOBJ.transport.state,
	// 	// 			},
	// 	// 			style: {
	// 	// 				png64: icons.ICON_PAUSE,
	// 	// 			},
	// 	// 		},
	// 	// 	],
	// 	// }

	// 	// presets[`${key}_reset`] = {
	// 	// 	type: 'button',
	// 	// 	category: 'TimeLines',
	// 	// 	style: {
	// 	// 		text: '$(Smode_Live:tl_' + key + '_name)',//\n$(Live:tl_' + key + '_parent)',
	// 	// 		size: '14',
	// 	// 		color: colors.colorWhite,
	// 	// 		bgcolor: combineRgb(rgb[0], rgb[1], rgb[2]),
	// 	// 		alignment: 'center:top',
	// 	// 		png64: icons.ICON_RESET,
	// 	// 	},
	// 	// 	steps: [
	// 	// 		{
	// 	// 			down: [
	// 	// 				{
	// 	// 					actionId: 'tlReset',
	// 	// 					options: {
	// 	// 						name: tlOBJ.label,
	// 	// 						uuid: key,
	// 	// 					},
	// 	// 				},
	// 	// 			],
	// 	// 			up: [],
	// 	// 		},
	// 	// 	],
	// 	// 	feedbacks: [],
	// 	// }

	// 	// presets[`${key}_finalize`] = {
	// 	// 	type: 'button',
	// 	// 	category: 'TimeLines',
	// 	// 	style: {
	// 	// 		text: '$(Smode_Live:tl_' + key + '_name)',//\n$(Live:tl_' + key + '_parent)',
	// 	// 		size: '14',
	// 	// 		color: colors.colorWhite,
	// 	// 		bgcolor: combineRgb(rgb[0], rgb[1], rgb[2]),
	// 	// 		alignment: 'center:top',
	// 	// 		png64: icons.ICON_FINALIZE,
	// 	// 	},
	// 	// 	steps: [
	// 	// 		{
	// 	// 			down: [
	// 	// 				{
	// 	// 					actionId: 'tlFinalize',
	// 	// 					options: {
	// 	// 						name: tlOBJ.label,
	// 	// 						uuid: key,
	// 	// 					},
	// 	// 				},
	// 	// 			],
	// 	// 			up: [],
	// 	// 		},
	// 	// 	],
	// 	// 	feedbacks: [],
	// 	// }

	// 	// presets[`${key}_next`] = {
	// 	// 	type: 'button',
	// 	// 	category: 'TimeLines',
	// 	// 	style: {
	// 	// 		text: '$(Smode_Live:tl_' + key + '_name)',//\n$(Live:tl_' + key + '_parent)',
	// 	// 		size: '14',
	// 	// 		color: colors.colorWhite,
	// 	// 		bgcolor: combineRgb(rgb[0], rgb[1], rgb[2]),
	// 	// 		alignment: 'center:top',
	// 	// 		png64: icons.ICON_NEXT,
	// 	// 	},
	// 	// 	steps: [
	// 	// 		{
	// 	// 			down: [
	// 	// 				{
	// 	// 					actionId: 'tlNext',
	// 	// 					options: {
	// 	// 						name: tlOBJ.label,
	// 	// 						uuid: key,
	// 	// 					},
	// 	// 				},
	// 	// 			],
	// 	// 			up: [],
	// 	// 		},
	// 	// 	],
	// 	// 	feedbacks: [],
	// 	// }

	// 	// presets[`${key}_previous`] = {
	// 	// 	type: 'button',
	// 	// 	category: 'TimeLines',
	// 	// 	style: {
	// 	// 		text: '$(Smode_Live:tl_' + key + '_name)',//\n$(Live:tl_' + key + '_parent)',
	// 	// 		size: '14',
	// 	// 		color: colors.colorWhite,
	// 	// 		bgcolor: combineRgb(rgb[0], rgb[1], rgb[2]),
	// 	// 		alignment: 'center:top',
	// 	// 		png64: icons.ICON_PREVIOUS,
	// 	// 	},
	// 	// 	steps: [
	// 	// 		{
	// 	// 			down: [
	// 	// 				{
	// 	// 					actionId: 'tlPrevious',
	// 	// 					options: {
	// 	// 						name: tlOBJ.label,
	// 	// 						uuid: key,
	// 	// 					},
	// 	// 				},
	// 	// 			],
	// 	// 			up: [],
	// 	// 		},
	// 	// 	],
	// 	// 	feedbacks: [],
	// 	// }

	// 	// presets[`${key}_looping`] = {
	// 	// 	type: 'button',
	// 	// 	category: 'TimeLines',
	// 	// 	style: {
	// 	// 		text: '$(Smode_Live:tl_' + key + '_name)',
	// 	// 		size: '14',
	// 	// 		color: colors.colorWhite,
	// 	// 		bgcolor: combineRgb(rgb[0], rgb[1], rgb[2]),
	// 	// 		alignment: 'center:top',
	// 	// 		png64: icons.ICON_LOOP_OFF,
	// 	// 	},
	// 	// 	steps: [
	// 	// 		{
	// 	// 			down: [
	// 	// 				{
	// 	// 					actionId: 'tlLooping',
	// 	// 					options: {
	// 	// 						name: tlOBJ.label,
	// 	// 						uuid: key,
	// 	// 					},
	// 	// 				},
	// 	// 			],
	// 	// 			up: [],
	// 	// 		},
	// 	// 	],
	// 	// 	feedbacks: [
	// 	// 		{
	// 	// 			feedbackId: `${key}_loop`,
	// 	// 			options: {
	// 	// 				activation: tlOBJ.parameters.looping,
	// 	// 			},
	// 	// 			style: {
	// 	// 				png64: icons.ICON_LOOP_ON,
	// 	// 			},
	// 	// 		},
	// 	// 	],
	// 	// }

	// 	// // MAKERS
	// 	// for (let i = 0; i < tlOBJ.timeMarkers.length; i++) {
	// 	// 	let tmOBJ = tlOBJ.timeMarkers[i]
	// 	// 	const rgbMaker = [
	// 	// 		Math.ceil(tmOBJ.color.red * 255),
	// 	// 		Math.ceil(tmOBJ.color.green * 255),
	// 	// 		Math.ceil(tmOBJ.color.blue * 255),
	// 	// 	]
	// 	// 	//self.log('debug', `PRESETS | GET TIMELINE TIME MAKERS >>> ${JSON.stringify(tmOBJ, null, 4)}`)
	// 	// 	presets[`${tmOBJ.label}_${tmOBJ.position}_timemaker`] = {
	// 	// 		type: 'button',
	// 	// 		category: 'TimeLines',
	// 	// 		style: {
	// 	// 			text: '$(Smode_Live:tl_maker_'+ key + '_' + tmOBJ.uuid + '_name)',
	// 	// 			size: '14',
	// 	// 			color: colors.colorWhite,
	// 	// 			bgcolor: combineRgb(rgbMaker[0], rgbMaker[1], rgbMaker[2]),
	// 	// 			alignment: 'center:top',
	// 	// 			png64: icons.ICON_TIME_MAKERS,
	// 	// 		},
	// 	// 		steps: [
	// 	// 			{
	// 	// 				down: [
	// 	// 					{
	// 	// 						actionId: 'makersMove',
	// 	// 						options: {
	// 	// 							uuid: tmOBJ.uuid,
	// 	// 						},
	// 	// 					},
	// 	// 				],
	// 	// 				up: [],
	// 	// 			},
	// 	// 		],
	// 	// 		feedbacks: [
	// 	// 			// {
	// 	// 			// 	feedbackId: fbTS,
	// 	// 			// 	options: {
	// 	// 			// 		activation: tlOBJ.transport.state,
	// 	// 			// 	},
	// 	// 			// 	style: {
	// 	// 			// 		png64: ICON_PAUSE,
	// 	// 			// 	},
	// 	// 			// },
	// 	// 		],
	// 	// 	}
	// 	// }
	// })