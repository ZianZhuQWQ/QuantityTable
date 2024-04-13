<template>
	<view class="page-wrap">
		<view class="content">
			<view class="tips">
				<text>{{ tips }}</text>
			</view>

			<recording style="width: 100%; flex: 1" @onChange="onChange" :value="voicePath" :disable="isDetail" />

			<view class="result" v-if="voicePath">
				<view class="label">
					答对个数：
				</view>
				<radio-group class="value-wrap" @change="resultChange">
					<template v-for="option in resultItems">
						<label :key="option.value" class="item-wrpa">
							<radio :value="option.value" :disabled="isDetail" :checked="result == option.value" />
							{{ option.label }}
						</label>
					</template>
				</radio-group>
			</view>

			<view class="score" v-if="isDetail || true">
				总得分：{{ result }}
			</view>
		</view>
	</view>
</template>

<script>
	import navbar from '@/components/nav-bar.vue';
	import recording from '@/components/recording.vue';
	import formItemRender from '@/components/form-item-render.vue'


	export default {
		components: {
			navbar,
			recording,
		},
		props: {
			value: Object,
			isDetail: false
		},
		watch: {
			value: {
				deep: true,
				handler(newValue, oldValue) {
					this.voicePath = newValue.voicePath;
					this.result = newValue.result;
				}
			},
		},
		data() {
			return {
				result: this.value.result || 0, // 分数
				voicePath: this.value.voicePath || '',
				tips: '重复说出以上三个词',
				resultItems: [{
						label: '0个',
						value: '0'
					},
					{
						label: '1个',
						value: '1'
					},
					{
						label: '2个',
						value: '2'
					},
					{
						label: '3个',
						value: '3'
					},
				]
			}
		},
		methods: {
			onChange(data) {
				this.$emit('onChange', {
					...this.value,
					voicePath: data
				})
			},
			// 结果变化
			resultChange(e) {
				this.$emit('onChange', {
					...this.value,
					result: e.detail.value
				})
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
	}

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
	}

	.tips {
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

	.result {
		margin-top: 8px;
		width: 100%;

		.label {
			color: #999;
		}

		.value-wrap {
			display: flex;
			align-items: center;
			margin-top: 8px;

			.item-wrpa {
				display: flex;
				align-items: center;
				width: 25%;
			}
		}
	}

	.score {
		margin-top: 24px;
		width: 100%;
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