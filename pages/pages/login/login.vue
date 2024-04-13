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
						name='zhanghao' />
				</view>
				<view class="input-group password">
					<text class="input-label">密码</text>
					<input :password='isShowPassword' class="mima" name='mima' cursor-spacing="30" id="passwd"
						placeholder="请输入6位及其以上字符" data-type="password" maxlength="20" />
					<view class="eye_position" @tap='toggleShowPassword'>
						<image :src='eye' v-if='isShowPassword' />
						<image :src='eye_close' v-if='!isShowPassword' />
					</view>
				</view>
				<view>
					<button form-type="submit" class="login">登录</button>
				</view>
			</form>
		</view>
	</view>
</template>
<script>
	import navbar from '@/components/nav-bar.vue'

	export default {
		components: {
			navbar
		},
		data() {
			return {
				isShowPassword: true,
				zhanghao: '',
				mima: '',
				title_login: getApp().globalData.icon + 'login/title_login.png',
				eye: getApp().globalData.icon + 'index/mine/eye.png',
				eye_close: getApp().globalData.icon + 'index/mine/eye_close.png',
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
				uni.switchTab({
					url: '/pages/home/home'
				})
				//获取用户输入信息
				this.zhanghao = e.detail.value.zhanghao; //用户输入账号信息
				this.mima = e.detail.value.mima //用户输入密码信息
				let zhanghao = this.zhanghao
				let mima = this.mima
				//效验账号密码位数
				if (zhanghao.length < 2 || zhanghao.length > 10) {
					uni.showToast({
						title: '账号应在2~10位之间',
						icon: 'none'
					})
					return
				} else if (mima.length < 6 || mima.length > 12) {
					uni.showToast({
						title: '密码应在6~12位之间',
						icon: 'none'
					})
					return
				} else {
					//传入数据到后端，进行登录
					uni.request({
						url: getApp().globalData.position + 'Xcxuser/userlogin',
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						method: 'POST',
						dataType: 'json',
						data: {
							zhanghao: zhanghao,
							mima: mima
						},
						success: res => { //如果获取到服务器
							// console.log(res.data)
							if (res.data == 1) {
								uni.showToast({
									title: '账号不存在',
									icon: "none",
								})
								return
							} else if (res.data == 2) {
								uni.showToast({
									title: '密码错误',
									icon: "none",
								})
								return
							} else if (res.data == 3) {
								uni.showToast({
									title: '账号已失效',
									icon: "none",
								})
								return
							} else {
								//将账号信息作为全局变量
								getApp().globalData.username = res.data[0].username
								uni.setStorageSync('username', res.data[0].username)
								uni.reLaunch({ //跳转到主页，并携带账号参数
									url: '../../start_production/start_index/start_index?username=' +
										res.data[0].username
								})
								//存入登录变量
							}
						},
						fail: res => {}
					})
				}
			},
		}
	}
</script>

<style>
	.page-wrap {
		background-color: rgb(242, 242, 242);
		height: 100%;
		width: 100%;
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

	.login-help {
		display: flex;
		margin-left: 71%;
		align-items: center;
		justify-content: flex-end;
		padding: 0 30rpx;
		font-size: 10pt;
		color: #bbb;
	}

	.login-help-img {
		width: 11pt;
		height: 11pt;
		margin: 0 5rpx;
	}

	.confirm-btn {
		font-size: 13pt;
		line-height: 85rpx;
		height: 85rpx;
		background: #1296db;
		color: #fff;
		text-align: center;
		border-radius: 5px;
		margin: 50rpx 3%;
	}

	.confirm-btn:active {
		opacity: .8;
	}

	.login {
		background-color: #76EEC6;
		width: 90%;
		color: white;
		margin-top: 10%;
		font-size: 20px;
	}
</style>