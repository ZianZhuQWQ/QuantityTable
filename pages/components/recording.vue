<template>
	<view class="page-wrap">
		<view class="audioShow">
			<view class="play-wrap">
				<play-audio v-if="value && startRecording == 0" :src="value" />
			</view>
			<view class="recordBegin" @tap="startRecord" v-if="startRecording == 0 && !disable">
				<view class="text">
					录音
				</view>
			</view>
			<view class="timecountShow" v-if="startRecording == 1">
				{{ timecount }}
			</view>
			<view class="recordingShow" v-if="startRecording == 1">
				<view class="cancelBtn" @tap="endRecord">
					<image src="../static/cancel.png"></image><br>
					<text>取消</text>
				</view>
				<image v-if="isZant == false" src="../static/recording.png" @tap="endRecordPic"></image>
				<image v-else src="../static/zant.png" @tap="startRecordPic"></image>
				<view class="saveBtn" @tap="saveRecord">
					<image src="../static/save.png"></image><br>
					<text>保存</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import luchAudio from '@/components/luch-audio/luch-audio.vue';
	import playAudio from '@/components/play-audio.vue';
	import navbar from '@/components/nav-bar.vue';

	export default {
		components: {
			luchAudio,
			playAudio,
		},
		props: {
			value: '',
			tips: '',
			disable: false
		},
		data() {
			return {
				safeAreaInsets: null,
				audioPlayNew: false,
				content: '',
				checkList: [],
				audioContent: '',
				audioName: '',
				recorderManager: {},
				innerAudioContext: {},
				startRecording: 0,
				timecount: '00:00:00',
				hour: 0,
				minute: 0,
				second: 0,
				timer: '',
				isZant: false,
				audioDuration: '',
			}
		},
		created() {
			console.log('执行了么')
			this.recorderManager = uni.getRecorderManager();
			this.innerAudioContext = uni.createInnerAudioContext();
			// 为了防止苹果手机静音无法播放
			uni.setInnerAudioOption && uni.setInnerAudioOption({
				obeyMuteSwitch: false
			})
			this.innerAudioContext.autoplay = true;
			let self = this;
			this.recorderManager.onStop(function(res) {
				self.audioDuration = res.duration;
			});
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
			// 音频删除
			audioDelete(obj) {
				if (obj == true) { // 删除
					uni.showModal({
						content: '是否确认删除当前音频？',
						success: ({
							cancel,
							confirm
						}) => {
							if (confirm) {
								this.audioContent = '';
							}
						}
					})
				}
			},
			// 点击开始录音就开始计时
			startRecord() {
				this.startRecording = 1;
				console.log('开始录音');
				this.timecount = '00:00:00';
				this.hour = 0;
				this.minute = 0;
				this.second = 0;
				this.getTimeInterval();
				const options = {
					duration: 600000,
					sampleRate: 44100,
					numberOfChannels: 1,
					encodeBitRate: 192000,
					format: 'aac',
					frameSize: 50
				}
				this.recorderManager.start(options);
				this.isZant = false;
			},
			// 计时器
			getTimeInterval() {
				clearInterval(this.timer);
				this.timer = setInterval(() => {
					this.second += 1;
					if (this.second >= 60) {
						this.minute += 1;
						this.second = 0;
					}
					if (this.minute >= 60 && this.second >= 60) {
						this.minute += 0;
						this.hour += 1;
					}
					this.timecount = this.showNum(this.hour) + ":" + this.showNum(this.minute) + ":" + this
						.showNum(this.second);
					console.log("this.timecount", this.timecount)
				}, 1000);
			},
			showNum(num) {
				if (num < 10) {
					return '0' + num
				}
				return num
			},
			// 取消录音
			endRecord() {
				console.log('录音结束');
				this.recorderManager.onStop(function(res) {
					that.$emit('onChange', this.value)
				});
				this.recorderManager.stop();
				clearInterval(this.timer);
				this.startRecording = 0;
				this.timecount = '00:00:00';
				this.hour = 0;
				this.minute = 0;
				this.second = 0;
			},
			// 中间图片点击的暂停  点击暂停时同时关闭定时任务
			endRecordPic() {
				console.log('录音暂停');
				this.recorderManager.pause();
				clearInterval(this.timer);
				this.isZant = !this.isZant;
			},
			// 中间图片点击开始 
			startRecordPic() {
				console.log('重新开始录音');
				this.recorderManager.resume();
				this.getTimeInterval();
				this.isZant = !this.isZant;
			},
			// 保存（暂停定时加上传）
			saveRecord() {
				let that = this;
				this.recorderManager.onStop(function(res) {
					that.$emit('onChange', res.tempFilePath)
				});
				this.recorderManager.stop()
				this.isZant = true;
				clearInterval(this.timer);
				this.audioContent == '';
				setTimeout(() => {
					this.audioAdd();
				}, 300);
			},
			playVoice() {
				console.log('播放录音');
				if (this.value) {
					this.innerAudioContext.src = this.value;
					this.innerAudioContext.play();
				}
			},
			// 上传录音文件
			audioAdd() {
				uni.showToast({
					title: '222'
				});
				console.log("上传录音文件 this.value", this.value)
				uni.showLoading({
					title: '保存中...'
				});
				if (this.value) {
					// uni.uploadFile({
					// 	url: 'http://47.113.91.80:8002/file_upload1', //仅为示例，非真实的接口地址
					// 	filePath: this.value,
					// 	name: 'img',

					// 	formData: { //这里是上传图片时一起上传的数据
					// 		// user: data.user,
					// 		patient_id: 1,
					// 	},

					// 	success: (res) => {
					// 		uni.hideLoading();
					// 		JSON.parse(res.data) && uni.showToast({
					// 			title: '保存成功！',
					// 			icon: 'success'
					// 		});
					// 		this.audioContent = JSON.parse(res.data).result?.visiturl;
					// 		this.startRecording = 0;
					// 	},
					// 	fail: (err) => {
					// 		console.log('audioContent', err, this.audioContent, this.startRecording, this
					// 			.audioDuration);
					// 		uni.hideLoading();
					// 	}
					// });
					// 改成传给父级保存
					this.$emit('onChange', this.value)
					uni.showToast({
						title: '保存成功！',
						icon: 'success'
					});
					uni.hideLoading();
					console.log('录音结束');
					this.recorderManager.stop();
					clearInterval(this.timer);
					this.startRecording = 0;
					this.timecount = '00:00:00';
					this.hour = 0;
					this.minute = 0;
					this.second = 0;
				} else {
					uni.showToast({
						title: '录音失败！',
						icon: 'error'
					});
					uni.hideLoading();
				}
			},
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
		display: flex;
		flex-direction: column;
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