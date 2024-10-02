<template>
	<div class="p-8 pb-0">
		<div>
			<div class="p-1">
				<FormDisplayItemBasic
					heading-element="h4"
					:heading="t('user.email')"
					:value="store.email"
				></FormDisplayItemBasic>
			</div>
		</div>
		<div>
			<div class="p-1">
				<FormDisplayItemBasic
					heading-element="h4"
					:heading="t('user.orcid')"
					:value="
						store.acceptinvitationPayload.orcid
							? store.acceptinvitationPayload.orcid
							: t('invitation.orcid.acceptInvitation.message')
					"
				></FormDisplayItemBasic>
				<Icon
					v-if="store.acceptinvitationPayload.orcid"
					icon="orcid"
					:inline="true"
				/>
			</div>
		</div>
	</div>
	<PkpForm
		v-bind="userForm"
		class="acceptInvitation__stepForm"
		@set="updateUserDetailsForm"
	></PkpForm>
</template>

<script setup>
import {defineProps, computed} from 'vue';
import FormDisplayItemBasic from '@/components/FormDisplay/FormDisplayItemBasic.vue';
import PkpForm from '@/components/Form/Form.vue';
import Icon from '@/components/Icon/Icon.vue';
import {useForm} from '@/composables/useForm';
import {useAcceptInvitationPageStore} from './AcceptInvitationPageStore';

const props = defineProps({
	form: {type: Object, required: true},
	validateFields: {type: Array, required: true},
});

const store = useAcceptInvitationPageStore();

function updateUserDetailsForm(a, form, c, d) {
	set(a, form, c, d);
	if (form.fields) {
		form.fields.forEach((field) => {
			if (store.acceptinvitationPayload[field.name] !== field.value) {
				store.updateAcceptInvitationPayload(field.name, field.value);
			}
		});
	}
}

const {
	form: userForm,
	connectWithPayload,
	connectWithErrors,
	set,
} = useForm(props.form);

userForm.value.fields.forEach((field) => {
	if (field.isMultilingual) {
		store.updateAcceptInvitationPayload(field.name, field.value, false);
	} else {
		if (store.acceptinvitationPayload[field.name] === null) {
			store.updateAcceptInvitationPayload(field.name, field.value, false);
		} else {
			store.updateAcceptInvitationPayload(
				field.name,
				store.acceptinvitationPayload[field.name],
				false,
			);
		}
	}
});

connectWithPayload(store.acceptinvitationPayload);

const sectionErrors = computed(() => {
	let errors = {};
	if (Object.keys(store.errors).length > 0) {
		props.validateFields.forEach((element) => {
			if (!store.errors[element]) {
				props.form.supportedFormLocales.forEach((data) => {
					errors[element] = {
						...errors[element],
						[data.key]: store.errors[element + '.' + data.key],
					};
				});
			} else if (store.errors[element]) {
				errors[element] = store.errors[element];
			}
		});
	}
	return errors;
});

connectWithErrors(sectionErrors);
</script>
