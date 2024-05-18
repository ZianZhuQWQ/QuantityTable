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
				总得分：{{ score_sum }}
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
				isDetail: false,
				score_sum: 0,


				current: 1,
				firstQuestion: {
					voicePath: '',
				},
				secondQuestion: {
					videoPath: '',
					// result: []
				},
				otherData: {
					patient_id: '',
					patient_name: '',
				},
				thirdQuestion: {
					voicePath: '',
					// result: []
				},

			}
		},
		mounted() {
			this.getData();
		},
		watch: {
			isDetail: {
				deep: true,
				handler(newValue, oldValue) {
					if (!!newValue) this.getDetailData();
				}
			}
		},
		onLoad: function(option) { // option为object类型，会序列化上个页面传递的参数
			this.isDetail = !!Number(option.isDetail);
			console.log('this.isDetail', this.isDetail)
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
						// if (!this.secondQuestion.result || this.secondQuestion.result.length === 0) {
						this.current = 2;
						uni.showToast({
							title: '请上传图片后，并选择结果',
							icon: 'none'
						})
					} else if (!Object.keys(this.thirdQuestion).includes('result')) {
						// } else if (!this.thirdQuestion.result || this.thirdQuestion.result.length === 0) {

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


						console.log('this.firstQuestion', this.firstQuestion)
						console.log('this.secondQuestion', this.secondQuestion)
						console.log('this.secondQuestion.result[0]', this.secondQuestion.result[0])
						console.log('this.secondQuestion.videoPath', this.secondQuestion.videoPath)
						console.log('this.thirdQuestionresult[0]', this.thirdQuestion.result[0])

						console.log('this.otherData', this.otherData)


						let scoreSum = 0;
						// this.items.forEach(item => {
							
						// 	scoreSum += Number(this.formData[item.key]) || 0;
						// 	console.log('this.formData[item.key]',this.formData[item.key])
						// 	console.log('scoreSum',scoreSum)
						// })
						scoreSum=Number(this.secondQuestion.result[0])+Number(this.thirdQuestion.result[0])
						this.score = scoreSum
						console.log('ssssssssssssssssss', this.score)
						
						// let createdDateTime = new Date().toISOString(); // 获取当前时间并转换为ISO 8601格式
						// var date = new Date();

						// var year = date.getUTCFullYear();
						// var month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
						// var day = date.getUTCDate().toString().padStart(2, "0");
						// var hours = date.getUTCHours().toString().padStart(2, "0");
						// var minutes = date.getUTCMinutes().toString().padStart(2, "0");
						// var seconds = date.getUTCSeconds().toString().padStart(2, "0");

						// var formattedDateTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes +
						// 	":" + seconds;

						// console.log("Formatted Date and Time: " + formattedDateTime);

						// const date = new Date(); // 获取当前日期和时间
						// const formattedDate =
						// 	`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}-${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;

						uni.uploadFile({
							url: 'https://alzheimerdisease.yueyutek.com:8002/quest/uploadQuest2',
							filePath: this.secondQuestion.videoPath,
							name: 'img',
							method: 'POST',
							formData: {
								patient_id: this.otherData.patient_id,
								patient_name: this.otherData.patient_name,

								score2: this.secondQuestion.result[0],
								score3: this.thirdQuestion.result[0],
								nurse: store.state.nurse,
								score_sum: scoreSum,
								created_at: store.state.created_at
							},
							timeout: 6000,
							header: {},
							success: (res) => {

								// 标记已完成
								store.commit('markCompleted', 'mini-cog')
								// 注入仓库
								store.commit('setMiniCogData', {
									...this.formData
								})
								uni.hideLoading()
								uni.showToast({
									title: "提交成功",
									icon: 'success'
								})
								uni.navigateTo({
									url: `/pages/test-page-nav/test-page-nav?userName=${this.otherData?.patient_name}&userId=${this.otherData?.patient_id}`
								});
							},
							fail(err) {
								uni.hideLoading()
								uni.showToast({
									title: "操作失败，请重试!" + (!!err.errMsg && '\n' + err.errMsg),
									icon: 'none'
								})
							}
						});


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
					url: url + '?isDetail=1' + `&userInfo=${JSON.stringify({
									userId: this.otherData?.patient_id,
									userName: this.otherData?.patient_name,
								})}`
				});
			},
			getDetailData() {
				let that = this
				console.log('ddddddddddddd', that.otherData)
				uni.showLoading({
					title: '正在获取数据...'
				})

				// 获取详情数据
				uni.request({
					url: 'https://alzheimerdisease.yueyutek.com:8002/quest/getQuest2',
					method: 'POST',
					data: {

						patient_id: that.otherData.patient_id,
						created_at: store.state.result_created_at

					},
					timeout: 6000,
					header: {},
					success: (res) => {
						if (res.data) {
							console.log('res', res)
							console.log('res.data', res.data)
							this.score_sum = res.data.data[0].score_sum
							console.log('this.score_sum', this.score_sum)


							const baseUrl = 'https://alzheimerdisease.yueyutek.com:8002/';

							// // const filePath = res.data.data[0].img1
							// // const fileUrl = baseUrl + filePath.replace(/^\.\//, '');
							// // this.secondQuestion.vedioPath = fileUrl
							// // console.log(this.secondQuestion.vedioPath);

							// this.$set(this.secondQuestion, 'vedioPath', baseUrl + res.data.data[0].img1
							// 	.replace(/^\.\//, ''))
							// console.log('console.log(this.secondQuestion.vedioPath);', this.secondQuestion
							// 	.vedioPath);



							this.$set(this.thirdQuestion, 'result', res.data.data[0].score3)
							// store.commit('setMiniCogScore2', score2)

							// this.secondQuestion = {
							// 	result: res.data.data[0].score2,
							// 	vedioPath: baseUrl+res.data.data[0].img1.replace(/^\.\//, ''),
							// }

							this.$set(this.secondQuestion, 'result', res.data.data[0].score2)
							this.$set(this.secondQuestion, 'videoPath', baseUrl + res.data.data[0].img1
								.replace(/^\.\//, ''))

							console.log('this.secondQuestion', this.secondQuestion)
							console.log('this.secondQuestion.result', this.secondQuestion.result)
							console.log('this.secondQuestion.videoPath', this.secondQuestion.videoPath)

							// this.secondQuestion.result[0]=res.data.data[0].score2
							// // this.formData = res.data.data[0]




						}
						uni.hideLoading()
					},
					fail(err) {
						uni.hideLoading()
						uni.showToast({
							title: "操作失败，请重试!" + (!!err.errMsg && '\n' + err.errMsg),
							icon: 'none'
						})
					}
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