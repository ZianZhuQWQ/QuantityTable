<template>
	<view class="page-wrap">
		<navbar :pageTitle="pageTitle" :showGoback="true" />

		<form class="evaluate-form-wrap" @submit="formSubmit" @reset="formReset">
			<view class="content-wrap">
				<view class="title">基本信息</view>
				<template v-for="item in items">
					<form-item-render :key="item.key" :item="item" :formData="JSON.stringify(formData)"
						@onChange="itemOnChange" />
				</template>
			</view>

			<!-- 按钮区域 -->
			<view class="foot">
				<button class="default" form-type="reset">重置</button>
				<button form-type="submit">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	import navbar from '@/components/nav-bar.vue';
	import formItemRender from '@/components/form-item-render.vue'

	export default {
		name: 'evaluateForm',
		components: {
			navbar,
			formItemRender,
		},
		data() {
			return {
				safeAreaInsets: null,
				pageTitle: "缺血指数量表(HIS)",
				items: [
					{
						label: '1、急性起病',
						key: 'acute_onset',
						type: 'radio',
						options: [{
							label: '是',
							value: '1',
						}, {
							label: '否',
							value: '0',
						}]
					},
					{
						label: '2、阶梯式恶化',
						key: 'step_deterioration',
						type: 'radio',
						options: [{
							label: '是',
							value: '1',
						}, {
							label: '否',
							value: '0',
						}]
					},
					{
						label: '3、波动性病程',
						key: 'fluctuating_course',
						type: 'radio',
						options: [{
							label: '是',
							value: '1',
						}, {
							label: '否',
							value: '0',
						}]
					},
					{
						label: '4、夜间意识模糊',
						key: 'unconcisous',
						type: 'radio',
						options: [{
							label: '是',
							value: '1',
						}, {
							label: '否',
							value: '0',
						}]
					},
					{
						label: '5、人格相对保持完整',
						key: 'integrate_personalities',
						type: 'radio',
						options: [{
							label: '是',
							value: '1',
						}, {
							label: '否',
							value: '0',
						}]
					},
					{
						label: '6、情绪低落',
						key: 'depression',
						type: 'radio',
						options: [{
							label: '是',
							value: '1',
						}, {
							label: '否',
							value: '0',
						}]
					},
					{
						label: '7、身体诉述',
						key: 'body_state',
						type: 'radio',
						options: [{
							label: '是',
							value: '1',
						}, {
							label: '否',
							value: '0',
						}]
					},
					{
						label: '8、情感失禁',
						key: 'affective_incontinence',
						type: 'radio',
						options: [{
							label: '是',
							value: '1',
						}, {
							label: '否',
							value: '0',
						}]
					},
					{
						label: '9、有高血压或高血压史 ',
						key: 'hypertension',
						type: 'radio',
						options: [{
							label: '是',
							value: '1',
						}, {
							label: '否',
							value: '0',
						}]
					},
					{
						label: '10、中风史',
						key: 'stroke',
						type: 'radio',
						options: [{
							label: '是',
							value: '1',
						}, {
							label: '否',
							value: '0',
						}]
					},
					{
						label: '11、动脉硬化',
						key: 'arteriosclerotic',
						type: 'radio',
						options: [{
							label: '是',
							value: '1',
						}, {
							label: '否',
							value: '0',
						}]
					},
					{
						label: '12、局灶神经系统症状',
						key: 'neurological_symptoms',
						type: 'radio',
						options: [{
							label: '是',
							value: '1',
						}, {
							label: '否',
							value: '0',
						}]
					},
					{
						label: '13、局灶神经系体征',
						key: 'neurological_signs',
						type: 'radio',
						options: [{
							label: '是',
							value: '1',
						}, {
							label: '否',
							value: '0',
						}]
					},
					
				],
				formData: {
					acute_onset: '',
					step_deterioration: '',
					fluctuating_course: '',
					unconcisous: '',
					integrate_personalities: '',
					depression: '',
					body_state: '',
					affective_incontinence: '',
					hypertension: '',
					stroke: '',
					arteriosclerotic: '',
					neurological_symptoms: '',
					neurological_signs: '',
					
				},
			}
		},
		mounted() {
			this.getSafeAreaInsets()
		},
		computed: {
			inputDisabled() {
				return this.radioValue === '是';
			},
		},
		methods: {
			getSafeAreaInsets() {
				// 获取屏幕边界到安全区域距离
				const systemInfo = uni.getSystemInfoSync()
				this.safeAreaInsets = systemInfo.safeAreaInsets
			},
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				uni.showModal({
					content: '表单数据内容：' + JSON.stringify(this.formData),
					showCancel: false
				});
			},
			formReset: function(e) {
				console.log('清空数据')
				Object.keys(this.formData).forEach(key => {
					this.$set(this.formData, key, undefined)
				})
			},
			// 监听item变化
			itemOnChange(item) {
				this.$set(this.formData, item.key, item.value)
			},
		}
	}
</script>

<style lang="scss">
	.page-wrap {
		height: 100vh;
		width: 100vw;
		display: flex;
		flex-direction: column;
		overflow: hidden;

		.evaluate-form-wrap {
			box-sizing: border-box;
			flex: 1;
			display: flex;
			flex-direction: column;
			overflow: auto;

			// 内容区域
			.content-wrap {
				flex: 1;
				padding: 8px 12px;

				// 大标题
				.title {
					font-size: 16px;
					font-weight: 600;
					margin-bottom: 12px;
				}

			}

			// 按钮区域
			.foot {
				border-top: 1px solid #dddddd;
				padding: 8px 12px;
				display: flex;
				justify-content: space-between;
				padding: 8px 0;
				background-color: #ffffff;

				button {
					width: 46%;
					height: 40px;
					background-color: #5cd7aa;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #ffffff;

					&.default {
						background-color: #ffffff;
						color: #000000;
					}
				}
			}
		}
	}
</style>
</style>
