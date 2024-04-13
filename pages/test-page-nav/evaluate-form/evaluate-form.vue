<template>
	<view class="page-wrap">
		<navbar pageTitle="阿尔兹海默病早期筛查及评估" :showGoback="true" />

		<view class="evaluate-form-wrap">
			<scroll-view scroll-y scroll-with-animation class="content-wrap" :scroll-into-view="scrollId"
				@scroll="scroll">
				<view class="title">基本信息</view>
				<view class="item">
					<template v-for="item in items">
						<form-item-render :id="'scroll-' + item.key" :key="item.key" :item="item"
							v-model="formData[item.key]" :disable="isDetail" :showText="true"
							v-if="!item.showCondition || getShowFormItem(item.showCondition)"
							@onChange="itemOnChange" />
					</template>
				</view>

				<view class="score" v-if="isDetail">
					总得分：{{ score }}
				</view>
			</scroll-view>

			<!-- 按钮区域 -->
			<view class="foot" v-if="!isDetail">
				<button class="default" @click="formReset">重置</button>
				<button @click="formSubmit">提交</button>
			</view>

			<view class="foot" v-else>
				<button @click="gotoMiniCogDetail">下一页</button>
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
		data() {
			return {
				scrollId: '', // 要滚动至显示的元素
				score: 0, // 总得分
				isDetail: false, // 是否是详情页，是就不能编辑
				otherData: {
					patient_id: '',
					patient_name: '',
				},
				items: store.state.evaluateFormItems, // 渲染表单的配置
				// formData: { // 结构赋值，不然会直接更改仓库
				// 	...(JSON.parse(
				// 		'{"pationt_name":"孙安","sex":"1","age":"25","bmi":"100","birthplace":"海南昌江","address":"广州","city":"city","career":"1","drug":"0","drug_history":"虚无","smoke":"0","hobby":"3","hobby_puzzle":"很多","patient_id":"1","nurse":"1","created_at":"zza","score_sum":"1","hobby_music":"音乐","hobby_Instrument":"乐器","hobby_others":"其他","habit_dietary":"1","habit_brushteeth":"1"," habit_stayup":"0","habit_sleep":"2","personality":"0","finance":"1","hypertension":"0","cad":"1","cad_medicine":"1","diabetes":"1","diabetes_control":"0","diabetes_medicine":"2","hereditary":"0","hereditary_others":"虚"}'
				// 	) || store.state.evaluateFormData || {})
				// },
				formData: {}
			}
		},
		computed: {
			inputDisabled() {
				return this.radioValue === '是';
			},
		},

		watch: {
			isDetail: {
				deep: true,
				handler(newValue, oldValue) {
					if (!!newValue) this.getDetailData();
				}
			}
		},


		onLoad: function(option) { // option为object类型，会序列化上个页面传递的参数
			this.isDetail = !!Number(option.isDetail);
			if (option.userInfo) {
				const userInfo = JSON.parse(option.userInfo)
				this.$set(this.otherData, 'patient_id', userInfo.userId)
				this.$set(this.otherData, 'patient_name', userInfo.userName)


				// this.$set(this.otherData, 'created_at', '2024-04-10 18:09:11')

			}
		},
		methods: {
			formSubmit() {
				let nullItem = null; // 存在未填写且显示的元素
				store.state.evaluateFormItems.forEach((item) => {
					if (nullItem) return; // 存在就别在找了
					let isNull = false; // 是否未填写
					switch (item.type) {
						case 'input':
						case 'number':
						case 'radio':
							if (this.formData[item.key] === undefined || this.formData[item.key] === '')
								isNull = true
							break;
						case 'checkbox':
							if (!this.formData[item.key]?.length) isNull = true
							break;
					}
					if (isNull) {
						// 是否是被隐藏的元素
						const showToast = !item.showCondition || this.getShowFormItem(item.showCondition)
						if (showToast) nullItem = item;
					}
				})

				if (nullItem) {
					console.log('scroll-' + nullItem.key)
					this.scrollId = 'scroll-' + nullItem.key;
					uni.showToast({
						title: '请填写' + nullItem.label,
						icon: 'none'
					})
				} else {
					let that = this
					let scoreSum = 0;
					that.items.forEach(item => {
						scoreSum += Number(that.formData[item.key]) || 0;
					})
					this.score = scoreSum
					uni.showLoading({
						title: '正在提交...'
					})
					this.$set(this.formData, 'created_at', '2024-04-10 18:09:11')
					console.log(that.otherData)
					console.log(that.formData)
					console.log(store.state.nurse)
					console.log(scoreSum)
					// 网络请求
					uni.request({
						url: 'http://47.113.91.80:8002/quest/uploadQuest1',
						method: 'POST',
						timeout: 15000,
						data: {

							...that.formData,
							...that.otherData,
							nurse: store.state.nurse,
							
							score_sum: scoreSum,

						},
						header: {},
						success: (res) => {
							// 标记已完成
							store.commit('markCompleted', 'evaluate-form')
							// 注入仓库
							store.commit('setEvaluateFormData', {
								...this.formData
							})
							uni.hideLoading()
							uni.showToast({
								title: "提交成功",
								icon: 'success'
							})
							uni.navigateTo({
								url: `/pages/test-page-nav/test-page-nav?userName=${that.otherData?.patient_name}&userId=${that.otherData?.patient_id}`
							});
						},
						fail(err) {
							uni.hideLoading()
							uni.showToast({
								title: "操作失败，请重试!" + (!!err.errMsg && '\n' + err.errMsg),
								icon: 'none'
							})
						}
					});
				}
			},
			formReset() {
				Object.keys(this.formData).forEach(key => {
					this.$set(this.formData, key, undefined)
				})
				// 清空仓库数据
				store.commit('setEvaluateFormData', {})
			},
			// 监听item变化
			itemOnChange(item) {
				this.$set(this.formData, item.key, item.value)
			},
			// 判断是否显示绑定条件字段
			getShowFormItem(condition) {
				return this.formData[condition.key] == condition.value
			},
			// 容器滚动时
			scroll() {
				this.scrollId = ''
			},
			// 跳转到第二张表详情
			gotoMiniCogDetail() {
				uni.navigateTo({
					url: '/pages/test-page-nav/mini-cog/mini-cog?isDetail=1'
				});
			},
			// 获取详情数据
			getDetailData() {
				let that = this
				console.log('ddddddddddddd', that.otherData)
				uni.showLoading({
					title: '正在获取数据...'
				})


				uni.request({
					url: 'http://47.113.91.80:8002/quest/getQuest1',
					method: 'POST',
					data: {

						...that.otherData,
						created_at: store.state.patientInfoData.created_at,

					},
					timeout: 6000,
					header: {},
					success: (res) => {
						if (res.data) {
							console.log('res', res)
							console.log('res.data', res.data)
							this.formData = res.data.data[0]
							console.log('this.formData', this.formData)

						}
						uni.hideLoading()
					},
					fail(err) {
						uni.hideLoading()
						uni.showToast({
							title: "操作失败，请重试!" + (!!err.errMsg && '\n' + err.errMsg),
							icon: 'none'
						})
					}
				});
			}
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

				// 总得分
				.score {
					width: 100%;
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