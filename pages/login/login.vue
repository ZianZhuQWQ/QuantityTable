<template>
	<view class="page-wrap">
		<navbar pageTitle="登录" />
		<view class="all">
			<view class="title">
				<image :src="title_login" alt="图片损坏" />
			</view>
			<form class="login-form" @submit="formSubmit">
				<view class="input-group ">
					<text class="input-label">帐号</text>
					<input binf cursor-spacing="30" id="userid" maxlength="18" placeholder="请输入用户名" data-type="Idnumber"
						name='nurse_id' />
				</view>
				<view class="input-group password">
					<text class="input-label">密码</text>
					<input :password='isShowPassword' class="password" name='password' cursor-spacing="30" id="passwd"
						placeholder="请输入6位及其以上字符" data-type="password" maxlength="20" />
					<view class="eye_position" @tap='toggleShowPassword'>
						<image :src='eye' v-if='isShowPassword' />
						<image :src='eye_close' v-if='!isShowPassword' />
					</view>
				</view>
				<view>
					<button form-type="submit" class="login">登录</button>
				</view>
				<view>
					<uni-list v-for="patient in patients" :key="patient.patient_id">
						patient_id:{{ patient.patient_id }},patient_name:{{ patient.patient_name }}, created_at:
						{{ patient.created_at }}</uni-list>
				</view>
			</form>
		</view>
	</view>
</template>
<script>
	import navbar from '@/components/nav-bar.vue'
	import store from '@/store/index.js'

	export default {
		components: {
			navbar
		},
		data() {
			return {
				isShowPassword: true,
				password: '',
				// imageUrl:'https://pic1.zhimg.com/v2-149c726ff219b8c678783b0ca5cae6e6_r.jpg?source=1940ef5c',
				// title_login: getApp().globalData.icon + 'login/title_login.png',
				// eye: getApp().globalData.icon + 'index/mine/eye.png',
				// eye_close: getApp().globalData.icon + 'index/mine/eye_close.png',

				patients: [],
				// nurse_id: '',
				nurse_id: '',

				patient_name: '',
				created_at: '',


			}
		},
		methods: {
			//密码是否显示
			toggleShowPassword: function(e) {
				var isShowPassword = !this.isShowPassword;
				this.isShowPassword = isShowPassword
			},
			//用户密码登录
			formSubmit(e) {
				// uni.switchTab({
				// 	url: '/pages/home/home'
				// })
				//获取用户输入信息
				this.nurse_id = e.detail.value.nurse_id; //用户输入账号信息
				this.password = e.detail.value.password //用户输入密码信息
				let nurse_id = this.nurse_id
				let password = this.password
				//效验账号密码位数
				// if (nurse_id.length < 2 || nurse_id.length > 10) {
				// 	uni.showToast({
				// 		title: '账号应在2~10位之间',
				// 		icon: 'none'
				// 	})
				// 	return
				// } else if (password.length < 6 || password.length > 12) {
				// 	uni.showToast({
				// 		title: '密码应在6~12位之间',
				// 		icon: 'none'
				// 	})
				// 	return
				// } else {
					//传入数据到后端，进行登录
					uni.request({
						// url: getApp().globalData.position + 'Xcxuser/userlogin',
						// header: {
						// 	"Content-Type": "application/x-www-form-urlencoded"
						// },
						url: 'https://alzheimerdisease.yueyutek.com:8002/quest/login',
						method: 'POST',
						dataType: 'json',
						data: {
							nurse_id: nurse_id,
							password: password
						},
						success: res => { //如果获取到服务器
							// console.log(res.data)
							if (res.data.errorCode == 3301) {
								uni.showToast({
									title: '账号不存在 用户未注册',
									icon: "none",
								})
								return
							} else if (res.data.errorCode == 3302) {
								uni.showToast({
									title: '密码错误  用户名或密码错误',
									icon: "none",
								})
								return
							} else if (res.data.errorCode == 3302) {
								uni.showToast({
									title: '账号已失效',
									icon: "none",
								})
								return
							} else {
								uni.showToast({
									title: '登录成功',
									icon: 'success'
								})
								// 存入护士的id信息
								store.commit('setNurse', res.data.nurse_id)
								console.log(res.data.nurse_id)
								//将账号信息作为全局变量
								// console.log('res.data：',res.data);
								// this.text = 'request success';

								// console.log('res.data.patients：',res.data.patients);


								// this.patients=res.data.patients;
								// console.log("patients：",this.patients)
								// store.commit('setPatientInfoData', {
								// 	...this.patients

								// 	patient_id:this.patients.patient_id,
								// 	patient_name:this.patients.patient_name,
								// 	created_at:this.patients.created_at
								// })

								// store.commit('updatePatientInfoData', this.patients);

								// this.nurse_id=res.data.nurse_id;
								// console.log("nurse_id：",this.nurse_id)
								// store.commit('setNurseInfoData', {
								// 	// ...this.nurse_id
								// 	nurse_id: this.nurse_id
								// })

								// store.commit('setNurseInfoData', {
								//   nurse_id: this.nurse_id
								// });



								// let patient_name = this.patient_name
								// let created_at = this.created_at
								// // 请求成功回调

								// console.log('1111111111111111')
								// patient_name = res.data.patients[0].patient_name;
								// created_at = res.data.patients[0].created_at;
								// console.log('patient_name:',patient_name)
								// console.log('created_at:',created_at)
								// console.log('22222222222222')


								// let patients = {};  // 初始化一个空对象

								// 遍历后端返回的患者数据数组

								// res.data.patients.forEach(patient => { this.$set(this.patients, patient.patient_id, patient); });

								setTimeout(function() {
									uni.reLaunch({
										url: '/pages/home/home'
									})
								}, 1000);








								// getApp().globalData.username = res.data[0].username
								// uni.setStorageSync('username', res.data[0].username)
								// uni.reLaunch({ //跳转到主页，并携带账号参数
								// 	url: '../../start_production/start_index/start_index?username=' +
								// 		res.data[0].username
								// })
								// //存入登录变量
							}
						},
						fail: res => {}
					})
				// }
				
				
				
				
				
				
			},
		}
	}
