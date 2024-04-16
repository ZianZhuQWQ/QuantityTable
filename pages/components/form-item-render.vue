<template>
	<view class="form-item">
		<view class="label">{{ item.label }}</view>
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
				<view class="radio-items-wrap">
					<template v-for="option in item.options">
						<label :key="option.value">
							<radio :value="option.value" :checked="getChecked(option.value)" />
							<text class="text">{{ option.label }}</text>
						</label>
					</template>
				</view>
				<input class="detail" v-if="getShowDetailInput()" :placeholder="'请输入' + item.detail.label"
					v-model="detailValue" />
			</radio-group>
			<!-- 复选框多选 -->
			<checkbox-group v-if="item.type == 'checkbox'" @change="onChange">
				<view class="checkbox-items-wrap">
					<template v-for="option in item.options">
						<label :key="option.value" class="radio-item-wrap">
							<checkbox :value="option.value" :checked="getChecked(option.value)" />
							<text class="text">{{ option.label }}</text>
						</label>
					</template>
				</view>
				<input class="detail" v-if="getShowDetailInput()" :placeholder="'请输入' + item.detail.label"
					v-model="detailValue" />
			</checkbox-group>
			<!-- 数字输入框 -->
			<input v-else-if="item.type == 'number'" type="number" :placeholder="'请输入' + item.label"
				v-model="value[item.key]" />
			<!-- 输入框 -->
			<input v-else-if="item.type == 'input'" :placeholder="'请输入' + item.label" v-model="value[item.key]" />
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
			value: { // 这里的value是整个表单的formData
				type: Object,
				require: false,
			}
		},
		data() {
			return {
				detailValue: this.item.detail?.key ? this.value[this.item.detail.key] : undefined
			}
		},
		watch: {
			value: {
				deep: true,
				handler(newValue, oldValue) {
					this.$emit('onChange', {
						key: this.item.key,
						value: newValue[this.item.key]
					})
				}
			},
			detailValue: {
				deep: true,
				handler(newValue, oldValue) {
					this.$emit('onChange', {
						key: this.item.detail.key,
						value: newValue
					})
				}
			}
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
				return this.item.type == 'checkbox' ? this.value[this.item.key]?.includes(value) : this.value[this.item
					.key] == value
			},
			// 是否显示附加详情
			getShowDetailInput() {
				if (this.item.type == 'checkbox')
					return this.item.detail && this.value[this.item.key]?.includes(this.item.detail.showValue)
				else return this.item.detail && this.value[this.item.key] == this.item.detail.showValue
			}
		}

	}
</script>

<style lang="scss">
	.form-item {
		font-size: 13px;
		font-weight: 400;
		margin-bottom: 24px;

		.label {
			font-size: 14px;
			color: #666666;
			margin-bottom: 4px;
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

			// 单选的选项封装
			.radio-items-wrap {
				label {
					&:nth-child(n) {
						margin-right: 16px;
					}
				}

				.text {
					font-size: 13px;
				}
			}

			// 多选的选项封装
			.checkbox-items-wrap {
				display: flex;
				flex-direction: column;

				label {
					&:nth-child(n) {
						margin-bottom: 8px;
					}
				}
			}

			// 单选和多选的详细说明
			.detail {
				margin-top: 4px;
			}
		}
	}
</style>