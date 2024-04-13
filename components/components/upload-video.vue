<template>
	<view class='wrap'>
		<!-- 视频 -->
		<view class='video-box' v-if="!!value">
			<video v-if="type == 'video'" class='video' :src='value' :poster='value' />
			<image v-else class='img' :src='value' mode='aspectFit' />
		</view>

		<!-- 添加按钮 -->
		<view class='video-box' @click='addPic' v-else>
			<image class='video' src='../static/add_image.png' />
		</view>
	</view>
</template>

<script>
	export default {
		name: "upload-video",
		props: {
			value: {
				type: String,
				required: false
			},
			type: {
				type: "video" | 'img',
				required: false
			}
		},
		data() {
			return {
				quantityTableType: "Mini-Cog",
				question_content: "画出钟表表盘：\n徒手画出11:10或8:20",
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
			//*选择视频*//
			addPic: async function() {
				let that = this
				if (that.type == 'video') {
					// 选择视频
					uni.chooseVideo({
						sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
						success(res) {
							that.$emit('onChange', res.tempFilePath)
						},
						fail(err) {
							console.log('err', err)
						}
					})
				} else uni.chooseImage({
					count: 1, // 最多可以选择的图片张数，默认9
					sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
					sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
					success: function(res) {
						that.$emit('onChange', res.tempFilePaths?.[0])
					}
				})
			},
		},
	}
</script>

<style lang="less">
	.wrap {
		width: 90vw;
		height: 90vw;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-evenly;

		.video-box {
			width: calc(100% - 68px);
			height: calc(100% - 68px);
			margin: 12px 0;
			display: flex;
			flex-direction: column;

			.video, .img {
				width: 100%;
				height: 100%;
			}


		}
	}
</style>