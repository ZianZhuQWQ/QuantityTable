<template>
	<view class="page-wrap">
		<navbar pageTitle="结果详情" :showGoback="true" />

		<view class="content-wrap">
			<view class="user-info">
				<image class="avatar" :src="userInfo.avatar || '../../static/old.png'" />
				<view class="user-name">
					{{ userInfo.userName || '' }}
				</view>
			</view>

			<view class="content">
				<evaluateForm v-if="current == 1" class="detail-content-wrap" :isDetail="true" />
				<miniCog v-if="current == 2" class="detail-content-wrap" :isDetail="true" />

				<!-- 得分分析 -->
				<view class="score-analysis">
					{{'总得分：' + score + ' 分'}}
				</view>
			</view>

			<!-- 按钮区域 -->
			<view class="foot">
				<button class="btn" @click="switchPage('down')" v-if="current != 1">上一题</button>
				<button class="btn" @click="switchPage('up')" v-if="current != 5">下一题</button>
			</view>
		</view>
	</view>
</template>

<script>
	import navbar from '@/components/nav-bar.vue';
	import evaluateForm from '@/pages/test-page-nav/evaluate-form/evaluate-form.vue'
	import miniCog from '@/pages/test-page-nav/mini-cog/mini-cog.vue'

	export default {
		components: {
			navbar,
			evaluateForm,
			miniCog,
		},
		data() {
			return {
				safeAreaInsets: null,
				current: 1,
				score: 0,
				userInfo: {
					avatar: '',
					userName: ''
				}
			}
		},
		onLoad: function(option) { // option为object类型，会序列化上个页面传递的参数
			this.$set(this.userInfo, 'userName', option.username)
		},
		methods: {
			// 切换页面
			switchPage(type) {
				if (type == 'up') this.current += 1;
				else if (type == 'down') this.current -= 1;
			}
		}
	}
</script>

<style lang="scss">
	.page-wrap {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;

		.content-wrap {
			flex: 1;
			padding: 8px 12px;
			display: flex;
			flex-direction: column;
			overflow: hidden;

			.user-info {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: rgba(85, 255, 255, 0.5);
				border-radius: 12px;
				padding: 12px 0;
				margin-bottom: 12px;

				.avatar {
					height: 40px;
					width: 40px;
					margin-right: 12px;
				}
			}

			.content {
				flex: 1;
				overflow: auto;
				display: flex;
				flex-direction: column;

				.detail-content-wrap {
					width: 100%;
					flex: 1;
				}

				.score-analysis {
					
				}
			}

			// 按钮区域
			.foot {
				display: flex;
				justify-content: space-between;
				padding: 8px 12px;
				background-color: #ffffff;

				.btn {
					width: 46%;
					height: 40px;
					background-color: #5cd7aa;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #ffffff;
				}
			}
		}
	}
</style>