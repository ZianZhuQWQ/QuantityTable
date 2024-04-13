<template>
	<view class='page-wrap'>
		<view class="content">
			<!-- 题目 -->
			<view class="tips">
				<text>{{ tips }}</text>
			</view>

			<!-- 视频 -->
			<upload-video :value="value" @onChange="onChange" />

			<!-- 删除按钮 -->
			<view v-if="videoPath" class='delete' @click='handleDelete'>
				删除重新拍摄
			</view>
		</view>
	</view>
</template>

<script>
	import uploadVideo from '@/components/upload-video.vue';

	export default {
		components: {
			uploadVideo
		},
		props: {
			value: {
				type: String,
				required: false
			},
		},
		data() {
			return {
				quantityTableType: "Mini-Cog",
				tips: "画出钟表表盘：\n徒手画出11:10或8:20",
				safeAreaInsets: null,
				quantityTable: "HIS量表",
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
			onChange(data) {
				this.videoPath = data;
				this.$emit('onChange', data)
			},
			//* 删除已经选择的图片 *//
			handleDelete() {
				this.videoPath = '';
			},
		},
	}
</script>

<style lang="less">
	.page-wrap {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		padding: 16rpx;
		overflow-y: auto;

		.content {
			box-sizing: border-box;
			width: 100%;
			height: 90%;
			background-color: #FFFFFF;
			border-radius: 16rpx;
			padding: 30rpx;
			display: flex;
			align-items: center;
			flex-direction: column;
			overflow-x: hidden;

			.tips {
				width: 100%;
				font-weight: bold;
				font-size: 45rpx;
				text-align: center;
				justify-content: center;
				align-items: center;
				display: flex;
				box-sizing: border-box;
				padding: 8rpx;
				width: 100%;
				height: 300rpx;
				background-color: #e7eaec;
				border-radius: 8px;
			}

			.delete {
				font-size: 16px;
				width: calc(100% - 68px);
				height: 32px;
				border-radius: 4px;
				color: #ffffff;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: rgba(255, 0, 0, 0.5);
			}
		}
	}
</style>