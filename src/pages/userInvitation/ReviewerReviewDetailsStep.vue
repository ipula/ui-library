<template>
	<FieldOptions
		:is-required="false"
		component="field-options"
		:all-errors="{}"
		name="reviewTypes"
		label="Review Types"
		type="radio"
		:options="options"
		@change="
			(fieldName, propName, newValue, localeKey) =>
				updateReviewDetails(index, fieldName, newValue)
		"
	/>
	<FieldText
		name="responseDueDate"
		:label="t('reviewr.responseDueDate')"
		input-type="date"
		:is-required="true"
		value=""
		:all-errors="{}"
		@change="
			(fieldName, propName, newValue, localeKey) =>
				updateReviewDetails(index, fieldName, newValue)
		"
	/>
	<FieldText
		name="reviewDueDate"
		:label="t('reviewr.reviewDueDate')"
		input-type="date"
		:is-required="true"
		value=""
		:all-errors="{}"
		@change="
			(fieldName, propName, newValue, localeKey) =>
				updateReviewDetails(index, fieldName, newValue)
		"
	/>
</template>
<script setup>
import {defineProps} from 'vue';
import FieldOptions from '@/components/Form/fields/FieldOptions.vue';
import FieldText from '@/components/Form/fields/FieldText.vue';
import {useLocalize} from '@/composables/useLocalize';
import {useUserInvitationPageStore} from './UserInvitationPageStore';

defineProps({
	validateFields: {
		type: Array,
		default() {
			return null;
		},
	},
});

const store = useUserInvitationPageStore();
const {t} = useLocalize();
const options = [
	{value: 'anonymus', label: 'Anonymus Reviewer / Anonymus Author'},
	{value: 'disclosed', label: 'Anonymus Reviewer / Disclosed Author'},
	{value: 'open', label: 'open'},
];

function updateReviewDetails(index, fieldName, newValue) {
	store.updatePayload(fieldName, newValue, false);
}
</script>
