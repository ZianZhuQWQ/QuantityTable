<template>
	<view class="page-wrap">
		<navbar :pageTitle="'简易智能精神状态量表(MMSE) ' + current + '/' + items.length" :showGoback="true" />

		<view class="content-wrap">
			<template v-for="(item, index) in items">
				<view :key="item.key" class="item-wrap" v-show="isDetail || index == current - 1">
					<view class="tips">
						{{ index + 1 + '、' }}
						{{ item.tips }}
						<image v-if="item.imgSrc" class='img' :src='item.imgSrc' mode='aspectFit' />
					</view>

					<view class="attachment-wrap" v-if="!!item.attachment">
						<template v-for="attachment in item.attachment">
							<form-item-render :key="attachment.key" :item="attachment"
								v-model="formData[attachment.key]" :disable="isDetail" :showText="true"
								@onChange="onChange" />
						</template>
					</view>

					<view class="result">
						<form-item-render :key="item.key" :item="{ ...item.result, key: item.key }"
							v-model="formData[item.key]" :disable="isDetail" :showText="true" @onChange="onChange" />
					</view>

				</view>
			</template>

			<!-- 			<view class="score" v-if="isDetail || true" -->
			<view class="score" v-if="isDetail">
				总得分：{{ score }}
			</view>
		</view>

		<!-- 按钮区域 -->
		<view class="foot" v-if="!isDetail">
			<button @click="switchPage('down')" v-if="current != 1">上一题</button>
			<button @click="switchPage('cancel')" v-else>取消测试</button>
			<button @click="switchPage('up')" v-if="current != items.length">下一题</button>
			<button @click="switchPage('submit')" v-else>提交</button </view>
		</view>

		<view class="foot" v-else>
			<button class="btn" @click="gotoDetail('/pages/test-page-nav/his/his')">上一页</button>
			<button class="btn" @click="gotoDetail('/pages/test-page-nav/moca/moca')">下一页</button>
		</view>
	</view>
</template>

