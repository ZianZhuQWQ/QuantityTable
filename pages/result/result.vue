<template>
	<view class="page-wrap">
		<navbar pageTitle="结果" :showGoback="false" />

		<uni-list class="content-wrap">
			<uni-list-item title="测评结果（按时间顺序）" />

			<!-- 真正的列表区域 -->
			<view class="result-list">
				<uni-list-item v-for="item in patients" :key="item.patient_id" :title="item.patient_name"
					:note="item.note" rightText="查看测评" thumb="/static/old.png" thumb-size="lg" showArrow clickable
					@click="onClick(item)" />
			</view>
		</uni-list>
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
				patients: [],
				timer: null, // 定时器对象
			}
		},
		created() {
			// 在组件创建时启动定时器
			this.timer = setInterval(() => {
				this.fetchData();
			}, 5000);
		},
		computed: {

			...mapState({
				nurse_id: state => state.nurse,
				// patient_id: state => state.patientInfoData.patient_id,

				// age: state => state.age,
			})
		},

		mounted() {
			this.fetchData();

			// this.getDataList();




		},

		methods: {
			fetchData() {
				uni.request({
					url: 'http://47.113.91.80:8002/quest/getPatientInfo',
					method: 'POST',
					dataType: 'json',
					data: {
						nurse_id: this.nurse_id,
					},

					success: res => { //如果获取到服务器
						// console.log(res.data)
						this.patients = res.data.patients
						// console.log('res.data.patients', res.data.patients)
						// console.log('this.patients', this.patients)



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
					}
				})
			},

			beforeDestroy() {
				// 在组件销毁之前清除定时器
				clearInterval(this.timer);
			},

			onClick(item) {
				console.log('item.patient_id', item.patient_id)

				console.log('item.patient_name', item.patient_name)
				uni.navigateTo({
					url: `/pages/result/test-history?userName=${item.patient_name}&userId=${item.patient_id}`
				});
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

		.content-wrap {
			flex: 1;
			overflow: hidden;
			display: flex;
			flex-direction: column;

			.result-list {
				flex: 1;
				overflow: auto;
			}
		}
	}
</style>