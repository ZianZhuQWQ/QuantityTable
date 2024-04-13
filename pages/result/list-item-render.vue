<template>
	<view class="item-wrap">
		<!-- 左边 -->
		<view class="left-wrap">
			{{ dateStr }}
		</view>

		<!-- 右边 -->
		<view class="right-wrap" @click="gotoDetail">
			查看结果详情
			<image class="arrow-right" :src="require('@/static/detail.png')" />
		</view>
	</view>
</template>

<script>
	import {
		formatDateTime
	} from '@/common/api/moment.js';

	export default {
		name: "list-item-render",
		props: {
			date: {
				require: true,
			}
		},
		data() {
			return {
				dateStr: formatDateTime(new Date(this.date), 'yyyy-MM-dd')
			};
		},
		methods: {
			// 跳转详情页
			gotoDetail() {
				this.$emit('gotoDetail', this.date)
			}
		}
	}
</script>

<style lang="scss">
	.item-wrap {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 8px 12px;
		min-height: 56px;
		width: 100%;
		border-top: 1px solid #eeeeee;
		box-sizing: border-box;

		&:last-child {
			border-bottom: 1px solid #eeeeee;
		}

		.right-wrap {
			display: flex;
			align-items: center;
			color: #999;
			font-size: 13px;

			.arrow-right {
				width: 14px;
				height: 14px;
			}
		}
	}
</style>