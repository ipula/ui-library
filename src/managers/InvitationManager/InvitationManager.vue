<template>
	<div
		v-if="!isInvitationLoading"
		class="flex items-center pb-2 pt-2 text-3xl-normal"
	>
		<h4>
			{{ t('invitation.header') }}({{ store.invitationsPagination.itemCount }})
		</h4>
		<div class="ml-auto">
			<PkpButton @click="store.sendInvitation">
				{{ t('invitation.inviteToRole.btn') }}
			</PkpButton>
		</div>
	</div>
	<PkpTable aria-label="Example for basic table">
		<TableHeader>
			<TableColumn>{{ t('invitation.tableHeader.name') }}</TableColumn>
			<TableColumn>{{ t('about.contact.email') }}</TableColumn>
			<TableColumn>{{ t('invitation.header') }}</TableColumn>
			<TableColumn>{{ t('common.status') }}</TableColumn>
			<TableColumn>{{ t('user.affiliation') }}</TableColumn>
			<TableColumn></TableColumn>
		</TableHeader>
		<TableBody>
			<TableRow v-for="(row, index) in store.invitations" :key="index">
				<TableCell>
					{{
						row.userId
							? row.existingUser.fullName
							: store.getFullName(row.givenName, row.familyName)
					}}
					<Icon icon="orcid" :inline="true" />
				</TableCell>
				<TableCell>
					{{ row.userId ? row.existingUser.email : row.email }}
				</TableCell>
				<TableCell>
					<template v-for="(userGroups, i) in row.userGroupsToAdd" :key="i">
						<span>
							{{ localize(userGroups.userGroupName) }}
						</span>
						<br />
					</template>
				</TableCell>
				<TableCell>
					Invited
					{{ new Date(row.createdAt).toLocaleDateString('en-US') }}
				</TableCell>
				<TableCell>
					{{
						row.userId
							? localize(row.existingUser.affiliation)
							: localize(row.affiliation)
					}}
				</TableCell>
				<TableCell>
					<DropdownActions
						:actions="[
							{
								label: t('common.edit'),
								url: store.pageUrl + '/' + row.id,
								icon: 'Edit',
							},
							{
								label: t('invitation.cancelInvite.actionName'),
								icon: 'Cancel',
								name: 'cancelInvite',
								isWarnable: true,
							},
						]"
						label="Invitation management options"
						:display-as-ellipsis="true"
						direction="left"
						@action="(actionName) => store.handleReviewAction(row)"
					/>
				</TableCell>
			</TableRow>
		</TableBody>
	</PkpTable>
	<div class="flex justify-end">
		<Pagination
			:current-page="store.invitationsPagination.currentPage"
			:last-page="store.invitationsPagination.pageCount"
			:is-loading="store.isInvitationLoading"
			:show-adjacent-pages="3"
			@set-page="store.setCurrentPage"
		/>
	</div>
</template>

<script setup>
import PkpTable from '@/components/Table/Table.vue';
import TableCell from '@/components/Table/TableCell.vue';
import TableHeader from '@/components/Table/TableHeader.vue';
import TableColumn from '@/components/Table/TableColumn.vue';
import TableBody from '@/components/Table/TableBody.vue';
import TableRow from '@/components/Table/TableRow.vue';
import Icon from '@/components/Icon/Icon.vue';
import PkpButton from '@/components/Button/Button.vue';
import {useInvitationManagerStore} from './InvitationManagerStore.js';
import Pagination from '@/components/Pagination/Pagination.vue';
import {useTranslation} from '@/composables/useTranslation';
import DropdownActions from '@/components/DropdownActions/DropdownActions.vue';

const store = useInvitationManagerStore();
const {t} = useTranslation();
</script>
