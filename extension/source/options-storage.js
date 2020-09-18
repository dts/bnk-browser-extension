import OptionsSync from 'webext-options-sync';

export default new OptionsSync({
	defaults: {
    token: null,
    popupPage: '/',
	},
	migrations: [
		OptionsSync.migrations.removeUnused
	],
	logging: true
});
