<template>
	<view class="wrapper">
		<view class="navbar" :style="{ paddingTop: safeAreaInsets ? safeAreaInsets.top + 5 +'px' : '0' }">
			<text class="navtext">{{quantityTable}}</text>
		</view>

		<!-- 个人资料 -->
		<view>
			<view class="top">
				<view class="center">
					<view class="center_top">
						<view class="center_img">
							<!-- 这里可以放自己的静态头像 -->
							<image src="/static/old.png"></image>
							<open-data type="userAvatarUrl" class="user_head"></open-data>
						</view>
						<view class="center_info">
							<text>{{old_id}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 其它 -->
		<view class="extra">
			<uni-list>
				<uni-list-item v-for="item in itemList" :key="item.title" :title="item.title" :note="item.note"
					:thumb="item.thumb" :thumb-size="item.thumbSize" showArrow :link="navigateTo" :to="item.to" />
			</uni-list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				safeAreaInsets: null,
				quantityTable: "阿尔兹海默病筛查",
				old_id: "老人id",
				itemList: [{
						title: '阿尔兹海默病早期筛查及评估',
						note: '',
						thumb: '/static/quantityTable.png',
						thumbSize: 'lg',
						to: '/pages/quantityTable/table1'
					},
					{
						title: 'Mini-Cog量表',
						note: '',
						thumb: '/static/quantityTable.png',
						thumbSize: 'lg',
						to: '/pages/recording/recording'
					},
					{
						title: 'HIS量表',
						note: '',
						thumb: '/static/quantityTable.png',
						thumbSize: 'lg',
						to: '/pages/index/index'
					},
					{
						title: 'MMSE量表',
						note: '',
						thumb: '/static/quantityTable.png',
						thumbSize: 'lg',
						to: '/pages/test/test'
					},
					{
						title: 'MoCA量表',
						note: '',
						thumb: '/static/quantityTable.png',
						thumbSize: 'lg',
						to: '/pages/test/test'
					},
				]

			}
		},
		computed: {

		},
		created() {

		},
		mounted() {
			this.getSafeAreaInsets()
		},
		methods: {
			getSafeAreaInsets() {
				// 获取屏幕边界到安全区域距离
				const systemInfo = uni.getSystemInfoSync()
				this.safeAreaInsets = systemInfo.safeAreaInsets
			},

		}
	};
</script>

<style scoped lang="scss">
	Page {
		font-size: 14px;
	}

	.navbar {
		background-image: url(@/static/navigator_bg.png);
		background-size: cover;
		position: relative;
		display: flex;
		flex-direction: column;
		padding-top: 32px;
		padding-bottom: 28rpx;
		justify-content: center;
		align-items: center;
	}

	.navtext {
		color: white;
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