<template>
	<div
		class="pkpHeader"
		:class="{'-isOneLine': isOneLine, '-pkpClearfix': !isOneLine}"
	>
		<span class="pkpHeader__title">
			<slot />
		</span>
		<div v-if="hasActions" class="pkpHeader__actions">
			<slot name="actions" />
		</div>
	</div>
</template>

<script>
export default {
	props: {
		/** Truncate the header text to fit on one line. */
		isOneLine: {
			type: Boolean,
			default: true,
		},
	},
	computed: {
		hasActions() {
			return this.$slots.actions;
		},
	},
};
</script>

<style lang="less">
@import '../../styles/_import';

.pkpHeader {
	padding: 1rem 2rem;
	@apply text-heading;
}

.pkpHeader__title {
	display: inline-block;
	margin: 0;
	font-size: @font-base;
	line-height: 1.2;

	> * {
		display: inline-block;
		vertical-align: middle;
	}

	.pkpSpinner {
		margin-inline-start: 0.5rem;
	}
}

.pkpHeader__title > h1,
.pkpHeader__title > h2,
.pkpHeader__title > h3,
.pkpHeader__title > h4,
.pkpHeader__title > h5,
.pkpHeader__title > h6,
.pkpHeader__title > legend {
	margin: 0;
	font-size: @font-base;
	font-weight: @bold;
	line-height: calc(2rem + 2px); // Matches buttons
}

.pkpHeader__title > legend {
	display: block;
}

.pkpHeader__actions {
	float: right;
	margin-top: -1px; // button borders

	> * {
		display: inline-block;

		&:first-child {
			margin-inline-start: 1rem;
		}
	}

	> * + * {
		margin-inline-start: 1rem;
	}
}

.pkpHeader.-isOneLine {
	display: flex;
	align-items: center;

	.pkpHeader__title {
		margin-right: auto; // flex: align left when only one item
		min-width: 1px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		width: 100%;
	}

	.pkpHeader__actions {
		float: none;
		display: flex;
		align-items: center;
		margin-inline-start: auto;

		> * {
			white-space: nowrap;
		}
	}
}

[dir='rtl'] {
	.pkpHeader__actions {
		float: left;
	}
}
</style>
