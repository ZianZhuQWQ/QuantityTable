<template>
	<view class="wrapper">
		<navbar :pageTitle="pageTitle" :showGoback="true" />

		<view class="content">
			<!-- 总指引 -->
			<view class="guide-wrap">
				<!-- 个人资料 -->
				<view class="center_top">
					<view class="center_img">
						<!-- 这里可以放自己的静态头像 -->
						<image class="avatar" src="/static/old.png"></image>
						<open-data type="userAvatarUrl" class="user_head"></open-data>
					</view>
					<view class="center_info">
						<text>{{old_id}}</text>
					</view>
				</view>
				<!-- 其它 -->
				<view class="extra">
					<uni-list>
						<uni-list-item v-for="item in itemList" :key="item.to" showArrow clickable :title="item.title"
							:note="item.note" :thumb="item.thumb" :thumb-size="item.thumbSize"
							@click="openPage(item.to)" />
					</uni-list>
				</view>
			</view>
		</view>

		<!-- 按钮区域 -->
		<view class="foot">
			<button @click="handleSubmit">提交</button>
		</view>
	</view>
</template>

<script>
	import navbar from '@/components/nav-bar.vue';
	import store from '@/store/index.js'

	export default {
		components: {
			navbar
		},
		data() {
			return {
				safeAreaInsets: null,
				pageTitle: "阿尔兹海默病筛查",
				old_id: "老人id",
				// 第一个表单的数据
				evaluateFormValue: {},
				// 图片list
				imgList: [],
				// 录音
				recordingVoicePath: '',
				// 页面组件配置
				itemList: [{
						title: '阿尔兹海默病早期筛查及评估',
						note: '',
						thumb: '/static/quantityTable.png',
						thumbSize: 'lg',
						to: '/pages/test-page-nav/evaluate-form/evaluate-form'
					},
					{
						title: 'Mini-Cog量表',
						note: '',
						thumb: '/static/quantityTable.png',
						thumbSize: 'lg',
						to: '/pages/test-page-nav/mini-cog/mini-cog'
					},
					{
						title: 'HIS量表',
						note: '',
						thumb: '/static/quantityTable.png',
						thumbSize: 'lg',
						to: '/pages/test-page-nav/his/his'
					},
					{
						title: 'MMSE量表',
						note: '',
						thumb: '/static/quantityTable.png',
						thumbSize: 'lg',
						to: '/pages/test-page-nav/mmse/mmse'
					},
					{
						title: 'MoCA量表',
						note: '',
						thumb: '/static/quantityTable.png',
						thumbSize: 'lg',
						to: '/pages/test-page-nav/moca/moca'
					},
				]
			}
		},
		mounted() {
			this.getSafeAreaInsets()
		},
		destroyed() {
			// 清除数据
			store.commit('clearTestPageData');
		},
		methods: {
			getSafeAreaInsets() {
				// 获取屏幕边界到安全区域距离
				const systemInfo = uni.getSystemInfoSync()
				this.safeAreaInsets = systemInfo.safeAreaInsets
			},
			openPage(url) {
				uni.navigateTo({
					url: url
				});
			},
			// 测评表单数据变化
			handleEvaluateFormDataChange(data) {
				this.evaluateFormValue = data;
			},
			// 上传图片发生变化
			handleSaveImg(data) {
				this.imgList = data;
			},
			// 录音文件发生变化
			handleSaveRecording(data) {
				this.recordingVoicePath = data;
			},
			// 总页面的提交
			handleSubmit() {
				console.log('第一个表单数据', JSON.stringify(store.state.evaluateFormData))
				console.log('第二个表单数据', JSON.stringify(store.state.miniCogData))
			}
		}
	};
</script>

<style scoped lang="scss">
	.wrapper {
		display: flex;
		flex-direction: column;
		height: 100vh;

		.content {
			flex: 1;
			overflow-y: auto;

			// 总指引
			.guide-wrap {
				.center_top {
					display: flex;
					flex-direction: column;
					width: 80%;
					height: 200rpx;
					margin: 0 auto;
					margin-top: 20rpx;
					border-bottom: 1px solid #EEEEEE;
					justify-content: center;
					align-items: center;

					.center_img {
						width: 66px;
						height: 66px;
						border-radius: 50%;
						overflow: hidden;

						.avatar {
							width: 100%;
							height: 100%;
							border-radius: 50%;


						}

						.user_head {
							width: 100%;
							height: 100%;
						}

					}

					.center_info {
						display: flex;
						flex-direction: column;
						margin-top: 16rpx;
					}
				}
			}
		}

		// 按钮区域
		.foot {
			border-top: 1px solid #dddddd;
			padding: 8px 12px;
			display: flex;
			justify-content: space-between;
			padding: 8px 12px;
			background-color: #ffffff;

			button {
				width: 100%;
				height: 40px;
				background-color: #5cd7aa;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #ffffff;
			}
		}
	}
</style>