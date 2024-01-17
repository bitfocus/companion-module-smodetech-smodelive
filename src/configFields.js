import { Regex } from '@companion-module/base'

export function GetConfigFields(self) {
    return [
        {
            type: 'static-text',
            id: 'info',
            width: 12,
            label: 'Information',
            value:
                "<strong>PLEASE READ THIS!</strong> Generic modules is only for use with custom applications. If you use this module to control a device or software on the market that more than you are using, <strong>PLEASE let us know</strong> about this software, so we can make a proper module for it. If we already support this and you use this to trigger a feature our module doesnt support, please let us know. We want companion to be as easy as possible to use for anyone.<br /><br />Use the 'Base URL' field below to define a starting URL for the instance's commands: e.g. 'http://server.url/path/'.  <b>This field will be ignored if a command uses a full URL.</b>",
        },
        {
			type: 'textinput',
			id: 'host',
			label: 'IP Address',
			width: 2,
			regex: Regex.IP
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
            label: 'Certifact File Path',
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
            value: `You need to set a password only if the <b>Key file path is encrypted<b/>.`,
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
        // {
        //     type: 'static-text',
        //     id: 'prefix',
        //     label: 'Base URL',
        //     width: 12,
        //     value: `http://${self.config.host}:${self.config.port}`,
        // },
        // {
        //     type: 'static-text',
        //     id: 'rejectUnauthorizedInfo',
        //     width: 12,
        //     value: `
        //                 <hr />
        //                 <h5>WARNING</h5>
        //                 This module rejects server certificates considered invalid for the following reasons:
        //                 <ul>
        //                     <li>Certificate is expired</li>
        //                     <li>Certificate has the wrong host</li>
        //                     <li>Untrusted root certificate</li>
        //                     <li>Certificate is self-signed</li>
        //                 </ul>
        //                 <p>
        //                     We DO NOT recommend turning off this option. However, if you NEED to connect to a host
        //                     with a self-signed certificate you will need to set <strong>Unauthorized Certificates</strong>
        //                     to <strong>Accept</strong>.
        //                 </p>
        //                 <p><strong>USE AT YOUR OWN RISK!<strong></p>
        //             `,
        // },
        // {
        //     type: 'dropdown',
        //     id: 'rejectUnauthorized',
        //     label: 'Unauthorized Certificates',
        //     width: 6,
        //     default: true,
        //     choices: [
        //         { id: true, label: 'Reject' },
        //         { id: false, label: 'Accept - Use at your own risk!' },
        //     ],
        // },
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
            width: 2,
            default: 1000,
            min: 0,
        },
        {
			type: 'checkbox',
			id: 'autoContents',
			label: 'Auto Contents',
			default: false,
			width: 2
		},
        // {
		// 	type: 'checkbox',
		// 	id: 'autoScenes',
		// 	label: 'Auto Get Scenes',
		// 	default: false,
		// 	width: 2
		// },
        // {
		// 	type: 'checkbox',
		// 	id: 'autoTimeLines',
		// 	label: 'Auto Get TimeLines',
		// 	default: false,
		// 	width: 2
		// },
        {
			type: 'checkbox',
			id: 'autoDevices',
			label: 'Auto Devices',
			default: false,
			width: 2
		},
    ]
}