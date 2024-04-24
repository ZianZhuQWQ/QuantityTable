<template>
	<view class="wrapper">
		<navbar pageTitle="阿尔茨海默病筛查" :showGoback="true" />

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
						<text>{{ userInfo.userName }}</text>
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
		<view class="foot" v-if="!isDetail">
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
				userInfo: {
					userId: '',
					userName: ''
				},
				// 是否是详情页（非编辑态）
				isDetail: 0,
				// 第一个表单的数据
				evaluateFormValue: {},
				// 图片list
				imgList: [],
				// 录音
				recordingVoicePath: '',
				// 页面组件配置
				itemList: store.state.pageNavItems || []
			}
		},
		onLoad: function(option) { // option为object类型，会序列化上个页面传递的参数
			this.isDetail = Number(option.isDetail || 0);
			this.$set(this.userInfo, 'userId', option.userId)
			this.$set(this.userInfo, 'userName', option.userName)
		},
		destroyed() {
			// 清除数据
			// store.commit('clearTestPageData');
		},
		mounted() {},
		methods: {
			openPage(url) {
				uni.navigateTo({
					url: `${url}?isDetail=${this.isDetail}&userInfo=${JSON.stringify(this.userInfo)}`,
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
				console.log('第三个表单数据', JSON.stringify(store.state.hisData))
				console.log('第四个表单数据', JSON.stringify(store.state.mmseData))
				console.log('第五个表单数据', JSON.stringify(store.state.mocaData))

				uni.showModal({
					title: '提示',
					content: '请保证完成五个问卷后再提交，是否提交',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							uni.switchTab({
								url: '/pages/result/result'
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

				
			},
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
					margin: 20rpx auto;
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