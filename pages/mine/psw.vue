<template>
	<view id="contianer">
		<navbar pageTitle="结果" :showGoback="true" />

		<!-- <view>
			<view class="title">当前密码</view>
			<view style="display: flex; width: 100%;" class="input">
				<input placeholder="请输入当前密码" placeholder-style="font-size:26rpx;color:#ACACAC;" type="password" name="input" v-model="password" />
			</view>
		</view> -->
		<view>
			<view class="title">新的密码</view>
			<view class="input">
				<input placeholder="请输入新的密码" placeholder-style="font-size:26rpx;color:#ACACAC;" type="password"
					name="input" v-model="newPassword" />
			</view>
		</view>
		<view>
			<view class="title">确认密码</view>
			<view class="input">
				<input placeholder="请确认新的密码" placeholder-style="font-size:26rpx;color:#ACACAC;" type="password"
					name="input" v-model="confirmPassword" />
			</view>
		</view>
		<view style="margin-top: 60rpx;"><button class="button" @tap="doChangePwd()">确认修改</button></view>
	</view>
</template>





<script>
	import navbar from '@/components/nav-bar.vue';
	import {
		mapState
	} from 'vuex' //引入mapState

	export default {
		components: {
			navbar
		},
		data() {
			return {
				// password:'',
				newPassword: '',
				confirmPassword: ''
			}
		},
		computed: {

			...mapState({
				nurse_id: state => state.nurse,
				// patient_id: state => state.patientInfoData.patient_id,

				// age: state => state.age,
			})



		},

		methods: {
			doChangePwd() {

				// uni.showToast({
				// 	title: "修改成功"
				// })
				// },
				// 校验密码是否为空和确认密码是否一致
				if (!this.newPassword || this.newPassword !== this.confirmPassword) {
					uni.showToast({
							title: "密码不一致",
							icon: 'error'
						}),
						this.newPassword = ''
					this.confirmPassword = ''
					// 处理密码校验失败的逻辑，例如显示错误提示
					return;
				}
				console.log('newPassword:', this.newPassword)
				console.log('confirmPassword:', this.confirmPassword)
				console.log('nurse_id:', this.nurse_id)

				uni.request({
					url: 'https://alzheimerdisease.yueyutek.com:8002/quest/editUserPassWord',
					method: 'POST',
					dataType: 'json',
					data: {
						nurse_id: this.nurse_id,
						password: this.confirmPassword
					},
					success: res => { //如果获取到服务器
						console.log(res.data)
						uni.showToast({
							title: '修改成功',
							icon: 'success'
						})


						setTimeout(function() {
							uni.switchTab({
								url: '/pages/mine/mine'
							});
						}, 1000);



					},
					fail: res => {}
				})


				//   // 发送请求给后端
				//   const requestData = {
				// 	password: this.password,
				// 	newPassword: this.newPassword,
				//   };

				//   // 使用适当的方式发送请求给后端，例如使用 axios 或 fetch
				//   // 以下是一个示例使用 axios 发送 POST 请求的代码：
				//   axios.post('/api/changePassword', requestData)
				// 	.then(response => {
				// 	  // 处理请求成功的逻辑，例如显示成功提示
				// 	})
				// 	.catch(error => {
				// 	  // 处理请求失败的逻辑，例如显示错误提示
				// 	});
				// },
				//  },
			}
		},
	}
</script>


<style scoped>
	page {
		height: 100%
	}

	#contianer {
		padding-top: 1rpx;
		position: relative;
		height: 100%;
		/* 本页面背景颜色 */
		background-color: #F5F5F5;
	}

	.title {
		color: #696969;
		margin: 15rpx 20rpx;
	}

	.input {
		padding: 20rpx 20rpx;
		background-color: #fff;
	}

	.button {
		width: 93%;
		color: #fff;
		background-color: #76EEC6;
	}
</style>