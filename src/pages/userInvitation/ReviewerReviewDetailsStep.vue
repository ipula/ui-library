<template>
	<FieldOptions
		:isRequired="false"
		component="field-options"
		:allErrors="{}"
		name="reviewTypes"
		label="Review Types"
		type="radio"
		:options="options"
		@change="change"
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
				updateUserGroup(index, fieldName, newValue)
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
				updateUserGroup(index, fieldName, newValue)
		"
	/>
</template>
<script setup>
import {defineProps} from 'vue';
import FieldOptions from '@/components/Form/fields/FieldOptions.vue';
import FieldText from '@/components/Form/fields/FieldText.vue';
import {useLocalize} from '@/composables/useLocalize';

defineProps({
	validateFields: {
		type: Array,
		default() {
			return null;
		},
	},
});

const {t} = useLocalize();
const options = [
	{value: 'anonymus', label: 'Anonymus Reviewer / Anonymus Author'},
	{value: 'disclosed', label: 'Anonymus Reviewer / Disclosed Author'},
	{value: 'open', label: 'open'},
];
</script>
