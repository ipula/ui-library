<template>
	<PkpTable>
		<TableHeader>
			<TableColumn>{{ t('userInvitation.roleTable.role') }}</TableColumn>
			<TableColumn>{{ t('userInvitation.roleTable.startDate') }}</TableColumn>
			<TableColumn>{{ t('userInvitation.roleTable.endDate') }}</TableColumn>
			<TableColumn>
				{{ t('userInvitation.roleTable.journalMasthead') }}
			</TableColumn>
			<TableColumn></TableColumn>
		</TableHeader>
		<TableBody>
			<TableRow
				v-for="(row, index) in store.invitationPayload.currentUserGroups"
				:key="index"
			>
				<TableCell>
					{{ localize(row.name) }}
				</TableCell>
				<TableCell>
					{{ row.dateStart ? row.dateStart : '---' }}
				</TableCell>
				<TableCell>
					{{ row.dateEnd ? row.dateEnd : '---' }}
				</TableCell>
				<TableCell>
					{{ row.masthead ? row.masthead : '---' }}
				</TableCell>
				<TableCell>
					<PkpButton :is-warnable="true" @click="removeUserGroup(row, index)">
						{{ t('invitation.role.removeRole.button') }}
					</PkpButton>
				</TableCell>
			</TableRow>
			<TableRow v-for="(row, index) in allUserGroupsToAdd" :key="index">
				<TableCell>
					<FieldSelect
						name="userGroupId"
						:label="t('invitation.role.selectRole')"
						:is-required="true"
						:value="row.userGroupId"
						:options="availableUserGroups"
						:all-errors="{
							userGroupId:
								userGroupErrors['userGroupsToAdd.' + index + '.userGroupId'],
						}"
						class="userInvitation__roleSelect"
						@change="
							(fieldName, propName, newValue, localeKey) =>
								updateUserGroup(index, fieldName, newValue)
						"
					/>
				</TableCell>
				<TableCell>
					<FieldText
						name="dateStart"
						:label="t('invitation.role.dateStart')"
						input-type="date"
						:is-required="true"
						:value="row.dateStart"
						:all-errors="{
							dateStart:
								userGroupErrors['userGroupsToAdd.' + index + '.dateStart'],
						}"
						@change="
							(fieldName, propName, newValue, localeKey) =>
								updateUserGroup(index, fieldName, newValue)
						"
					/>
				</TableCell>
				<TableCell>---</TableCell>
				<TableCell>
					<FieldSelect
						name="masthead"
						:label="t('invitation.role.masthead')"
						:is-required="true"
						:value="row.masthead"
						:options="[
							{label: t('invitation.masthead.show'), value: true},
							{label: t('invitation.masthead.hidden'), value: false},
						]"
						:all-errors="{
							masthead:
								userGroupErrors['userGroupsToAdd.' + index + '.masthead'],
						}"
						@change="
							(fieldName, propName, newValue, localeKey) =>
								updateUserGroup(index, fieldName, newValue)
						"
					/>
				</TableCell>
				<TableCell></TableCell>
			</TableRow>
			<TableRow>
				<TableCell>
					<PkpButton @click="addUserGroup()">
						{{ t('invitation.role.addRole.button') }}
					</PkpButton>
				</TableCell>
				<TableCell></TableCell>
				<TableCell></TableCell>
				<TableCell></TableCell>
				<TableCell></TableCell>
			</TableRow>
		</TableBody>
	</PkpTable>
</template>

<script setup>
import {computed} from 'vue';
import {useTranslation} from '@/composables/useTranslation';
import PkpTable from '@/components/Table/Table.vue';
import TableCell from '@/components/Table/TableCell.vue';
import TableHeader from '@/components/Table/TableHeader.vue';
import TableColumn from '@/components/Table/TableColumn.vue';
import TableBody from '@/components/Table/TableBody.vue';
import TableRow from '@/components/Table/TableRow.vue';
import FieldSelect from '@/components/Form/fields/FieldSelect.vue';
import PkpButton from '@/components/Button/Button.vue';
import FieldText from '@/components/Form/fields/FieldText.vue';
import {useUserInvitationPageStore} from './UserInvitationPageStore';

const props = defineProps({
	userGroups: {type: Object, required: true},
});

const store = useUserInvitationPageStore();
const {t} = useTranslation();

store.updateWithSelectedUserGroups(props.userGroups);

const allUserGroupsToAdd = computed(
	() => store.invitationPayload.userGroupsToAdd,
);

if (store.invitationPayload.userGroupsToRemove) {
	store.invitationPayload.userGroupsToRemove.forEach((element) => {
		store.invitationPayload.currentUserGroups.splice(
			store.invitationPayload.currentUserGroups.findIndex(
				(role) => role.id === element.userGroupId,
			),
			1,
		);
	});
}
/**
 * update selected user group
 * @param index Number
 * @param fieldName String
 * @param newValue String
 */
function updateUserGroup(index, fieldName, newValue) {
	const userGroupsUpdate = [...store.invitationPayload.userGroupsToAdd];
	userGroupsUpdate[index][fieldName] = newValue;
	store.updatePayload('userGroupsToAdd', userGroupsUpdate, false);
}

const availableUserGroups = computed(() => {
	return props.userGroups.filter((element) => {
		return !store.invitationPayload.currentUserGroups.find(
			(data) => data.id === element.value,
		);
	});
});

/**
 * add user groups to the invitation payload
 */
function addUserGroup() {
	const userGroupsUpdate = [...store.invitationPayload.userGroupsToAdd];
	userGroupsUpdate.push({
		userGroupId: null,
		dateStart: null,
		masthead: null,
	});
	store.updatePayload('userGroupsToAdd', userGroupsUpdate, false);
}

/**
 * remove user groups form user
 * @param userGroup Object
 * @param index Number
 */
function removeUserGroup(userGroup, index) {
	store.invitationPayload.currentUserGroups.splice(index, 1);
	let userGroupsToRemove = [];
	if (store.invitationPayload.userGroupsToRemove) {
		userGroupsToRemove = [...store.invitationPayload.userGroupsToRemove];
	}
	userGroupsToRemove.push({userGroupId: userGroup.id});
	store.updatePayload('userGroupsToRemove', userGroupsToRemove, false);
}

const userGroupErrors = computed(() => {
	return store.errors || [];
});
</script>
