import {defineComponentStore} from '@/utils/defineComponentStore';
import {useApiUrl} from '@/composables/useApiUrl';
import {useAnnouncer} from '@/composables/useAnnouncer';
import {useUrl} from '@/composables/useUrl';
import {useLocalize} from '@/composables/useLocalize';
import {useTranslation} from '@/composables/useTranslation';
import {useFetchPaginated} from '@/composables/useFetchPaginated';
import {useFetch} from '@/composables/useFetch';
import {useModal} from '@/composables/useModal';
import {useDate} from '@/composables/useDate';
import {ref, watch} from 'vue';
import InvitationManagerCancelInvitationDialogBody from './UserInvitationManagerCancelInvitationDialogBody.vue';

export const useUserInvitationManagerStore = defineComponentStore(
	'userInvitationsPage',
	() => {
		const {openDialog} = useModal();
		const {localize} = useLocalize();
		const {t} = useTranslation();
		const {formatShortDate} = useDate();
		/** Announcer */

		const {announce} = useAnnouncer();
		/**
		 * redirect to send invitation page
		 */
		const {pageUrl: sendInvitationPageUrl} = useUrl('invitation/invite');
		function createNewInvitation() {
			window.location = sendInvitationPageUrl.value;
		}

		/**
		 * get invitations with paginations
		 */
		const invitationCount = ref(0);

		const countPerPage = ref(2);
		const currentPage = ref(1);
		function setCurrentPage(_currentPage) {
			currentPage.value = _currentPage;
		}

		const {apiUrl} = useApiUrl('invitations');
		const {
			items: invitations,
			pagination: invitationsPagination,
			isLoading: isInvitationLoading,
			fetch: fetchInvitations,
		} = useFetchPaginated(apiUrl, {
			currentPage,
			pageSize: countPerPage,
		});
		watch(
			[currentPage],
			async () => {
				announce(t('common.loading'));

				await fetchInvitations();
				announce(t('common.loaded'));
			},
			{immediate: true},
		);

		/**
		 * get all invited user groups
		 * @param {Array} userGroups
		 * @returns
		 */
		function getAllInvitedRoles(userGroups) {
			let roles = '';
			userGroups.forEach((element) => {
				roles =
					roles +
					localize(element.userGroupName) +
					t('common.commaListSeparator');
			});

			return roles;
		}

		function handleInvitationAction(actionName, data) {
			console.log(actionName, data);
			if (actionName === 'editInvite') {
				handleEditInvitation(data);
			} else {
				handleCancelInvitation(data);
			}
		}

		function handleEditInvitation(data) {
			openDialog({
				title: t('userInvitation.edit.title'),
				message: t('userInvitation.edit.message'),
				actions: [
					{
						label: t('userInvitation.edit.title'),
						isPrimary: true,
						callback: async (close) => {
							window.location = sendInvitationPageUrl.value + '/' + data.id;
						},
					},
					{
						label: t('common.cancel'),
						isWarnable: true,
						callback: (close) => {
							close();
						},
					},
				],
			});
		}

		function handleCancelInvitation(data) {
			openDialog({
				title: t('invitation.cancelInvite.title'),
				bodyComponent: InvitationManagerCancelInvitationDialogBody,
				bodyProps: {
					message: t('invitation.cancelInvite.message', {
						givenName: data.existingUser
							? data.existingUser.givenName
							: data.givenName,
						familyName: data.existingUser
							? data.existingUser.familyName
							: data.familyName,
					}),
					email: data.existingUser ? data.existingUser.email : data.email,
					roles: getAllInvitedRoles(data.userGroupsToAdd),
					status:
						t('userInvitation.status.invited') +
						formatShortDate(data.createdAt),
					affiliation: data.affiliation ? data.affiliation : '',
				},
				actions: [
					{
						label: t('invitation.cancelInvite.title'),
						isPrimary: true,
						callback: async (close) => {
							const {apiUrl: cancelApiUrl} = useUrl(
								`invitations/${data.id}/cancel`,
							);
							const {fetch: cancelInvitation} = useFetch(cancelApiUrl.value, {
								method: 'PUT',
								body: {},
							});

							announce(t('common.loading'));
							await cancelInvitation();
							await fetchInvitations();
							announce(t('common.loaded'));
							close();
						},
					},
					{
						label: t('common.cancel'),
						isWarnable: true,
						callback: (close) => {
							close();
						},
					},
				],
			});
		}

		return {
			invitationCount,
			setCurrentPage,
			createNewInvitation,
			currentPage,
			invitationsPagination,

			invitations,
			isInvitationLoading,
			handleInvitationAction,
		};
	},
);