<script>
	import navbar from '@/components/nav-bar.vue';
	import formItemRender from '@/components/form-item-render.vue'
	import store from '@/store/index.js'
	import uploadVideo from '@/components/upload-video.vue';

	export default {
		components: {
			navbar,
			formItemRender,
			uploadVideo,
		},
		data() {
			return {
				current: 1,
				isDetail: false,
				score: 1, // 总得分
				formData: {},
				otherData: {
					patient_id: '',
					patient_name: '',
				},
				items: store.state.mmseItems
			}
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



				// this.$set(this.otherData, 'age', '71')
				// this.$set(this.otherData, 'sex', '1')
				// this.$set(this.otherData, 'mobile', '12839483948')
				// this.$set(this.otherData, 'education', '本科')
				// this.$set(this.otherData, 'address', '广东东莞')
				// 	this.$set(this.otherData, 'created_at', '2024-04-10 18:09:11')
			}
		},
		methods: {
			onChange(data) {
				this.$set(this.formData, data.key, data.value)
			},

			formSubmit() {
				let nullItem = null; // 存在未填写且显示的元素
				store.state.mmseItems.forEach((item, index) => {
					if (nullItem) return; // 存在就别在找了
					if (this.formData[item.key] === undefined || this.formData[item.key] === '') {
						nullItem = {
							...item,
							index
						};
					}
				})

				if (nullItem) {
					this.current = nullItem.index + 1;
					uni.showToast({
						title: '请完成第' + this.current + '题',
						icon: 'none'
					})
				} else {
					let that = this
					let scoreSum = 0;
					that.items.forEach(item => {

						scoreSum += Number(that.formData[item.key]) || 0;
						console.log('this.formData[item.key]', this.formData[item.key])
						console.log('scoreSum', scoreSum)
					})
					that.score = scoreSum
					console.log('ssssssssssssssssss', that.score)

					// // 调保存接口TODO
					// uni.showLoading({
					// 	title: '正在提交...'
					// })
					console.log(that.otherData)
					console.log('that.formData', that.formData)
					const img = that.formData.linguistic4_4_img
					console.log('that.formData.linguistic4_4_img', that.formData.linguistic4_4_img)
					console.log('img', img)

					console.log(store.state.nurse)
					console.log(scoreSum)


					// 网络请求
					// uni.request({
					// 	url: 'http://47.113.91.80:8002/quest/uploadQuest4',
					// 	method: 'POST',
					// 	data: {

					// 		...that.otherData,
					// 		...that.formData,
					// 		nurse: store.state.nurse,
					// 		score_sum: scoreSum,

					// 	},
					// 	header: {},

					// 	success: (res) => {
					// 		// 标记已完成
					// 		store.commit('markCompleted', 'mmse')
					// 		// 注入仓库
					// 		store.commit('setMmseData', {
					// 			...this.formData
					// 		})
					// 		uni.hideLoading()
					// 		uni.showToast({
					// 			title: "提交成功",
					// 			icon: 'success'
					// 		})
					// 		uni.navigateTo({
					// 			url: `/pages/test-page-nav/test-page-nav?userName=${that.otherData?.patient_name}&userId=${that.otherData?.patient_id}`
					// 		});
					// 	},
					// 	fail(err) {
					// 		uni.hideLoading()
					// 		uni.showToast({
					// 			title: "操作失败，请重试!" + (!!err.errMsg && '\n' + err.errMsg),
					// 			icon: 'none'
					// 		})
					// 	}
					// });





					// const date = new Date(); // 获取当前日期和时间
					// const formattedDate =
					// 	`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}-${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;


					uni.uploadFile({
						url: 'https://alzheimerdisease.yueyutek.com:8002/quest/uploadQuest4',
						filePath: img,
						name: 'img',
						method: 'POST',
						formData: {
							// patient_id: this.otherData.patient_id,
							// patient_name: this.otherData.patient_name,
							// age: this.otherData.age,
							// sex: this.otherData.sex,
							// sex: this.otherData.mobile,
							// education: this.otherData.education,
							// address: this.otherData.address,


							...that.otherData,
							...that.formData,

							nurse: store.state.nurse,
							score_sum: scoreSum,
							created_at: store.state.created_at,

						},
						timeout: 6000,
						header: {},
						success: (res) => {

							// 标记已完成
							store.commit('markCompleted', 'mmse')
							// 注入仓库
							store.commit('setMmseData', {
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
			// 切换页面和提交
			switchPage(type) {
				if (type == 'up') this.current += 1;
				else if (type == 'down') this.current -= 1;
				else if (type == 'submit') {
					this.formSubmit();
				} else uni.navigateBack().catch(() => {
					uni.switchTab({
						url: '/pages/home/home'
					})
				});
			},
			// 跳转上下详情页
			gotoDetail(url) {
				uni.navigateTo({
					url: url + '?isDetail=1' + `&userInfo=${JSON.stringify({
									userId: this.otherData?.patient_id,
									userName: this.otherData?.patient_name,
								})}`
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
					url: 'https://alzheimerdisease.yueyutek.com:8002/quest/getQuest4',
					method: 'POST',
					data: {

						patient_id: that.otherData.patient_id,
						created_at: store.state.result_created_at
					},
					timeout: 6000,
					header: {},
					success: (res) => {

						if (res.data) {
							console.log('res', res)
							console.log('res.data', res.data)
							this.formData = res.data.data[0]
							console.log('this.formData', this.formData)

							const baseUrl = 'https://alzheimerdisease.yueyutek.com:8002/';
							this.$set(this.formData, 'linguistic4_4_img', baseUrl + res.data.data[0].img
								.replace(/^\.\//, ''))

							this.score = res.data.data[0].score_sum
							

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
		display: flex;
		flex-direction: column;
		height: 100vh;

		.content-wrap {
			flex: 1;
			overflow-y: auto;
			padding: 30rpx;

			.item-wrap {
				.tips {
					font-weight: bold;
					font-size: 45rpx;
					text-align: center;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					display: flex;
					box-sizing: border-box;
					padding: 8rpx;
					width: 100%;
					min-height: 300rpx;
					background-color: #e7eaec;
					border-radius: 8px;

					.img {
						display: inline-block;
						width: 80%;
						margin-top: 16px;
					}
				}

				.attachment-wrap {
					width: 100%;
				}

				.result {
					margin-top: 24px;
				}
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
			padding: 8px 12px;
			background-color: #ffffff;
			gap: 10px; // 按钮之间空隙

			button {
				flex: 1;
				height: 40px;
				background-color: #5cd7aa;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #ffffff;
			}
		}
	}
</style>