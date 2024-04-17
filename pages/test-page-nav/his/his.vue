<template>
	<view class="page-wrap">
		<navbar pageTitle="缺血指数量表(HIS)" :showGoback="true" />

		<view class="evaluate-form-wrap">
			<scroll-view scroll-y scroll-with-animation class="content-wrap" :scroll-into-view="scrollId"
				@scroll="scroll">
				<view class="title">基本信息
				</view>
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
				<button class="btn" @click="gotoDetail('/pages/test-page-nav/mini-cog/mini-cog')">上一页</button>
				<button class="btn" @click="gotoDetail('/pages/test-page-nav/mmse/mmse')">下一页</button>
			</view>
		</view>
	</view>
</template>

<script>
	import navbar from '@/components/nav-bar.vue';
	import formItemRender from '@/components/form-item-render.vue'
	import store from '@/store/index.js'
	import {
		mapActions
	} from 'vuex'

	export default {
		name: 'his',
		components: {
			navbar,
			formItemRender,
		},
		data() {
			return {
				scrollId: '', // 要滚动至显示的元素
				items: store.state.hisItems,
				// formData: { // 结构赋值，不然会直接更改仓库
				// 	...(JSON.parse(
				// 		'{"acute_onset":2,"step_deterioration":"0","fluctuating_course":2,"unconcisous":"0","integrate_personalities":"1","depression":"0","body_state":"1","affective_incontinence":"0","hypertension":"1","stroke":"0","arteriosclerotic":"1","neurological_symptoms":"0","neurological_signs":2,"created_at":"zza","score_sum":"1"}'
				// 	) || store.state.hisData || {})
				// },
				isDetail: false,
				otherData: {
					patient_id: '',
					patient_name: '',
				},
				formData:{},
				score: 0, // 总得分
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
			}
		},
		methods: {
			formSubmit() {
				let nullItem = null; // 存在未填写且显示的元素
				store.state.hisItems.forEach((item) => {
					if (nullItem) return; // 存在就别在找了
					let isNull = false; // 是否未填写
					switch (item.type) {
						case 'input':
						case 'number':
						case 'radio':
							if (this.formData[item.key] == undefined || this.formData[item.key] == '')
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
					this.scrollId = 'scroll-' + nullItem.key;
					uni.showToast({
						title: '请填写' + nullItem.label,
						icon: 'none'
					})
				} else {
					// 计算总分
					let hachinskiScoreSum = 0;
					let rosenScoreSum = 0;
					store.state.hisItems?.forEach((item, index) => {
						if (typeof Number(this.formData[item.key]) == 'number') {
							hachinskiScoreSum += Number(this.formData[item.key])
							if ([1, 2, 5, 7, 8, 9, 10, 11, 12, 13].includes(index + 1))
								rosenScoreSum += Number(this.formData[item.key])
						}
					})
					// this.formData["hachinski_score_sum"] = hachinskiScoreSum
					// this.formData["rosen_score_sum"] = rosenScoreSum
					let that = this
					
					let scoreSum = 0;
					that.items.forEach(item => {
						scoreSum += Number(that.formData[item.key]) || 0;
					})
					this.score=scoreSum
					
					uni.showLoading({
						title: '正在提交...'
					})
					console.log(that.otherData)
					console.log(that.formData)
					console.log(store.state.nurse)
					console.log(scoreSum)
					// 网络请求
					uni.request({
						url: 'http://47.113.91.80:8002/quest/uploadQuest3', //仅为示例，并非真实接口地址。
						method: 'POST',
						data: {
							
								...that.formData,
								...that.otherData,
								nurse: store.state.nurse,
								score_sum: scoreSum,
								created_at: store.state.created_at	
						},
						header: {},
						success: (res) => {
							// 标记已完成
							store.commit('markCompleted', 'his')
							// 注入仓库
							store.commit('setHisData', {
								...that.formData
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
				store.commit('setHisData', {})
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
			// 跳转上下详情页
			gotoDetail(url) {
				uni.navigateTo({
					url: url + '?isDetail=1'
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
					url: 'http://47.113.91.80:8002/quest/getQuest3',
					method: 'POST',
					data: {
			
						...that.otherData,
			
					},
					timeout: 6000,
					header: {},
					success: (res) => {
						if (res.data) {
							console.log('res', res)
							console.log('res.data',res.data)
							this.formData = res.data.data[0]
							console.log('this.formData',this.formData)
							
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