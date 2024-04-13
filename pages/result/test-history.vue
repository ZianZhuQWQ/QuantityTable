<template>
	<view class="page-wrap">
		<navbar :pageTitle=" '测评结果记录'" :showGoback="true" />

		<view class="content-wrap">
			<!-- 用户信息 -->
			<view class="user-info-wrap">
				<image class='avatar' src="/static/old.png" />
				<view class="user-name">
					<text>{{ userInfo.userName }}</text>
				</view>
			</view>


			<view class="patient-Time">
				<uni-list-item v-for="item in patientTime" :key="item.created_at" :title="item.created_at"
					rightText="查看测评" showArrow clickable @click="clickItem(item)" />
			</view>
		</view>
	</view>
</template>

<script>
	import navbar from '@/components/nav-bar.vue';
	import listItemRender from './list-item-render.vue';
	import {
		formatDateTime
	} from '@/common/api/moment.js';

	export default {
		components: {
			navbar,
			listItemRender
		},
		data() {
			return {
				// userInfo: {
				// 	userId: '',
				// 	userName: '',
				// 	avatar: ''
				// },
				isDetail: false,
				formData: {},
				userInfo: {
					userId: '',
					userName: ''
				},

				patientTime: [],
				created_time: ''

				// dataList: new Array(20).fill(0).map((item, index) => ({
				// 	createDate: Date.now() + index * 86400000
				// }))
			}
		},
		mounted() {
			this.fetchData();

		},
		watch: {
			isDetail: {
				deep: true,
				handler(newValue, oldValue) {
					if (!!newValue) this.getDetailData();
				}
			}
		},
		// onLoad(option) { // option为object类型，会序列化上个页面传递的参数
		// 	this.$set(this.userInfo, 'userId', option.userId)
		// },
		onLoad: function(option) { // option为object类型，会序列化上个页面传递的参数
			this.isDetail = Number(option.isDetail || 0);
			this.$set(this.userInfo, 'userId', option.userId)
			this.$set(this.userInfo, 'userName', option.userName)
			console.log('this.userInfo.userId', this.userInfo.userId)
		},
		methods: {
			fetchData() {
				uni.request({
					url: 'http://47.113.91.80:8002/quest/getPatientTime',
					method: 'POST',
					dataType: 'json',
					data: {
						// nurse_id: this.nurse_id,
						patient_id: this.userInfo.userId
					},

					success: res => { //如果获取到服务器
						console.log(res.data)
						this.patientTime = res.data.patients
						console.log('res.data.patients', res.data.patients)
						console.log('this.patients', this.patientTime)

						this.$store.commit('setPatientInfoData', this.patientTime);

						// this.created_time=new Date(this.patientTime.created_at)

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
				});
			},
			clickItem() {
				uni.navigateTo({
					url: `/pages/test-page-nav/test-page-nav?userId=${this.userInfo.userId}&isDetail=1`
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

		.content-wrap {
			flex: 1;
			overflow: auto;
			padding-top: 8px;

			// 用户信息
			.user-info-wrap {
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-bottom: 16px;

				.avatar {
					width: 60px;
					height: 60px;
				}

				.user-name {
					font-size: 16px;
					font-weight: 600;
				}
			}

			// 结果数据
			.data-list-wrap {}
		}
	}
</style>