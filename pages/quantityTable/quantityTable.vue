<template>
	<view class="wrapper">
		<navbar :quantityTable="quantityTable" :showGoback="!currentpage" />

		<view class="content">
			<!-- 总指引 -->
			<view class="guide-wrap" v-if="!currentpage">
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
						<uni-list-item v-for="item in itemList" :key="item.key" showArrow clickable :title="item.title"
							:note="item.note" :thumb="item.thumb" :thumb-size="item.thumbSize"
							@click="openPage(item)" />
					</uni-list>
				</view>
			</view>

			<!-- 组件页面 -->
			<evaluateForm v-else-if="currentpage == 1" :defaultValue="evaluateFormValue"
				@handleFormDataChange="handleEvaluateFormDataChange" />
			<recording v-else-if="currentpage == 2" @onChange="handleSaveRecording" :defaultValue="recordingVoicePath"/>
			<imgUpload v-else-if="currentpage == 3" @onChange="handleSaveImg" />
			<mmse v-else-if="currentpage == 4 " />
			<moca v-else-if="currentpage == 5" />
		</view>

		<!-- 按钮区域 -->
		<view class="foot" v-if="!!currentpage">
			<button class="btn" @click="switchPage('down')" v-if="currentpage != 1">上一题</button>
			<button class="btn" @click="switchPage('cancel')" v-else>取消测试</button>
			<button class="btn" @click="switchPage('up')" v-if="currentpage != 5">下一题</button>
			<button class="btn" @click="switchPage('submit')" v-else>提交</button>
		</view>
	</view>
</template>

<script>
	import navbar from '@/components/navbar/navbar.vue';
	import evaluateForm from './components/table.vue'
	import recording from './components/recording.vue'
	import imgUpload from './components/img-upload.vue'
	import mmse from './components/mmse.vue'
	import moca from './components/moca.vue'

	export default {
		components: {
			evaluateForm,
			recording,
			imgUpload,
			mmse,
			moca
		},
		data() {
			return {
				safeAreaInsets: null,
				quantityTable: "阿尔兹海默病筛查",
				old_id: "老人id",
				currentpage: 0,
				// 第一个表单的数据
				evaluateFormValue: {
					name: '孙安',
					sex: 1
				},
				// 图片list
				imgList: [],
				// 录音
				recordingVoicePath: '',
				itemList: [{
						title: '阿尔兹海默病早期筛查及评估',
						note: '',
						thumb: '/static/quantityTable.png',
						thumbSize: 'lg',
						// to: '/pages/quantityTable/table1'
						key: 1
					},
					{
						title: 'Mini-Cog量表',
						note: '',
						thumb: '/static/quantityTable.png',
						thumbSize: 'lg',
						// to: '/pages/recording/recording'
						key: 2
					},
					{
						title: 'HIS量表',
						note: '',
						thumb: '/static/quantityTable.png',
						thumbSize: 'lg',
						// to: '/pages/index/index'
						key: 3
					},
					{
						title: 'MMSE量表',
						note: '',
						thumb: '/static/quantityTable.png',
						thumbSize: 'lg',
						// to: '/pages/test/test'
						key: 4
					},
					{
						title: 'MoCA量表',
						note: '',
						thumb: '/static/quantityTable.png',
						thumbSize: 'lg',
						// to: '/pages/test/test'
						key: 5
					},
				]
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
			openPage(item) {
				this.currentpage = item.key;
			},
			// 切换页面
			switchPage(type) {
				if (type == 'up') this.currentpage += 1;
				else if (type == 'down') this.currentpage -= 1;
				else if (type == 'submit') {
					console.log('提交', JSON.stringify(this.evaluateFormValue), this.imgList, this.recordingVoicePath);
					// 接口上传 TODO
				} else this.currentpage = 0;
			},
			// 测评表单数据变化
			handleEvaluateFormDataChange(data) {
				this.evaluateFormValue = data;
			},
			// 上传图片发生变化
			handleSaveImg(data) {
				console.log('handleSaveImg', data)
				this.imgList = data;
			},
			// 录音文件发生变化
			handleSaveRecording(data) {
				console.log('handleSaveRecording', data)
				this.recordingVoicePath = data;
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
			display: flex;
			justify-content: space-between;
			padding: 8px 12px;
			background-color: #ffffff;

			.btn {
				width: 46%;
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