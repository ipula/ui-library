<template>
	<div v-if="store.invitationPayload.userId === null">
		<PkpForm
			v-bind="userForm"
			class="userInvitation__stepForm"
			@set="updateUserForm"
		></PkpForm>
	</div>
	<div v-if="store.invitationPayload.userId !== null" class="p-8">
		<div class="p-1">
			<FormDisplayItemBasic
				heading-element="h4"
				:heading="t('user.email')"
				:value="store.invitationPayload.email"
			></FormDisplayItemBasic>

			<FormDisplayItemBasic
				heading-element="h4"
				:heading="t('user.orcid')"
				:value="store.invitationPayload.orcid"
			></FormDisplayItemBasic>

			<Icon
				v-if="store.invitationPayload.orcidValidation"
				icon="orcid"
				:inline="true"
			/>

			<FormDisplayItemBasic
				heading-element="h4"
				:heading="t('user.givenName')"
				:value="localize(store.invitationPayload.givenName)"
			></FormDisplayItemBasic>

			<FormDisplayItemBasic
				heading-element="h4"
				:heading="t('user.familyName')"
				:value="localize(store.invitationPayload.familyName)"
			></FormDisplayItemBasic>

			<FormDisplayItemBasic
				heading-element="h4"
				:heading="t('user.affiliation')"
				:value="localize(store.invitationPayload.affiliation)"
			></FormDisplayItemBasic>
		</div>
	</div>
	<div class="p-8">
		<UserInvitationUserGroupsTable
			:user-groups="userGroups"
			:errors="sectionErrors"
		/>
	</div>
</template>

<script setup>
import {defineProps, computed} from 'vue';
import FormDisplayItemBasic from '@/components/FormDisplay/FormDisplayItemBasic.vue';
import Icon from '@/components/Icon/Icon.vue';
import PkpForm from '@/components/Form/Form.vue';
import {useTranslation} from '@/composables/useTranslation';
import UserInvitationUserGroupsTable from './UserInvitationUserGroupsTable.vue';
import {useUserInvitationPageStore} from './UserInvitationPageStore';
import {useForm} from '@/composables/useForm';

function updateUserForm(a, form, c, d) {
	set(a, form, c, d);
	if (form.fields) {
		form.fields.forEach((field) => {
			if (
				field.isMultilingual &&
				!Object.values(field.value).every(
					(value) => value === null || value === '',
				)
			) {
				store.updatePayload(field.name, field.value, false);
			} else if (
				!field.isMultilingual &&
				!store.invitationPayload[field.name]
			) {
				store.updatePayload(field.name, field.value, false);
			}
		});
	}
}

const {t} = useTranslation();
const store = useUserInvitationPageStore();

const props = defineProps({
	form: {type: Object, required: true},
	userGroups: {type: Object, required: true},
	validateFields: {type: Array, required: true},
});
const {
	form: userForm,
	connectWithPayload,
	connectWithErrors,
	set,
} = useForm(props.form);

if (!store.invitationPayload.userId) {
	userForm.value.fields.forEach((field) => {
		if (field.isMultilingual) {
			store.updatePayload(
				field.name,
				store.invitationPayload[field.name]
					? store.invitationPayload[field.name]
					: field.value,
				store.invitationPayload[field.name] ? false : true,
			);
		} else {
			if (store.invitationPayload[field.name] === null) {
				store.updatePayload(field.name, field.value, true);
			} else {
				store.updatePayload(
					field.name,
					store.invitationPayload[field.name],
					true,
				);
			}
		}
	});
}

connectWithPayload(store.invitationPayload);

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
