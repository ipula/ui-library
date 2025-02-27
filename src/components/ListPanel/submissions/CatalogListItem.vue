<template>
	<div
		class="listPanel__item--catalog"
		:class="{
			'-isFeatured': isFeatured,
		}"
	>
		<div class="listPanel__itemSummary">
			<div class="listPanel__itemIdentity listPanel__itemIdentity--catalog">
				<div class="listPanel__item--catalog__id">
					{{ item.id }}
				</div>
				<div class="listPanel__itemTitle">
					<span
						v-if="currentPublication.authorsStringShort"
						class="listPanel__item--submission__author"
					>
						{{ currentPublication.authorsStringShort }}
					</span>
				</div>
				<div class="listPanel__itemSubtitle">
					{{ localize(currentPublication.fullTitle) }}
				</div>
			</div>

			<div class="listPanel__itemActions listPanel__itemActions--catalog">
				<PkpButton element="a" :href="item.urlWorkflow">
					{{ t('submission.list.viewSubmission') }}
				</PkpButton>
				<PkpButton element="a" :href="item.urlPublished">
					{{ t('submission.list.viewEntry') }}
				</PkpButton>
				<button
					class="listPanel__item--catalog__select listPanel__item--catalog__select--first text-secondary"
					@click.prevent="toggleFeatured"
				>
					<Icon v-if="isFeatured" icon="CheckboxTicked" class="h-4 w-4" />
					<Icon v-else icon="Checkbox" class="h-4 w-4" />
					<span class="-screenReader">
						<template v-if="isFeatured">
							{{ t('catalog.manage.isFeatured') }}
						</template>
						<template v-else>
							{{ t('catalog.manage.isNotFeatured') }}
						</template>
					</span>
				</button>
				<button
					class="listPanel__item--catalog__select text-secondary"
					@click.prevent="toggleNewRelease"
				>
					<Icon
						:icon="isNewRelease ? 'CheckboxTicked' : 'Checkbox'"
						class="h-4 w-4"
					/>
					<span class="-screenReader">
						<template v-if="isNewRelease">
							{{ t('catalog.manage.isNewRelease') }}
						</template>
						<template v-else>
							{{ t('catalog.manage.isNotNewRelease') }}
						</template>
					</span>
				</button>
			</div>
		</div>
		<Orderer
			v-if="isOrdering"
			:item-id="item.id"
			:item-title="item.title"
			@up="$emit('order-up', item)"
			@down="$emit('order-down', item)"
		/>
		<div
			v-if="isSaving || isLoading"
			class="listPanel__itemMask--catalog"
		></div>
	</div>
</template>

<script>
import PkpButton from '@/components/Button/Button.vue';
import Icon from '@/components/Icon/Icon.vue';
import Orderer from '@/components/Orderer/Orderer.vue';
import ajaxError from '@/mixins/ajaxError';

