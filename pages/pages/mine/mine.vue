<template>
	<view class="wrapper">
		<navbar :pageTitle="pageTitle" />

		<!-- 个人资料 -->
		<view>
			<view class="top">
				<view class="center">
					<view class="center_top">
						<view class="center_img">
							<!-- 这里可以放自己的静态头像 -->
							<image src="/static/nurse.png"></image>
							<open-data type="userAvatarUrl" class="user_head"></open-data>
						</view>
						<view class="center_info">
							<text>{{nurse_id}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>


		<!-- 其它 -->
		<view class="extra">
			<uni-list>
				<!-- <uni-list-item v-for="item in itemList" :key="item.title" :title="item.title" :note="item.note"  :thumb="item.thumb" :thumb-size="item.thumbSize" showArrow  :link="navigateTo" :to="item.to"/> -->
				<uni-list-item title="修改资料" note="" thumb="/static/psw.png" thumbSize="lg" link="navigateTo"
					to="/pages/test/test" showArrow />

				<uni-list-item>
					<view slot="header">
						<image style="width: 85rpx;height: 85rpx;" src="/static/feedback.png" mode="widthFix" />
					</view>

					<button slot="body" class="slot-text" open-type="feedback">意见反馈</button>
					<!-- <template slot="footer">
		  					<image style="width: 30px;height: 30px;" src="/static/feedback.png" mode="widthFix"/>
		  				</template> -->
				</uni-list-item>

				<uni-list-item>
					<view slot="header">
						<!-- <image style="width: 30px;height: 30px;" src="/static/service.png" mode="widthFix"/> -->

						<image style="width: 75rpx;height: 75rpx;" src="/static/service.png" mode="aspectFit" />

					</view>

					<button slot="body" class="slot-text" open-type="contact">联系客服</button>
					<!-- <template slot="footer">
							<image style="width: 30px;height: 30px;" src="/static/service.png" mode="widthFix"/>
						</template> -->
				</uni-list-item>

				<uni-list-item title="退出登录" note="" thumb="/static/logout.png" thumbSize="lg" link="navigateTo"
					to="/pages/login/login" showArrow />

			</uni-list>
		</view>
	</view>
</template>

<script>
	import navbar from '@/components/nav-bar.vue';

	export default {
		components: {
			navbar
		},
		data() {
			return {
				// safeAreaInsets: null,
				pageTitle: "我的",
				nurse_id: "护士id",


			}
		},
		computed: {

		},
		created() {

		},
		// mounted() {
		//   this.getSafeAreaInsets()
		// },
		methods: {
			// getSafeAreaInsets() {
			//   // 获取屏幕边界到安全区域距离
			//   const systemInfo = uni.getSystemInfoSync()
			//   this.safeAreaInsets = systemInfo.safeAreaInsets
			// },
		}
	};
</script>

<style scoped lang="scss">
	Page {
		font-size: 14px;
	}

	.top {
		width: 100%;
		height: 300rpx;
		// background: #23EBB9;
		// background: #76EEC6;
		padding-top: 15px;
		position: relative;
	}

	.center {
		width: 95%;
		height: 250rpx;
		background: white;
		display: flex;
		flex-direction: column;
		margin: 0 auto;
		border-radius: 5px;
	}

	.center_top {
		display: flex;
		flex-direction: column;
		width: 80%;
		height: 200rpx;
		margin: 0 auto;
		margin-top: 20rpx;
		border-bottom: 1px solid #EEEEEE;
		justify-content: center;
		align-items: center;
	}

	.center_img {
		width: 66px;
		height: 66px;
		border-radius: 50%;
		overflow: hidden;


	}

	.center_img image {
		width: 100%;
		height: 100%;
		border-radius: 50%;


	}

	.center_img .user_head {
		width: 100%;
		height: 100%;
	}

	.center_info {
		display: flex;
		flex-direction: column;
		margin-top: 16rpx;
		// margin-left: 60rpx;
		// justify-content: center;
		// align-items: center;
	}

	.center_name {
		font-size: 18px;
	}

	.center_phone {
		color: #BEBEBE;
	}

	// .center_down {
	// 	display: flex;
	// 	flex-direction: row;
	// 	width: 80%;
	// 	height: 35px;
	// 	margin: 0 auto;
	// 	margin-top: 20rpx;
	// }

	.center_rank {
		width: 50%;
		height: 35px;
		display: flex;
		flex-direction: row;
	}

	.rank_text {
		height: 35px;
		line-height: 35px;
		margin-left: 10rpx;
		color: #AAAAAA;
	}



	.vip_icon {
		width: 25px;
		height: 25px;
		margin-top: -10rpx;
	}



	.center_rank image {
		width: 35px;
		height: 35px;
	}

	.center_score {
		width: 50%;
		height: 35px;
		display: flex;
		flex-direction: row;
	}

	.center_score image {
		width: 35px;
		height: 35px;
	}

	.gif-wave {
		position: absolute;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 99;
		mix-blend-mode: screen;
		height: 100rpx;
	}

	.wrapper {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		background-color: #F4F4F4;
	}

	.profile {
		height: 375rpx;
		background-color: #ea4451;
		display: flex;
		justify-content: center;
		align-items: center;

		.meta {
			.avatar {
				display: block;
				width: 140rpx;
				height: 140rpx;
				border-radius: 50%;
				border: 2rpx solid #fff;
				overflow: hidden;
			}

			.nickname {
				display: block;
				text-align: center;
				margin-top: 20rpx;
				font-size: 30rpx;
				color: #fff;
			}
		}
	}



	.orders {
		margin: 20rpx 20rpx 0 20rpx;
		padding: 40rpx 0;
		background-color: #fff;
		border-radius: 4rpx;

		.title {
			padding-left: 20rpx;
			font-size: 30rpx;
			color: #333;
			padding-bottom: 20rpx;
			border-bottom: 1rpx solid #eee;
			margin-top: -30rpx;
		}

		.sorts {
			padding-top: 30rpx;
			text-align: center;
			display: flex;
		}

		[class*="icon-"] {
			flex: 1;
			font-size: 24rpx;

			&::before {
				display: block;
				font-size: 48rpx;
				margin-bottom: 8rpx;
				color: #ea4451;
			}
		}
	}

	.address {
		line-height: 1;
		background-color: #fff;
		font-size: 30rpx;
		padding: 25rpx 0 25rpx 20rpx;
		margin: 10rpx 20rpx;
		color: #333;
		border-radius: 4rpx;
	}

	.extra {
		margin: 10rpx 20rpx;
		background-color: #fff;
		border-radius: 4rpx;

		.item {
			line-height: 1;
			padding: 25rpx 0 25rpx 20rpx;
			border-bottom: 1rpx solid #eee;
			font-size: 30rpx;
			color: #333;
		}

		button {
			text-align: left;
			background-color: #fff;

			&::after {
				border: none;
				border-radius: 0;
			}
		}
	}

	.icon-arrow {
		position: relative;

		&::before {
			position: absolute;
			top: 50%;
			right: 20rpx;
			transform: translateY(-50%);
		}
	}
</style>