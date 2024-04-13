<template>
	<view class="page-wrap">
		<view class="content">
			<view class="tips">
				<text>{{ tips }}</text>
			</view>

			<recording style="width: 100%; flex: 1" @onChange="onChange" :value="value" />
		</view>
	</view>
</template>

<script>
	import navbar from '@/components/nav-bar.vue';
	import recording from '@/components/recording.vue';

	export default {
		components: {
			navbar,
			recording,
		},
		props: {
			value: '',
		},
		data() {
			return {
				tips: '重复说出以上三个词'
			}
		},
		mounted() {
			this.getSafeAreaInsets()
		},
		methods: {
			getSafeAreaInsets() {
				// 获取屏幕边界到安全区域距离
				const systemInfo = uni.getSystemInfoSync()
				this.safeAreaInsets = systemInfo.safeAreaInsets
			},
			onChange (data) {
				this.$emit('onChange', data)
			}
		},
	}
</script>

<style lang="less" scoped>
	.page-wrap {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		padding: 16rpx;
		overflow-y: auto;
	}

	.content {
		box-sizing: border-box;
		width: 100%;
		height: 90%;
		background-color: #FFFFFF;
		border-radius: 16rpx;
		padding: 30rpx;
		display: flex;
		align-items: center;
		flex-direction: column;
		overflow-x: hidden;
	}

	.tips {
		font-weight: bold;
		font-size: 45rpx;
		text-align: center;
		justify-content: center;
		align-items: center;
		display: flex;
		box-sizing: border-box;
		padding: 8rpx;
		width: 100%;
		height: 300rpx;
		background-color: #e7eaec;
		border-radius: 8px;
	}

	.audioShow {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 40px 0 10px 0;
		width: 100%;

		.play-wrap {
			margin-bottom: 24px;
		}

		.recordBegin {
			width: 100%;
			display: flex;
			justify-content: center;

			.text {
				width: 120rpx;
				height: 120rpx;
				color: #FFFFFF;
				background: #76EEC6;
				border-radius: 50%;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

		.recordingShow {
			display: flex;
			justify-content: space-around;
			font-size: 22rpx;
			color: #76EEC6;

			image {

				&:nth-child(1),
				&:nth-child(3) {
					width: 56rpx;
					height: 56rpx;
				}

				&:nth-child(2) {
					width: 140rpx;
					height: 140rpx;
				}
			}

			.cancelBtn,
			.saveBtn {
				margin-top: 40rpx;
				width: 56rpx;
				text-align: center;
			}

			.cancelBtn {
				margin-left: 40rpx;
			}

			.saveBtn {
				margin-right: 40rpx;
			}
		}

		.timecountShow {
			color: #B2B2B2;
			font-size: 50rpx;
			text-align: center;
			margin: 60rpx 0;
		}
	}
</style>