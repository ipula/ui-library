import {defineComponentStore} from '@/utils/defineComponentStore';
import {useApiUrl} from '@/composables/useApiUrl';
import {useAnnouncer} from '@/composables/useAnnouncer';
import {useUrl} from '@/composables/useUrl';
import {useLocalize} from '@/composables/useLocalize';
import {useTranslation} from '@/composables/useTranslation';
import {useFetchPaginated} from '@/composables/useFetchPaginated';
import {useFetch} from '@/composables/useFetch';
import {useModal} from '@/composables/useModal';
import {computed, ref, watch} from 'vue';

export const useInvitationManagerStore = defineComponentStore(
	'invitationsPage',
	() => {
		const {openDialog} = useModal();
		const {localize} = useLocalize();
		const {t} = useTranslation();
		/** Announcer */

		const {announce} = useAnnouncer();
		/**
		 * redirect to send invitation page
		 */
		const {pageUrl} = useUrl('invitation/invite');
		const sendInvitationPageUrl = computed(() => {
			return pageUrl.value;
		});
		function sendInvitation() {
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
		const getInvitationApiUrl = computed(() => {
			return apiUrl.value;
		});
		const {
			items: invitations,
			pagination: invitationsPagination,
			isLoading: isInvitationLoading,
			fetch: fetchInvitation,
		} = useFetchPaginated(getInvitationApiUrl, {
			currentPage,
			pageSize: countPerPage,
		});
		watch(
			[currentPage],
			async () => {
				announce(t('common.loading'));

				await fetchInvitation();
				announce(t('common.loaded'));
			},
			{immediate: true},
		);

		/**
		 * create user full name
		 * @param String givenName
		 * @param String familyName
		 * @returns String
		 */
		function getFullName(givenName, familyName) {
			return localize(givenName) + ' ' + localize(familyName);
		}

		/**
		 * get all invited user groups
		 * @param {Array} userGroups
		 * @returns
		 */
		function getAllInvitedRoles(userGroups) {
			let roles = '';
			userGroups.forEach((element) => {
				roles = roles + localize(element.userGroupName) + ', ';
			});

			return roles;
		}

		function handleReviewAction(data) {
			openDialog({
				title: t('invitation.cancelInvite.title'),
				message: t('invitation.cancelInvite.message', {
					givenName: data.givenName,
					familyName: data.familyName,
					email: data.email,
					roles: getAllInvitedRoles(data.userGroupsToAdd),
					status:
						'invited ' + new Date(data.createdAt).toLocaleDateString('en-US'),
					affiliation: data.affiliation ? data.affiliation : '',
				}),
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
							await fetchInvitation();
							announce(t('common.loaded'));
							close();
						},
					},
					{
						label: t('common.cancel'),
						isWarnable: true,
						callback: (close) => {},
					},
				],
			});
		}

		return {
			invitationCount,
			setCurrentPage,
			sendInvitation,
			currentPage,
			invitationsPagination,
			pageUrl,

			invitations,
			isInvitationLoading,
			getFullName,
			handleReviewAction,
		};
	},
);
