<template>
	<view class="form-item">
		<view class="label">{{ item.label }}</view>
		<view class="value-wrap">
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
	export default {
		name: 'formItemRender',
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
				// this.value = e.detail.value
				this.$set(this.value, this.item.key, e.detail.value)
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