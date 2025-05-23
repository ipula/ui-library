import Form from './Form.vue';
import FormErrorSummary from './FormErrorSummary.vue';
import {useContainerStateManager} from '@/composables/useContainerStateManager';
import FormBase from './mocks/form-base';
import FormMultilingual from './mocks/form-multilingual';
import FormGroups from './mocks/form-groups';
import FormUser from './mocks/form-user';
import FormConditionalDisplay from './mocks/form-conditional-display';
import {useForm} from '@/composables/useForm';
import {useLocalize} from '@/composables/useLocalize';

export default {
	title: 'Forms/Form',
	component: Form,
};

export const Base = {
	render: (args) => ({
		components: {PkpForm: Form},
		setup() {
			const {get, set, components} = useContainerStateManager();
			set('example', FormBase);
			return {args, get, set, components};
		},
		template: `
			<PkpForm v-bind="components.example" @set="set" />
		`,
	}),

	args: {},
};

export const Multilingual = {
	render: (args) => ({
		components: {PkpForm: Form},
		setup() {
			const {get, set, components} = useContainerStateManager();
			set('example', FormMultilingual);
			return {args, get, set, components};
		},
		template: `
			<PkpForm v-bind="components.example" @set="set" />
		`,
	}),

	args: {},
};

export const WithGroups = {
	render: (args) => ({
		components: {PkpForm: Form},
		setup() {
			const {get, set, components} = useContainerStateManager();
			set('example', FormGroups);
			return {args, get, set, components};
		},
		template: `
			<PkpForm v-bind="components.example" @set="set" />
		`,
	}),

	args: {},
};

export const WithPagination = {
	render: (args) => ({
		components: {PkpForm: Form},
		setup() {
			const {get, set, components} = useContainerStateManager();
			set('example', FormUser);
			return {args, get, set, components};
		},
		template: `
			<PkpForm v-bind="components.example" @set="set" />
		`,
	}),

	args: {},
};

export const ConditionalDisplay = {
	render: (args) => ({
		components: {PkpForm: Form},
		setup() {
			const {get, set, components} = useContainerStateManager();
			set('example', FormConditionalDisplay);
			return {args, get, set, components};
		},
		template: `
			<PkpForm v-bind="components.example" @set="set" />
		`,
	}),

	args: {},
};

export const WithErrors = {
	render: (args) => ({
		components: {PkpForm: Form},
		setup() {
			const {get, set, components} = useContainerStateManager();
			set('example', {
				...FormUser,
				errors: {
					email: ['Please provide a valid email address'],
					affiliation: {
						en: ['You must enter your affiliation in English.'],
						fr_CA: ['You must enter your affiliation in French.'],
						ar: ['You must enter your affiliation in Arabic.'],
					},
					'user-locales': ['You must select at least two options.'],
					bio: {
						fr_CA: [
							'Please provide a bio statement to accompany your publication.',
						],
					},
					country: ['Please select your country.'],
					'mailing-address': [
						'You must enter a mailing address where you can receive post.',
					],
				},
			});
			return {args, get, set, components};
		},
		template: `
			<PkpForm v-bind="components.example" @set="set" />
		`,
	}),

	args: {},
};

export const WithErrorSummary = {
	render: (args) => ({
		components: {PkpForm: Form, FormErrorSummary},
		setup() {
			const {get, set, components} = useContainerStateManager();
			set('example', {
				...FormUser,
				...args,
				errors: {
					email: ['Please provide a valid email address'],
					affiliation: {
						en: ['You must enter your affiliation in English.'],
						fr_CA: ['You must enter your affiliation in French.'],
						ar: ['You must enter your affiliation in Arabic.'],
					},
					'user-locales': ['You must select at least two options.'],
					bio: {
						en: [
							'Please provide a bio statement to accompany your publication.',
						],
					},
					country: ['Please select your country.'],
					'mailing-address': [
						'You must enter a mailing address where you can receive post.',
					],
				},
			});

			return {args, get, set, components};
		},
		template: `
			<FormErrorSummary :errors="components.example.errors"/>
			<PkpForm v-bind="components.example" @set="set" />
		`,
	}),

	args: {
		showErrorFooter: false,
	},
};

export const ClientSideConfigured = {
	render: (args) => ({
		components: {PkpForm: Form},
		setup() {
			const {t} = useLocalize();
			const {form, initEmptyForm, addFieldSelect, addPage, addGroup, set} =
				useForm();
			initEmptyForm('versions', {});
			addPage('default', {
				submitButton: {label: t('common.confirm')},
				cancelButton: {label: t('common.cancel')},
			});
			addGroup('default');
			addFieldSelect('versionStage', {
				label: 'Publication Stage',
				size: 'large',
				description: 'interesting description',
				options: [
					{label: 'Author Original (AO)', value: 'AO'},
					{label: 'Accepted Manuscript (AM)', value: 'AM'},
					{label: 'Submitted Manuscript (SM)', value: 'SM'},
					{label: 'Proof (PF)', value: 'PF'},
					{label: 'Version of Record (VoR)', value: 'VoR'},
				],
			});

			return {args, set, form};
		},
		template: `
			<PkpForm v-bind="form" @set="set" />
		`,
	}),

	args: {},
};
