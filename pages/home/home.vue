<template>
	<view class="page-wrap">
		<!-- <navbar :pageTitle="isAddUser && '添加新患者' || '请选择患者进行测评'" /> -->
		<navbar :pageTitle="isAddUser && '添加新患者' || '请选择患者进行测评'" :showGoback="true" :showRefresh="'left'"
			@refreshFn="refresh" />

		<!-- 搜索 -->
		<view class="search-wrap" v-if="!isAddUser">
			<view class="input-wrap">
				<input class="search-input" v-model="searchValue" />
				<view class="placeholder">
					<image class="search-icon" src="../../static/search.png" />
					搜索
				</view>
			</view>
			<text v-if="searchValue" class="close" @click="closeSearch">取消</text>
		</view>




		<!-- <view>
			<uni-list v-for="patient in patients" :key="patient.patient_id">
				patient_id:{{ patient.patient_id }},patient_name:{{ patient.patient_name }}, created_at:
				{{ patient.created_at }}</uni-list>
		</view> -->

		<view class="query-list">
			<uni-list-item v-for="item in patient" :key="item.patient_id" :title="item.patient_name" :note="item.mobile"
				rightText="重新测评" thumb="/static/old.png" thumb-size="lg" showArrow clickable @click="clickItem(item)" />
		</view>

		<uni-list class="content-wrap" v-if="!isAddUser">
			<uni-list-item title="患者列表" />

			<!-- 真正的列表区域 -->
			<view class="result-list">
				<uni-list-item v-for="item in patients" :key="item.patient_id" :title="item.patient_name"
					:note="item.mobile" rightText="重新测评" thumb="/static/old.png" thumb-size="lg" showArrow clickable
					@click="clickItem(item)" />
			</view>
		</uni-list>






		<view class="content-wrap add-user" v-else>
			<view class="inputWrap">
				<view class="label">
					姓名：
				</view>
				<input v-model="addUserInfo.userName" type="text" placeholder="请输入姓名" />
			</view>
			<view class="inputWrap">
				<view class="label">
					手机号：
				</view>
				<input v-model="addUserInfo.phoneNumber" type="number" placeholder="请输入手机号" />
			</view>
		</view>

		<view class="foot">
			<button class="btn" @click="colseAddUser" v-if="isAddUser">取消</button>
			<button class="btn" @click="addUser">{{ isAddUser && '确定添加' || '添加患者' }}</button>
		</view>
	</view>
</template>

