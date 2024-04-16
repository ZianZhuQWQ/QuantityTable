<template>
	<view class="nav-wrap" :style="{ paddingTop: safeAreaInsets ? safeAreaInsets.top + 5 +'px' : '0' }">
		<view class="btns" :class="showRefresh == 'left' && 'big-box'">
			<view class="goback" @click="goback">
				<image v-if="showGoback" class="icon" src="../static/goback.png" />
			</view>
			<view class="refresh" @click="refreshFn">
				<image v-if="showRefresh == 'left'" class="icon" :class="loading && 'loading'"
					src="../static/change.png" />
			</view>
		</view>
		<view class="title">
			<text class="navtext">{{pageTitle || '测量系统'}}</text>
		</view>
		<view class="btns" :class="showRefresh == 'left' && 'big-box'">
			<view class="refresh" @click="refreshFn">
				<image v-if="showRefresh == 'right'" class="icon" :class="loading && 'loading'"
					src="../static/change.png" />
			</view>
		</view>
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
			},
			showRefresh: {
				type: 'left' | 'right',
				required: false
			}
		},
		data() {
			return {
				safeAreaInsets: null,
				loading: false
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
			},
			refreshFn() {
				if (!!this.refresh && !this.loading) {
					this.loading = true;
					new Promise((res) => {
						this.$emit('refreshFn', res)
					}).then((res) => {
						this.loading = false;
					})
				}
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

		.btns {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 40px;
			&.big-box {
				width: 80px;
			}

			.goback,
			.refresh {
				width: 40px;
				cursor: pointer;
				display: flex;
				align-items: center;
				justify-content: center;

				.icon {
					width: 24px;
					height: 24px;

					&.loading {
						animation-name: rotate;
						animation-duration: 1s;
						animation-timing-function: linear;
						animation-iteration-count: infinite;
					}
				}
			}

		}

		.title {
			display: flex;
			justify-content: center;
			align-items: center;

			.navtext {
				color: white;
			}
		}

	}

	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}
</style>