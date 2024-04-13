<template>
	<view class='page-wrap'>
		<view class="content">
			<!-- 题目 -->
			<view class="tips">
				<text>{{ tips }}</text>
			</view>

			<!-- 视频 -->
			<upload-video :value="value.videoPath" @onChange="onChange" :disable="isDetail" />

			<!-- 删除按钮 -->
			<view v-if="!!videoPath && !isDetail" class='deleteBtn' @click='handleDelete'>
				删除重新拍摄
			</view>

			<view class="result" v-if="videoPath">
				<view class="label"> 结果
					答对个数：
				</view>
				<checkbox-group class="value-wrap" @change="resultChange">
					<template v-for="option in resultItems">
						<label :key="option.value" class="item-wrpa">
							<checkbox :value="option.value" :disabled="isDetail" :checked="getChecked(option.value)" />
							{{ option.label }}
						</label>
					</template>
				</checkbox-group>
			</view>

			<view class="score" v-if="isDetail">
				总得分：{{ getScore() }}
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
				type: Object,
				required: false
			},
			isDetail: {
				type: Boolean,
				require: false
			}
		},
		watch: {
			value: {
				deep: true,
				handler(newValue, oldValue) {
					this.videoPath = newValue.videoPath;
					this.result = newValue.result;
				}
			},
		},
		data() {
			return {
				result: this.value.result || [], // 分数
				videoPath: this.value.videoPath, // 图片地址
				quantityTableType: "Mini-Cog",
				tips: "画出钟表表盘：\n徒手画出11:10或8:20",
				safeAreaInsets: null,
				quantityTable: "HIS量表",
				resultItems: [{
						label: '画不出',
						value: '0'
					},
					{
						label: '画出闭锁的圆',
						value: '1'
					},
					{
						label: '将数字安置在正确的位置',
						value: '2'
					},
					{
						label: '包括全部12个正确的数字',
						value: '3'
					},
					{
						label: '将指针安置在正确的位置',
						value: '4'
					},
				]
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
				this.$emit('onChange', {
					...this.value,
					videoPath: data
				})
			},
			//* 删除已经选择的图片 *//
			handleDelete() {
				this.$emit('onChange', {
					...this.value,
					videoPath: ''
				})
			},
			// 获取分数
			getScore() {
				return this.result?.filter(value => value != "0").length
			},
			// 结果变化
			resultChange(e) {
				this.result = e.detail.value;
				this.$emit('onChange', {
					...this.value,
					result: e.detail.value
				})
			},
			// 回显结果
			getChecked(value) {
				return this.result?.includes(value)
			}
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

			.deleteBtn {
				font-size: 16px;
				width: calc(100% - 68px);
				height: 32px;
				padding: 4px 0;
				border-radius: 4px;
				color: #ffffff;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: rgba(255, 0, 0, 0.5);
			}

			.result {
				margin-top: 8px;
				width: 100%;

				.label {
					color: #999;
				}

				.value-wrap {
					display: flex;
					flex-direction: column;

					.item-wrpa {
						display: flex;
						align-items: center;
						margin-top: 8px;
					}
				}
			}

			.score {
				margin-top: 24px;
				width: 100%;
			}
		}
	}
</style>