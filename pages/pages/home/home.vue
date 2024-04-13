<template>
	<view class="pages">
		<navbar :pageTitle="pageTitle" />

		<view class="btn-area">
			<button @click="goQuantityTable">新建测评</button>
		</view>

		<button open-type="contact">联系客服</button>

		<!-- <button open-type="contact" style="border-radius: 0;display: hidden;flex-direction: column;align-items: center;justify-content: center;">
			<image src="../../static/service.png" mode="widthFix" style="height:46rpx;width: 42rpx ;margin-bottom:10rpx;"></image>
			<text>联系客服</text>
		</button> -->

		<!-- 会话功能 -->
		<button open-type="contact" id="btnId" style="display: none" bindtap="clickToShare"></button>
		<!-- <button open-type='feedback'>意见反馈</button> -->

		<view>
			<uni-list>

				<uni-list-item>
					<view slot="body" style="flex-direction: row;align-items: center;">
						<!-- <text class="slot-text">默认插槽</text> -->
						<button open-type='feedback'>意见反馈</button>
						<!-- <uni-badge text="2" type="primary" /> -->
					</view>
				</uni-list-item>

				<uni-list-item title="自定义右侧插槽" note="列表描述信息" link>
					<template slot="header">
						<image style="width: 30px;height: 30px;" src="/static/logo.png" mode="widthFix" />
					</template>
				</uni-list-item>

				<uni-list-item>
					<view slot="header">
						<image style="width: 30px;height: 30px;" src="/static/logo.png" mode="widthFix" />
					</view>

					<text slot="body" class="slot-text">自定义左侧插槽</text>
					<template slot="footer">
						<image style="width: 30px;height: 30px;" src="/static/logo.png" mode="widthFix" />
					</template>
				</uni-list-item>

			</uni-list>
		</view>
	</view>

</template>

<script>
	import navbar from '@/components/nav-bar.vue';

	export default {
		components: {
			navbar
		},
		data() {
			return {
				safeAreaInsets: null,
				pageTitle: "首页",
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
			onClick(e) {
				uni.showToast({
					title: '点击反馈'
				});
			},
			goQuantityTable() {
				uni.navigateTo({
					url: '/pages/test-page-nav/test-page-nav'
				});
			},
		}
	}
</script>

<style>
	.slot-text {
		flex: 1;
		font-size: 14px;
		color: #4cd964;
		margin-right: 10px;
	}
</style>