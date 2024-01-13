import { InstanceBase, runEntrypoint, InstanceStatus } from '@companion-module/base'
import { GetConfigFields } from './src/configFields.js'
import { UpgradeScripts } from './src/upgrades.js'
import { getActionDefinitions } from './src/actions.js'
import { getFeedbackDefinitions } from './src/feedbacks.js'
import { getVariables } from './src/variables.js'
import { getPresetsDefinitions } from './src/presets.js'
import { smodeLive } from './src/smode_live.js'

class SmodeLive extends InstanceBase {
	constructor(internal) {
		super(internal)
		this.pollTimer = undefined
	}

	async init(config) {
		this.configUpdated(config)
	}

	// When module gets deleted
	async destroy() {
		this.stop_smodeLive_polling()
		this.log('debug', 'destroy')
	}

	async configUpdated(config) {
		this.updateStatus('connecting')

		if (this.pollTimer !== undefined) {
			this.stop_smodeLive_polling()
		}
		
		this.config = config
		this.smodeLiveData = {
			prefix: "",
			onAir: false,
			ecoMode: false,
			output: false,
			status: {},
			staticstics: {},
			version: {},
			devices: {},
			contents: [],
			scenes: {},
			timelines: {},
			parameters: [],
			banksIndex: {},
		}
		this.updateActions() // export actions
		this.updateFeedbacks() // export feedbacks
		this.initVariables() // export variable definitions
		this.updatePresets()
		smodeLive.init_smode_live(this)
	}

	// Return config fields for web config
	getConfigFields() {
		return GetConfigFields(this)
	}

	async updateActions() {
		getActionDefinitions(this)
	}

	async updateFeedbacks() {
		getFeedbackDefinitions(this)
	}

	async initVariables() {
		const variables = getVariables.bind(this)()
		this.setVariableDefinitions(variables)
	}

	async updatePresets() {
		this.setPresetDefinitions(getPresetsDefinitions(this))
	}

	//██    ██ ██████  ██████   █████  ████████ ███████    ███████ ███    ███  ██████  ██████  ███████ 
	//██    ██ ██   ██ ██   ██ ██   ██    ██    ██         ██      ████  ████ ██    ██ ██   ██ ██      
	//██    ██ ██████  ██   ██ ███████    ██    █████      ███████ ██ ████ ██ ██    ██ ██   ██ █████   
	//██    ██ ██      ██   ██ ██   ██    ██    ██              ██ ██  ██  ██ ██    ██ ██   ██ ██      
	// ██████  ██      ██████  ██   ██    ██    ███████    ███████ ██      ██  ██████  ██████  ███████ 
	//

	async updateSmode() {
		await smodeLive.getStatistics(this)
		await smodeLive.getSmodeLiveStatus(this)
		await smodeLive.getOnAir(this)
		await smodeLive.getEcoMode(this)
		await smodeLive.getOutput(this)
		if (this.config.autoContents) await smodeLive.getContents(this)
		if (this.config.autoDevices) await smodeLive.getDevices(this)
	}

	//██████   ██████  ██      ██      ██ ███    ██  ██████  
	//██   ██ ██    ██ ██      ██      ██ ████   ██ ██       
	//██████  ██    ██ ██      ██      ██ ██ ██  ██ ██   ███ 
	//██      ██    ██ ██      ██      ██ ██  ██ ██ ██    ██ 
	//██       ██████  ███████ ███████ ██ ██   ████  ██████  
	//
	init_smodeLive_polling() {
		let self = this;
		if (self.pollTimer) {
			clearInterval(self.pollTimer);
		}
		if (self.pollTimer === undefined && self.config.pollingInterval > 0) {
			self.pollTimer = setInterval(() => {
				this.updateSmode()
			}, Math.ceil(this.config.pollingInterval))
		}
	}

	stop_smodeLive_polling() {
		clearInterval(this.pollTimer);
		delete this.pollTimer
		if (this.retry_interval) clearInterval(this.retry_interval)
		if (this.polling_interval) clearInterval(this.polling_interval)
	}
}

runEntrypoint(SmodeLive, UpgradeScripts)
