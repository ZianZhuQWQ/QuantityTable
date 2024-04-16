<template>
	<view class="form-item">
		<view class="label">{{ item.label }}</view>

		<!-- 可编辑态 -->
		<view class="value-wrap" v-if="!disable || showText">
			<!-- 上传图片 -->
			<view class="img-wrap">
				<upload-video v-if="item.type == 'img'" :value="currentValue" @onChange="onChange" :disable="disable" />
				<!-- 删除按钮 -->
				<view v-if="item.type == 'img' && !!currentValue && !disable" class='deleteBtn' @click='onChange()'>
					删除重新拍摄
				</view>
			</view>
			<!-- 单选框 -->
			<radio-group v-if="item.type == 'radio'" @change="onChange">
				<view class="radio-items-wrap" :class="item.options.length > 3 && 'column'">
					<template v-for="option in item.options">
						<label :key="option.value">
							<radio :value="option.value" :checked="getChecked(option.value)" :disabled="disable" />
							<text class="text">{{ option.label }}</text>
						</label>
					</template>
				</view>
			</radio-group>
			<!-- 复选框多选 -->
			<checkbox-group v-if="item.type == 'checkbox'" @change="onChange">
				<view class="checkbox-items-wrap" :class="item.options.length > 3 && 'column'">
					<template v-for="option in item.options">
						<label :key="option.value" class="radio-item-wrap">
							<checkbox :value="option.value" :checked="getChecked(option.value)" :disabled="disable" />
							<text class="text">{{ option.label }}</text>
						</label>
					</template>
				</view>
			</checkbox-group>
			<!-- 数字输入框 -->
			<input v-else-if="item.type == 'number'" type="number" :placeholder="'请输入' + item.label" :disabled="disable"
				v-model="currentValue" />
			<!-- 输入框 -->
			<input v-else-if="item.type == 'input'" :placeholder="'请输入' + item.label" :disabled="disable"
				v-model="currentValue" />
		</view>

		<!-- 仅展示状态 -->
		<view class="value-wrap" v-else>
			{{ showValue }}
		</view>
	</view>
</template>

<script>
	import uploadVideo from '@/components/upload-video.vue';

	export default {
		name: 'formItemRender',
		components: {
			uploadVideo
		},
		props: {
			item: {
				type: Object,
				require: true,
			},
			value: {
				require: false,
			},
			disable: {
				type: Boolean,
				require: false,
			},
			showText: {
				type: Boolean,
				require: false,
			},
		},
		data() {
			return {
				currentValue: this.value,
				showValue: '',
			}
		},
		watch: {
			value: {
				deep: true,
				handler(newValue, oldValue) {
					this.currentValue = newValue
				}
			},
			currentValue: {
				deep: true,
				handler(newValue, oldValue) {
					this.$emit('onChange', {
						key: this.item.key,
						value: newValue
					})
				}
			},
		},
		mounted() {
			this.getShowDetail()
		},
		methods: {
			// 单选框和多选框不能双向绑定只能这个
			onChange(e) {
				if (this.item.type == 'img') {
					this.$emit('onChange', {
						key: this.item.key,
						value: e
					})
				} else
					this.$emit('onChange', {
						key: this.item.key,
						value: e.detail.value
					})
			},
			// Checked选项是否选中
			getChecked(value) {
				return this.item.type == 'checkbox' ? this.currentValue?.includes(value) || this.currentValue?.includes(
					value.toString()) : this.currentValue == value || this.currentValue == value.toString()
			},
			// 获取展示数据
			getShowDetail() {
				switch (this.item.type) {
					case 'radio':
						this.showValue = this.item.options?.find((item) => item.value == this.value)?.label
						break;
					case 'checkbox':
						this.showValue = this.item.options?.filter((item) => item.value == this.value).map((item) => item
								.label)
							.join(',')
						break;
					case 'number':
					case 'input':
						this.showValue = this.value
						break;
					default:
						break;
				}
			}
		}

	}
</script>

<style lang="scss">
	.form-item {
		font-size: 13px;
		font-weight: 400;
		margin-bottom: 32px;

		.label {
			font-size: 14px;
			color: #666666;
			margin-bottom: 8px;
		}

		.value-wrap {
			color: #000000;
			
			.img-wrap {
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				// 图片删除按钮
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
			}

			// 输入框
			.input-placeholder {
				color: #cccccc;
			}

			// 单选的选项封装
			.radio-items-wrap,
			.checkbox-items-wrap {
				&.column {
					// 超过三个选项换行
					display: flex;
					flex-direction: column;

					label {
						width: 100%;

						&:nth-child(n) {
							margin-bottom: 8px;
						}
					}
				}

				label {
					min-width: 27%;
					width: max-content;
					display: inline-block;

					&:nth-child(n) {
						margin-right: 16px;
					}
				}

				.text {
					font-size: 13px;
				}
			}
		}
	}
</style>