export default {
	name: 'CatalogListItem',
	components: {
		Orderer,
		PkpButton,
		Icon,
	},
	mixins: [ajaxError],
	props: ['apiUrl', 'filterAssocType', 'filterAssocId', 'isOrdering', 'item'],
	data() {
		return {
			isLoading: false,
			isSaving: false,
		};
	},
	computed: {
		/**
		 * The current publication of the submission
		 *
		 * @return {Object}
		 */
		currentPublication() {
			return this.item.publications.find(
				(publication) => publication.id === this.item.currentPublicationId,
			);
		},

		/**
		 * Is the submission featured in the current filtered view?
		 * press, category or series
		 *
		 * @return {Boolean}
		 */
		isFeatured() {
			if (!Object.prototype.hasOwnProperty.call(this.item, 'featured')) {
				return false;
			}
			const feature = this.item.featured.find((feature) => {
				return (
					feature.assoc_type === this.filterAssocType &&
					feature.assoc_id === this.filterAssocId
				);
			});
			return typeof feature !== 'undefined';
		},

		/**
		 * Is the submission a new release in the current filtered view?
		 * press, category or series
		 *
		 * @return {Boolean}
		 */
		isNewRelease() {
			if (!Object.prototype.hasOwnProperty.call(this.item, 'newRelease')) {
				return false;
			}
			const newRelease = this.item.newRelease.find((newRelease) => {
				return (
					newRelease.assoc_type === this.filterAssocType &&
					newRelease.assoc_id === this.filterAssocId
				);
			});
			return typeof newRelease !== 'undefined';
		},
	},
	methods: {
		/**
		 * Toggle the checkbox when clicked
		 */
		toggleFeatured() {
			const isFeatured = this.item.featured.find((feature) => {
				return feature.assoc_type === this.filterAssocType;
			});
			if (isFeatured) {
				this.$emit('update:item', {
					...this.item,
					featured: this.item.featured.filter((feature) => {
						return feature.assoc_type !== this.filterAssocType;
					}),
				});
			} else {
				let featured = [...this.item.featured];
				featured.push({
					assoc_type: this.filterAssocType,
					assoc_id: this.filterAssocId,
					seq: 1,
				});
				this.$emit('update:item', {
					...this.item,
					featured,
				});
			}
			this.$nextTick(() => this.saveDisplayFlags());
		},

		/**
		 * Toggle the checkbox when clicked
		 */
		toggleNewRelease() {
			const matchingNewReleases = this.item.newRelease.find((newRelease) => {
				return newRelease.assoc_type === this.filterAssocType;
			});
			const isNewRelease = typeof matchingNewReleases !== 'undefined';
			if (isNewRelease) {
				this.$emit('update:item', {
					...this.item,
					newRelease: this.item.newRelease.filter((newRelease) => {
						return newRelease.assoc_type !== this.filterAssocType;
					}),
				});
			} else {
				let newRelease = [...this.item.newRelease];
				newRelease.push({
					assoc_type: this.filterAssocType,
					assoc_id: this.filterAssocId,
					seq: 1,
				});
				this.$emit('update:item', {
					...this.item,
					newRelease,
				});
			}
			this.$nextTick(() => this.saveDisplayFlags());
		},

		/**
		 * Post updates to the featured or new release status of a submission
		 */
		saveDisplayFlags() {
			this.isLoading = true;

			const self = this;
			$.ajax({
				url: this.apiUrl + '/saveDisplayFlags',
				type: 'POST',
				headers: {
					'X-Csrf-Token': pkp.currentUser.csrfToken,
				},
				data: {
					submissionId: this.item.id,
					featured: this.item.featured,
					newRelease: this.item.newRelease,
				},
				error: function (r) {
					self.ajaxErrorCallback(r);
				},
				success: function (r) {
					if (typeof r.featured !== 'undefined') {
						self.$emit('update:item', {...self.item, featured: r.featured});
					}
					if (typeof r.newRelease !== 'undefined') {
						self.$emit('update:item', {...self.item, newRelease: r.newRelease});
					}
				},
				complete() {
					self.isLoading = false;
				},
			});
		},
	},
};
</script>

<style lang="less">
@import '../../../styles/_import';

// Shift padding to the catalog item so that focus indicator
// takes up full height
.listPanel--catalog .listPanel__item {
	position: relative;
	padding: 0;
}

.listPanel__itemIdentity--catalog {
	padding: 0.75rem 0.5rem;
	padding-inline-start: 3.5rem;
}

.listPanel__item--catalog__id {
	position: absolute;
	top: 0.75rem;
	left: 1rem;
	font-size: @font-tiny;
	line-height: 22px; // Match baseline of title
	color: @text;
}

.listPanel__itemActions--catalog {
	align-self: stretch;
}

.listPanel__item--catalog__select {
	align-self: stretch;
	width: 6rem;
	margin-inline-start: 0;
	background: transparent;
	border: 1px solid transparent;
	border-inline-start: @grid-border;

	&:focus {
		outline: 0;
		border-color: @primary;
	}

	+ .listPanel__item--catalog__select {
		right: 0;
	}
}

.listPanel__item--catalog__select--first {
	margin-inline-start: 0.5rem;
}

.listPanel__item--catalog {
	.orderer__dragDrop,
	.orderer__up,
	.orderer__down {
		width: 4em;
	}

	.orderer__up {
		right: 4em;
	}
}

.listPanel__itemMask--catalog {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: #fff;
	opacity: 0.5;
}

[dir='rtl'] {
	.listPanel__item--catalog__id {
		left: auto;
		right: 1rem;
	}
}
</style>
