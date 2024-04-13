<template>
	<view class="mini-cog-wrap" :class="isDetail && 'detail-page'">
		<navbar :pageTitle="'MINI-COG量表 ' + current + '/3'" :showGoback="true" />

		<view class="content">
			<!-- 第一题录音 -->
			<recordingOne v-if="current == 1 || isDetail" @onChange="handleSaveRecording" :value="firstQuestion"
				:isDetail="isDetail" />
			<!-- 第二题画图 -->
			<uploadVideo v-if="current == 2 || isDetail" @onChange="handleSaveVideo" :value="secondQuestion"
				:isDetail="isDetail" />
			<!-- 第三题录音 -->
			<recordingThree v-if="current == 3 || isDetail" @onChange="handleSaveRecording" :value="thirdQuestion"
				:isDetail="isDetail" />

			<view class="score" v-if="isDetail">
				总得分：{{ score }}
			</view>
		</view>

		<!-- 按钮区域 -->
		<view class="foot" v-if="!isDetail">
			<button class="btn" @click="switchPage('down')" v-if="current != 1">上一题</button>
			<button class="btn" @click="switchPage('cancel')" v-else>取消测试</button>
			<button class="btn" @click="switchPage('up')" v-if="current != 3">下一题</button>
			<button class="btn" @click="switchPage('submit')" v-else>提交</button </view>
		</view>

		<view class="foot" v-else>
			<button class="btn" @click="gotoDetail('/pages/test-page-nav/evaluate-form/evaluate-form')">上一页</button>
			<button class="btn" @click="gotoDetail('/pages/test-page-nav/his/his')">下一页</button>
		</view>
	</view>
</template>

<script>
	import navbar from '@/components/nav-bar.vue';
	import recordingOne from './one.vue';
	import uploadVideo from './two.vue';
	import recordingThree from './three.vue';
	import store from '@/store/index.js'

	export default {
		components: {
			navbar,
			uploadVideo,
			recordingOne,
			recordingThree
		},
		data() {
			return {
				current: 1,
				firstQuestion: {
					voicePath: '',
				},
				secondQuestion: {
					videoPath: '',
				},
				otherData: {
					patient_id: '',
					patient_name: '',
				},
				thirdQuestion: {
					voicePath: ''
				},
				isDetail: false
			}
		},
		mounted() {
			this.getData();
		},
		onLoad: function(option) { // option为object类型，会序列化上个页面传递的参数
			this.isDetail = !!Number(option.isDetail);
			if (option.userInfo) {
				const userInfo = JSON.parse(option.userInfo)
				this.$set(this.otherData, 'patient_id', userInfo.userId)
				this.$set(this.otherData, 'patient_name', userInfo.userName)
			}
		},
		methods: {
			// 切换页面和提交
			switchPage(type) {
				if (type == 'up') this.current += 1;
				else if (type == 'down') this.current -= 1;
				else if (type == 'submit') {
					// 判断是否有分数
					if (!Object.keys(this.secondQuestion).includes('result')) {
						this.current = 2;
						uni.showToast({
							title: '请上传图片后，并选择结果',
							icon: 'none'
						})
					} else if (!Object.keys(this.thirdQuestion).includes('result')) {
						this.current = 3;
						uni.showToast({
							title: '请完成录音后，并选择结果',
							icon: 'none'
						})
					} else {
						const data = {
							firstQuestion: this.firstQuestion,
							secondQuestion: this.secondQuestion,
							thirdQuestion: this.thirdQuestion
						}
						console.log('JSON.stringify(data)', JSON.stringify(data))
						// 注入仓库
						store.commit('setMiniCogData', data)
					}
				} else uni.navigateBack().catch(() => {
					uni.switchTab({
						url: '/pages/home/home'
					})
				});
			},
			// 上传视频发生变化
			handleSaveVideo(data) {
				this.secondQuestion = data;
			},
			// 录音文件发生变化
			handleSaveRecording(data) {
				if (this.current == 3)
					this.thirdQuestion = data;
				else this.firstQuestion = data;
			},
			// 赋值初始值
			getData() {
				const {
					firstQuestion,
					secondQuestion,
					thirdQuestion
				} = store.state.miniCogData || {}

				// this.firstQuestion = JSON.parse(
				// 	'{"voicePath":"_doc/uniapp_temp_1711375757022/recorder/1711375760731.aac"}') || firstQuestion || {};
				// this.secondQuestion = JSON.parse(
				// 	'{"videoPath":"file:///storage/emulated/0/Android/data/io.dcloud.HBuilder/apps/HBuilder/doc/uniapp_temp/compressed/1711372668721_wx_camera_1711339837942.jpg","result":["0","1"]}'
				// ) || secondQuestion || {};
				// this.thirdQuestion = JSON.parse(
				// 		'{"voicePath":"_doc/uniapp_temp_1711376046364/recorder/1711376052413.aac","result":"2"}') ||
				// 	thirdQuestion || {};

				this.firstQuestion = firstQuestion || {};
				this.secondQuestion = secondQuestion || {};
				this.thirdQuestion = thirdQuestion || {};
			},
			// 跳转上下详情页
			gotoDetail(url) {
				uni.navigateTo({
					url: url + '?isDetail=1'
				});
			}
		}
	}
</script>

<style lang="scss">
	.mini-cog-wrap {
		width: 100vw;
		height: 100vh;
		display: flex;
		overflow: hidden;
		flex-direction: column;
		background-image: linear-gradient(#76EEC6, #7FFFD4);

		&.detail-page {
			// height: 100%;
			// width: 100%;
		}

		.content {
			width: 100%;
			flex: 1;
			overflow: auto;
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