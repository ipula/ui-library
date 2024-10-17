<template>
	<PkpTable>
		<template #label>
			<h3 class="text-3xl-bold">
				{{ t('grid.user.currentUsers') }}({{
					store.userAccessPagination.itemCount
				}})
			</h3>
		</template>
		<template #top-controls>
			<Search
				:search-phrase="searchPhrase"
				:search-label="t('userAccess.search')"
				@search-phrase-changed="store.setSearchPhrase"
			/>
		</template>
		<TableHeader>
			<TableColumn>{{ t('userAccess.tableHeader.name') }}</TableColumn>
			<TableColumn>{{ t('about.contact.email') }}</TableColumn>
			<TableColumn>{{ t('user.roles') }}</TableColumn>
			<TableColumn>{{ t('userAccess.tableHeader.startDate') }}</TableColumn>
			<TableColumn>{{ t('user.affiliation') }}</TableColumn>
			<TableColumn>
				<span class="sr-only">{{ t('common.moreActions') }}</span>
			</TableColumn>
		</TableHeader>
		<TableBody>
			<TableRow v-for="(user, index) in store.userList" :key="index">
				<TableCell>
					{{ user.fullName }}
					<Icon v-if="user.orcidIsVerified" icon="orcid" :inline="true" />
				</TableCell>
				<TableCell>
					{{ user.email }}
				</TableCell>
				<TableCell>
					<template v-for="(userGroups, i) in user.groups" :key="i">
						<div class="flex flex-col">
							{{ localize(userGroups.name) }}
						</div>
					</template>
				</TableCell>
				<TableCell>
					<template v-for="(userGroups, i) in user.groups" :key="i">
						<div class="flex flex-col">
							{{ formatShortDate(userGroups?.startDate) }}
						</div>
					</template>
				</TableCell>
				<TableCell>
					{{ localize(user.affiliation) }}
				</TableCell>
				<TableCell>
					<DropdownActions
						:actions="actions"
						:label="t('userAccess.management.options')"
						:display-as-ellipsis="true"
						direction="left"
						@action="
							(actionName) => store.handleUserAccessAction(actionName, user)
						"
					/>
				</TableCell>
			</TableRow>
		</TableBody>
	</PkpTable>
	<TablePagination
		:pagination="store.userAccessPagination"
		@set-page="store.setCurrentPage"
	/>
</template>

<script setup>
import PkpTable from '@/components/Table/Table.vue';
import TableCell from '@/components/Table/TableCell.vue';
import TableHeader from '@/components/Table/TableHeader.vue';
import TableColumn from '@/components/Table/TableColumn.vue';
import TableBody from '@/components/Table/TableBody.vue';
import TableRow from '@/components/Table/TableRow.vue';
import Icon from '@/components/Icon/Icon.vue';
import {useUserAccessManagerStore} from './UserAccessManagerStore.js';
import TablePagination from '@/components/Table/TablePagination.vue';
import {useTranslation} from '@/composables/useTranslation';
import {useDate} from '@/composables/useDate';
import DropdownActions from '@/components/DropdownActions/DropdownActions.vue';
import Search from '@/components/Search/Search.vue';
import {ref} from 'vue';

const store = useUserAccessManagerStore();
const {t} = useTranslation();
const {formatShortDate} = useDate();
const searchPhrase = ref('');
const actions = [
	{
		label: t('common.edit'),
		name: 'editUser',
		icon: 'Edit',
	},
	{
		label: t('email.email'),
		icon: 'Email',
		name: 'sendEmail',
	},
	{
		label: t('grid.action.logInAs'),
		icon: 'LoginAs',
		name: 'sendEmail',
	},
	{
		label: t('common.cancel'),
		icon: 'Cancel',
		name: 'RemoveUser',
		isWarnable: true,
	},
	{
		label: t('grid.action.disable'),
		icon: 'DisableUser',
		name: 'DisableUser',
		isWarnable: true,
	},
	{
		label: t('grid.action.mergeUser'),
		icon: 'MergeUser',
		name: 'mergeUser',
	},
];
</script>
