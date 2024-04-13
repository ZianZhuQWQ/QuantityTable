<template>
	<view class="page-wrap" :class="isDetail && 'detail-page'">
		<navbar v-if="!isDetail" :pageTitle="pageTitle" :showGoback="true" />

		<view class="evaluate-form-wrap">
			<view class="content-wrap">
				<view class="title">基本信息</view>
				<view class="item">
					<template v-for="item in items">
						<form-item-render :key="item.key" :item="item" v-model="formData" @onChange="itemOnChange" />
					</template>
				</view>
			</view>

			<!-- 按钮区域 -->
			<view class="foot" v-if="!isDetail">
				<button class="default" form-type="reset" @click="formReset">重置</button>
				<button form-type="submit" @click="formSubmit">提交</button>
			</view>
		</view>
	</view>
</template>

<script>
	import navbar from '@/components/nav-bar.vue';
	import formItemRender from '@/components/form-item-render.vue'
	import store from '@/store/index.js'

	export default {
		name: 'evaluateForm',
		components: {
			navbar,
			formItemRender,
		},
		props: {
			isDetail: {
				type: Boolean,
			}
		},
		data() {
			return {
				safeAreaInsets: null,
				pageTitle: "阿尔兹海默病早期筛查及评估",
				items: [{
						label: '名字',
						key: 'name',
						type: 'input'
					},
					{
						label: '性别',
						key: 'sex',
						type: 'radio',
						options: [{
							label: '男',
							value: '1',
						}, {
							label: '女',
							value: '0',
						}]
					},
					{
						label: '年龄',
						key: 'age',
						type: 'number'
					},
					{
						label: '身高',
						key: 'height',
						type: 'number'
					},
					{
						label: '体重',
						key: 'weight',
						type: 'number'
					},
					{
						label: '出生地',
						key: 'birthplace',
						type: 'input'
					},
					{
						label: '长期居住地',
						key: 'city',
						type: 'radio',
						options: [{
							label: '城市',
							value: 'city',
						}, {
							label: '农村',
							value: 'village',
						}]
					},
					{
						label: '职业',
						key: 'career',
						type: 'checkbox',
						options: [{
							label: '家公务员',
							value: '1',
						}, {
							label: '专业技术人员',
							value: '2',
						}, {
							label: '农、林、牧、渔业人员',
							value: '3',
						}, {
							label: '社会生产和生活服务人员',
							value: '4',
						}, {
							label: '其他不便分类的从业人员',
							value: '5',
						}]
					},
					{
						label: '毒药物接触史',
						key: 'drug',
						type: 'radio',
						options: [{
							label: '是',
							value: '1',
						}, {
							label: '否',
							value: '0',
						}],
						detail: {
							label: '具体毒药物接触史',
							key: 'specificDrug',
							showValue: '1' // 毒药物接触史等于1的时候显示
						}
					},
					{
						label: '长期滥用药物史（如感冒药、止痛药、护胃药等）',
						key: 'drugs',
						type: 'radio',
						options: [{
							label: '是',
							value: '1',
						}, {
							label: '否',
							value: '0',
						}],
						detail: {
							label: '具体',
							key: 'specificDrugs',
							showValue: '1' // 毒药物接触史等于1的时候显示
						}
					},
					{
						label: '吸烟史',
						key: 'smoke',
						type: 'radio',
						options: [{
							label: '是',
							value: '1',
						}, {
							label: '否',
							value: '0',
						}],
						detail: {
							label: '具体',
							key: 'specificSmoke',
							showValue: '1' // 毒药物接触史等于1的时候显示
						}
					},
					{
						label: '饮酒史',
						key: 'alcohol',
						type: 'radio',
						options: [{
							label: '是',
							value: '1',
						}, {
							label: '否',
							value: '0',
						}],
						detail: {
							label: '具体',
							key: 'specificAlcohol',
							showValue: '1' // 毒药物接触史等于1的时候显示
						}
					},
					{
						label: '兴趣爱好',
						key: 'hobby',
						type: 'checkbox',
						options: [{
							label: '游泳',
							value: '1',
						}, {
							label: '羽毛球',
							value: '2',
						}, {
							label: '跑步',
							value: '3',
						}, {
							label: '乒乓球',
							value: '4',
						}, {
							label: '智力游戏（如扑克、麻将、象棋、围棋等）',
							value: '5',
						}, {
							label: '音乐（流行音乐、戏曲、纯音乐等）',
							value: '6',
						}, {
							label: '乐器（钢琴、小提琴、风琴、二胡等）',
							value: '7',
						}, {
							label: '其他',
							value: '8',
						}]
					},
					{
						label: '饮食习惯',
						key: 'habit_diet',
						type: 'checkbox',
						options: [{
							label: '高盐高脂',
							value: '1',
						}, {
							label: '高蛋白饮食',
							value: '2',
						}, {
							label: '清淡',
							value: '3',
						}, {
							label: '素食',
							value: '4',
						}, {
							label: '夜宵',
							value: '5',
						}]
					},
			
				],
				formData: { // 结构赋值，不然会直接更改仓库
					...(store.state.evaluateFormData || {})
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
			formSubmit(e) {
				// 注入仓库
				store.commit('setEvaluateFormData', {
					...this.formData
				})
				uni.showModal({
					content: '表单数据内容：' + JSON.stringify(this.formData),
					showCancel: false
				});
			},
			formReset(e) {
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

		&.detail-page {
			height: 100%;
			width: 100%;
		}

		.evaluate-form-wrap {
			box-sizing: border-box;
			flex: 1;
			display: flex;
			flex-direction: column;
			overflow: hidden;

			// 内容区域
			.content-wrap {
				flex: 1;
				padding: 8px 12px;
				overflow: auto;

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