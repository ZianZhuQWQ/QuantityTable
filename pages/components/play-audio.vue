<template>
	<view class="wrap">
		<view class="audio-con">
			<view class="audio-time">{{ audioTimeUpdate }}</view>
		</view>
		<view class="play-btn" @click="handleBtnClick">
			{{ videoIsPlay ? '暂停' : '播放' }}
		</view>
	</view>
</template>

<script>
/**
 * luch-audio
 * @module luch-audio
 * @Author lu-ch
 * @Date 2022-07-14
 * @Email webwork.s@qq.com
 * @description 音频播放组件，使用了createInnerAudioContext
 */
/**
 * Props itemsProps
 * @prop {Boolean} play - 是否播放，双向绑定，绑定时需使用.sync 如果为true 则播放，为false 则暂停
 * ... 其他api同文档 （https://uniapp.dcloud.io/api/media/audio-context?id=createinneraudiocontext）
 */
/**
 * 将秒转换为 分:秒
 * @param {Number} s - 秒数
 */
function sToHs(s) {
	//计算分钟
	//算法：将秒数除以60，然后下舍入，既得到分钟数
	let h;
	h = Math.floor(s / 60);
	//计算秒
	//算法：取得秒%60的余数，既得到秒数
	s = s % 60;
	//将变量转换为字符串
	h += '';
	s += '';
	//如果只有一位数，前面增加一个0
	h = h.length === 1 ? '0' + h : h;
	s = s.length === 1 ? '0' + s : s;
	return h + ':' + s;
}
export default {
	name: 'ComAudio',
	props: {
		// 是否播放或暂停
		play: {
			type: Boolean,
			default: false
		},
		// 播放src
		src: {
			type: String
		},
		name: {
			type: String,
			default: '未知音频'
		},
		author: {
			type: String,
			default: '未知作者'
		},
		autoplay: {
			type: Boolean
			// default: false
		},
		loop: {
			type: Boolean
			// default: false
		},
		// #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-LARK || MP-JD || MP-KUAISHOU
		obeyMuteSwitch: {
			type: Boolean
			// default: true
		},
		// #endif
		// 初始化回调
		initAudio: {
			type: Function
		},
		// 自定义组件标识
		index: {
			type: [String, Number]
		}
	},
	data() {
		return {
			audioTimeUpdate: '00:00',
			videoIsPlay: false
			// innerAudioContext: ''
		};
	},
	watch: {
		play(n) {
			// this.videoIsPlay = play
			if (n) {
				!this.videoIsPlay && this.audioPlay();
			} else {
				this.videoIsPlay && this.audioPause();
			}
		},
		src() {
			this.audioDestroy();
			this.contextInit();
		}
	},
	created() {
		this.contextInit();
	},
	beforeDestroy() {
		this.audioDestroy();
	},
	methods: {
		audioPlay() {
			this.innerAudioContext && this.innerAudioContext.play();
		},
		audioPause() {
			this.innerAudioContext && this.innerAudioContext.pause();
		},
		audioOnPlay() {
			this.videoIsPlay = true;
			this.$emit('update:play', true);
		},
		audioOnPause() {
			this.videoIsPlay = false;
			this.$emit('update:play', false);
		},
		audioDestroy() {
			this.innerAudioContext && this.innerAudioContext.destroy && this.innerAudioContext.destroy();
			this.audioPropInit();
		},
		audioControls() {
			if (this.videoIsPlay) {
				this.audioPause();
			} else {
				this.audioPlay();
			}
		},
		handleBtnClick() {
			// this.videoIsPlay = !this.videoIsPlay
			this.audioControls();
			this.$emit('update:play', this.videoIsPlay);
		},
		contextInit() {
			let that = this;
			that.$emit('update:play', false);
			if (!that.src) {
				if (process.env.NODE_ENV !== 'production') {
					console.warn(`[luch-audio warn]: 'src' 为空`);
				}
				return;
			}
			let innerAudioContext = uni.createInnerAudioContext();
			innerAudioContext.autoplay = that.autoplay;
			innerAudioContext.loop = that.loop;
			// #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-LARK || MP-JD || MP-KUAISHOU
			if (typeof that.obeyMuteSwitch === 'boolean') {
				innerAudioContext.obeyMuteSwitch = that.obeyMuteSwitch;
			}
			// #endif
			innerAudioContext.onPlay((...arg) => {
				that.audioTimeUpdate = sToHs(Math.floor(innerAudioContext.currentTime));
				that.audioOnPlay();
				that.$emit('onPlay', ...arg);
			});
			innerAudioContext.onPause((...arg) => {
				that.audioOnPause();
				that.$emit('onPause', ...arg);
			});
			innerAudioContext.onEnded((...arg) => {
				that.audioOnPause();
				that.$emit('onEnded', ...arg);
			});
			innerAudioContext.onTimeUpdate((...arg) => {
				that.audioTimeUpdate = sToHs(Math.floor(innerAudioContext.currentTime));
				that.$emit('onTimeUpdate', ...arg);
			});
			innerAudioContext.onError((...arg) => {
				that.$emit('onError', ...arg);
			});
			innerAudioContext.src = that.src;
			if (that.initAudio) {
				that.initAudio(innerAudioContext, { src: that.src, index: that.index });
			}
			this.innerAudioContext = innerAudioContext;
		},
		audioPropInit() {
			this.audioTimeUpdate = '00:00';
			this.videoIsPlay = false;
		}
	}
};
</script>

<style lang="scss" scoped>
	.wrap {
		display: flex;
		overflow: hidden;
		height: 67px;
		border-radius: 6px;
		.audio-con {
			flex: 1;
			display: flex;
			width: 0;
			padding: 0 15px;
			align-items: center;
			background-color: #fcfcfc;
			.audio-time {
				right: 15px;
				top: 6px;
				font-size: 13px;
				color: #9d9d9d;
			}
		}
		.play-btn {
			flex-shrink: 0;
			width: 65px;
			height: 100%;
			background-color: #7fffd4;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #fff;
		}
	}
</style>
