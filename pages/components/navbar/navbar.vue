<template>
	<view class="nav-wrap" :style="{ paddingTop: safeAreaInsets ? safeAreaInsets.top + 5 +'px' : '0' }">
		<view class="goback" @click="goback">
			<image v-if="showGoback" class="goback-icon" src="../../static/goback.png" />
		</view>
		<view class="title">
			<text class="navtext">{{pageTitle || '测量系统'}}</text>
		</view>
		<view class="occupied" />
	</view>
</template>

<script>
	export default {
		props: {
			pageTitle: {
				type: String,
				required: true
			},
			showGoback: {
				type: Boolean,
				required: false
			}
		},
		data() {
			return {
				safeAreaInsets: null,
			}
		},
		computed: {

		},
		created() {

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
			goback() {
				if (this.showGoback)
					uni.navigateBack().catch(() => {
						uni.switchTab({
							url: '/pages/home/home'
						})
					});
			}
		}
	};
</script>

<style scoped lang="scss">
	.nav-wrap {
		padding-top: 32px;
		background-image: url(@/static/navigator_bg.png);
		background-size: cover;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 28rpx;

		// 返回
		.goback {
			width: 40px;
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;

			.goback-icon {
				width: 24px;
				height: 24px;
			}
		}

		// 
		.title {
			display: flex;
			justify-content: center;
			align-items: center;

			.navtext {
				color: white;
			}
		}

		// 占位符
		.occupied {
			width: 40px;
		}
	}
</style>