<script>
	import navbar from '@/components/nav-bar.vue';
	import store from '@/store/index.js'
	import {
		mapState
	} from 'vuex' //引入mapState



	export default {
		components: {
			navbar
		},

		data() {
			return {
				searchValue: '',


				isAddUser: false,
				addUserInfo: {
					userName: '',
					phoneNumber: ''
				},


				// created_at: '2024-04-08 14:47:26',
				patients: [],
				patient: [],
				// timer: null, // 定时器对象

			}
		},
		// created() {
		// 	// 在组件创建时启动定时器
		// 	this.timer = setInterval(() => {
		// 		this.fetchData();
		// 	}, 5000);
		// },

		computed: {

			...mapState({
				nurse_id: state => state.nurse,
				created_at: state => state.patientInfoData.created_at,

				// age: state => state.age,
			})



		},
		mounted() {
			this.fetchData();
			// this.getDataList();




		},

		watch: {
			searchValue(newVal) {
				// 在输入框内容变化时发送请求到后端
				this.fetchQuestionnaireCount(newVal);
			}
		},



		methods: {
			closeSearch() {
				this.searchValue = ''
			},

			// fetchData() {
			fetchData(completeCallback) {
				uni.showLoading({
					title: '正在获取数据...'
				})
				uni.request({
					url: 'https://alzheimerdisease.yueyutek.com:8002/quest/getPatientInfo',
					method: 'POST',
					dataType: 'json',
					data: {
						nurse_id: this.nurse_id,
					},

					success: res => { //如果获取到服务器
						console.log(res.data)
						this.patients = res.data.patients
						// console.log('res.data.patients', res.data.patients)
						// console.log('this.patients', this.patients)

						// this.$store.commit('setPatientInfoData', this.patients);
						// console.log('created_at', this.created_at)
						// console.log('created_time', this.created_time)






						// uni.showToast({
						// 	title: '查询成功',
						// 	icon: 'success'
						// })
						// uni.switchTab({
						// 	url: '/pages/mine/mine'
						// });

					},

					fail: res => {
						console.log(res.errorMsg)
					},
					complete() {
						uni.hideLoading()
						if (!!completeCallback) completeCallback()
					}
				});
			},


			// beforeDestroy() {
			// 	// 在组件销毁之前清除定时器
			// 	clearInterval(this.timer);
			// },
			fetchQuestionnaireCount(searchValue) {

				const requestData = {
					patient_name: this.searchValue,
					nurse_id: this.nurse_id,

				}
				console.log("this.patient_name", this.searchValue)

				// 发送请求到后端查询病人做过问卷的次数
				// 使用uni.request或其他网络请求库发送异步请求
				uni.request({
					url: 'https://alzheimerdisease.yueyutek.com:8002/quest/getPatient',
					method: 'POST',
					data: requestData,
					success: (res) => {
						if (res.data.errorCode == 3301) {
							// this.quest_num = ''
							this.showResult = false
							// uni.showToast({
							// 	title: '用户未创建答卷',
							// 	icon: "none",
							// })

							return
						} else {
							// 处理后端返回的数据
							console.log('res', res)
							console.log('res.data', res.data)
							// this.formData = res.data.data[0]

							this.patient = res.data.patients
							console.log('this.patient', this.patient)

							// 请求成功回调
							// if (res.statusCode === 200 && res.data && res.data.quest_num) {
							// this.quest_num = res.data.quest_num;
							// this.patient_name = this.searchValue
							// this.showResult = true;
							// console.log("this.quest_num", this.quest_num)

						}
					},

					fail: (err) => {
						// 请求失败回调
						console.error('请求失败', err);
						uni.showModal({
							title: '提示',
							content: res.data.errorMsg || '校验错误'
						});

					}
				});
			},













			clickItem(item) {
				uni.navigateTo({
					url: `/pages/test-page-nav/test-page-nav?userName=${item.patient_name}&userId=${item.patient_id}`
				});
			},
			// 获取用户数据
			// getDataList() {
			// uni.request({
			// 	url: 'http://47.113.91.80:8002/quest/patientRegister',
			// 	method: 'POST',
			// 	data: {
			// 		mobile: store.state.nurse,
			// 	},
			// 	header: {},
			// 	success: (res) => {
			// 		console.log('res', res);
			// 	},
			// 	fail(err) {
			// 		uni.hideLoading()
			// 		uni.showToast({
			// 			title: "获取患者失败，请重试!" + (!!err.errMsg && '\n' + err.errMsg),
			// 			icon: 'none'
			// 		})
			// 	}
			// });
			// },
			colseAddUser() {
				this.isAddUser = false;
			},
			addUser() {
				if (!this.isAddUser)
					this.isAddUser = true;
				else {
					let that = this
					uni.showLoading({
						title: '正在新建...'
					})
					
					
					const date = new Date(); // 获取当前日期和时间
					const formattedDate =
						`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
						
					uni.request({
						url: 'https://alzheimerdisease.yueyutek.com:8002/quest/patientRegister',
						method: 'POST',
						timeout: 15000,
						data: {
							name: that.addUserInfo.userName,
							mobile: that.addUserInfo.phoneNumber,
							nurse_id: store.state.nurse,
							created_at: formattedDate,

						},
						header: {},
						success: (res) => {
							console.log('res', res)
							uni.hideLoading()
							// 这里拿到的应该是老人ID对吧
							if (res.data.patient_id) {
								const id = res.data.patient_id
								uni.navigateTo({
									url: `/pages/test-page-nav/test-page-nav?userName=${that.addUserInfo?.userName}&userId=${id}`
								});
							} else uni.showToast({
								title: "新建失败，请重试!",
								icon: 'none'
							})
						},
						fail(err) {
							uni.hideLoading()
							uni.showToast({
								title: "新建失败，请重试!" + (!!err.errMsg && '\n' + err.errMsg),
								icon: 'none'
							})
						},

					});
				}
			},
			// 刷新列表
			refresh(completeCallback) {
				this.fetchData(completeCallback);
			}

		},
	}
</script>

<style lang="scss">
	.page-wrap {
		display: flex;
		flex-direction: column;
		width: 100vw;
		height: 100vh;

		.search-wrap {
			display: flex;
			align-items: center;
			border-radius: 8px;
			background-color: rgb(239, 239, 245);
			padding: 6px;
			margin: 12px 12px 16px 12px;

			.input-wrap {
				position: relative;
				flex: 1;

				.search-input {
					background-color: #fff;
					border-radius: 8px;
					height: 30px;
					flex: 1;
					padding: 2px 6px;
				}

				.placeholder {
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
					color: #aaaaaa;
					pointer-events: none;
					display: flex;
					align-items: center;

					.search-icon {
						height: 20px;
						width: 20px;
					}
				}
			}


			.close {
				padding: 0px 16px;
				color: rgb(144, 215, 172);
				font-size: 16px;
				white-space: nowrap;
			}
		}

		.content-wrap {
			flex: 1;
			overflow: hidden;
			display: flex;
			flex-direction: column;

			&.add-user {
				padding: 16px;

				.inputWrap {
					margin-bottom: 24px;

					.label {
						font-size: 14px;
						color: #666666;
						margin-bottom: 8px;
					}
				}
			}

			.result-list {
				flex: 1;
				overflow: auto;
			}
		}

		// 按钮区域
		.foot {
			border-top: 1px solid #dddddd;
			padding: 8px 12px;
			display: flex;
			justify-content: space-between;
			padding: 8px 24px;
			background-color: #ffffff;

			button {
				margin-right: 16px;
				flex: 1;
				height: 46px;
				background-color: #5cd7aa;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #ffffff;

				&:last-child {
					margin-right: 0;
				}

				&.default {
					background-color: #ffffff;
					color: #000000;
				}
			}
		}
	}
</style>