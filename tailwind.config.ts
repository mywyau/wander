import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				main: '#88aaee',
				overlay: 'rgba(0,0,0,0.8)',

				hardBlue: "#88aaee", // Custom hard green color
				softBlue: "#BBD3FF", // Custom soft green color	

				hardGreen: "#A3E636", // Custom hard green color
				softGreen: "#CFF07D", // Custom soft green color

				hardRed: "#ff6b6b", // Custom hard red color
				softRed: "#fcd7d7", // Custom soft red color

				hardYellow: "#FFDC58", // Custom hard green color
				softYellow: "#FFE88A", // Custom soft green color

				hardPurple: "#a388ee", // Custom hard green color
				softPurple: "#e3dff2", // Custom soft green color

				bg: '#dfe5f2',
				text: '#000',
				border: '#000',

				darkBg: '#272933',
				darkText: '#eeefe9',
				darkBorder: '#000',
				secondaryBlack: '#212121'
			},
			borderRadius: {
				base: '10px'
			},
			boxShadow: {
				light: '6px 6px 0px 0px #000',
				dark: '6px 6px 0px 0px #000'
			},
			translate: {
				boxShadowX: '6px',
				boxShadowY: '6px',
				reverseBoxShadowX: '-6px',
				reverseBoxShadowY: '-6px'
			},
			fontWeight: {
				base: '500',
				heading: '700'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
};
export default config;
