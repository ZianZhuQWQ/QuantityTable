<template>
	<view class="mini-cog-wrap">
		<navbar :pageTitle="'MINI-COG量表 ' + current + '/3'" :showGoback="true" />

		<view class="content">
			<!-- 第一题录音 -->
			<recordingOne v-if="current == 1" @onChange="handleSaveRecording" :value="recordingVoicePath1" />
			<!-- 第二题画图 -->
			<uploadVideo v-else-if="current == 2" @onChange="handleSaveVideo" :value="videoPath" />
			<!-- 第三题 -->
			<recordingThree v-else="current == 3" @onChange="handleSaveRecording" :value="recordingVoicePath2" />
		</view>

		<!-- 按钮区域 -->
		<view class="foot">
			<button class="btn" @click="switchPage('down')" v-if="current != 1">上一题</button>
			<button class="btn" @click="switchPage('cancel')" v-else>取消测试</button>
			<button class="btn" @click="switchPage('up')" v-if="current != 3">下一题</button>
			<button class="btn" @click="switchPage('submit')" v-else>提交</button </view>
		</view>
	</view>
</template>

<script>
	import navbar from '@/components/nav-bar.vue';
	import recording from '../components/recording.vue';
	import recordingOne from './one.vue';
	import uploadVideo from './two.vue';
	import recordingThree from './three.vue';

	export default {
		components: {
			navbar,
			recording,
			uploadVideo,
			recordingOne,
			recordingThree
		},
		data() {
			return {
				current: 1,
				recordingVoicePath1: '',
				recordingVoicePath2: '',
				videoPath: '',
			}
		},
		methods: {
			// 切换页面
			switchPage(type) {
				if (type == 'up') this.current += 1;
				else if (type == 'down') this.current -= 1;
				else if (type == 'submit') {
					console.log('提交============================================');
					console.log('第一题:', this.recordingVoicePath1)
					console.log('第二题:', this.videoPath)
					console.log('第三题', this.recordingVoicePath2)
					console.log('============================================');
					// 接口上传 TODO
				} else uni.navigateBack().catch(() => {
					uni.switchTab({
						url: '/pages/home/home'
					})
				});
			},
			// 上传视频发生变化
			handleSaveVideo(data) {
				this.videoPath = data;
			},
			// 录音文件发生变化
			handleSaveRecording(data) {
				if (this.current == 3)
					this.recordingVoicePath2 = data;
				else this.recordingVoicePath1 = data;
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