import OptionsSync from 'webext-options-sync';

export default new OptionsSync({
	defaults: {
    token: null,
	},
	migrations: [
		OptionsSync.migrations.removeUnused
	],
	logging: true
});
