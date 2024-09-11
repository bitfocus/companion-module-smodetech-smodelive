import { Regex } from '@companion-module/base'

export function GetConfigFields(self) {
    return [
        {
            type: 'static-text',
            id: 'info',
            width: 12,
            label: 'Information',
            value: `
                This module allows you to control a <strong>Smode live server </strong>.
                <br>
                <br>
                <strong>How to use it:</strong>
                <br>
                <ul>
                    <li>In <strong>Smode</strong> got to the preferences panel.</li>
                    <li>Under the engine section, go to <strong>Http Server</strong> tab</li>
                    <li>Configure the address, port, and the Http Mode according to your preferences.</li>
                    <li>Click on <strong>Run Server</strong></li>
                    <li>Return to <strong>companion</strong>, navigate to the buttons tab, and access Smode presets.</li>
                    <li>You'll find a list of buttons, each representing various interaction possibilities.</li>
                    <li>Add these buttons to your <strong>Stream Deck</strong>.</li>
                </ul>
            `
        },
        {
			type: 'textinput',
			id: 'host',
			label: 'IP Address',
			width: 2,
			regex: Regex.IP,
            default: '127.0.0.1'
		},
        {
            type: 'textinput',
            id: 'port',
            label: 'Control Port',
            width: 2,
            regex: Regex.PORT,
            min: 1,
            max: 65535,
            default: '8080',
        },
        {
			type: 'dropdown',
			id: 'httpMode',
			label: 'Http Mode',
			default: 'http',
            width: 3,
			choices: [
                { id: 'http', label: 'Http' },
                { id: 'https', label: 'Https' },
                { id: 'httpsWithCa', label: 'Https with certificate authority' },
            ],
		},
        {
			type: 'checkbox',
			id: 'rejectUnauthorized',
			label: 'Reject Unauthorized',
			default: true,
			width: 3,
            isVisible: (configValues) => configValues.httpMode === 'httpsWithCa' || configValues.httpMode === 'https',
		},
        {
            type: 'textinput',
            id: 'certFilePath',
            label: 'Certifacte File Path',
            width: 12,
            isVisible: (configValues) => configValues.httpMode === 'httpsWithCa',
        },
        {
            type: 'textinput',
            id: 'keyFilePath',
            label: 'Key File Path',
            width: 12,
            isVisible: (configValues) => configValues.httpMode === 'httpsWithCa',
        },
        {
            type: 'textinput',
            id: 'certAuthorityFilePath',
            label: 'Certificate authority File Path',
            width: 12,
            isVisible: (configValues) => configValues.httpMode === 'httpsWithCa',
        },
        {
            type: 'static-text',
            id: 'passwordInfo',
            width: 12,
            value: `You need to set a password only if the <strong>Key file path </strong> is encrypted.`,
            isVisible: (configValues) => configValues.httpMode === 'httpsWithCa',
        },
        {
            type: 'textinput',
            id: 'password',
            label: 'Password',
            width: 12,
            default: "Password",
            isVisible: (configValues) => configValues.httpMode === 'httpsWithCa',
        },
        {
            type: 'static-text',
            id: 'polling',
            width: 12,
            value: `
                        <hr />
                        <h5>Polling</h5>
                        Poll Interval (ms) (0 to disable)
                        <br>
                        <strong>This could have an undesired performance effect on your Device, depending on the polling rate & gate options.</strong>
                        <br>                
                    `,
        },
        {
            type: 'number',
            id: 'pollingInterval',
            label: 'Status Poll Interval',
            width: 3,
            default: 1000,
            min: 0,
        },
        {
			type: 'checkbox',
			id: 'autoDevices',
			label: 'Auto Devices',
			default: false,
			width: 2
		},
    ]
}