</script>

<style>
	.page-wrap {
		background-color: rgb(242, 242, 242);
		width: 100vw;
		height: 100vh;
	}

	image {
		height: 80px;
		width: 200px;
		/* border:1px solid black; */
		z-index: 999px;
		position: relative;
		left: 50%;
		margin-left: -100px;
		margin-top: 30%;
		margin-bottom: 10%;

	}

	.eye_position {
		margin: 0px;
		padding: 0px;
		width: 45rpx;
		height: 45rpx;
		padding-right: 2%;
	}

	.eye_position image {
		margin: 0px;
		padding: 0px;
		width: 45rpx;
		height: 45rpx;
	}

	.input-group {
		display: flex;
		align-items: center;
		padding: 25rpx 10rpx;
		margin: 40rpx 3%;
		background: #fff;
		border-radius: 5px;
		border: 2px solid #f4f4f4;
		transition: all .25s ease-in-out;
		width: 88%;
		height: 60rpx;
	}

	.input-group.active {
		border: 2px solid #7acfa6;
	}

	.input-label {
		color: #888;
		font-size: 13pt;
		height: 25rpx;
		line-height: 25rpx;
		padding: 0 25rpx;
		border-right: 1px solid #d8d8d8;
	}

	.input-group input,
	.input-group picker {
		flex: 1;
		font-size: 13pt;
		min-height: 52rpx;
		height: 52rpx;
		line-height: 52rpx;
		padding: 0 25rpx;
	}

	.input-placeholder,
	.input-group picker.placeholder {
		color: #ccc;
	}


	.login {
		background-color: #76EEC6;
		width: 90%;
		color: white;
		margin-top: 10%;
		font-size: 20px;
	}
</style>