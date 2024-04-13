<template>
	<view>
		<navbar :quantityTable="quantityTable" showGoback="true" />

		<view>
			<form @submit="formSubmit" @reset="formReset">
				<view>基本信息</view>

				<view class="uni-form-item uni-column">
					<view class="title">{{name}}</view>
					<input class="uni-input" name="input" placeholder="请输入姓名" />
				</view>

				<!-- <view class="uni-form-item uni-column">
					<view class="title">switch</view>
					<view>
						<switch name="switch" />
					</view>
				</view> -->


				<view class="uni-form-item uni-column">
					<view class="title">{{sex}}</view>
					<radio-group name="sex">
						<label>
							<radio value="radio1" /><text>男</text>
						</label>
						<label>
							<radio value="radio2" /><text>女</text>
						</label>
					</radio-group>
				</view>

				<view class="uni-form-item uni-column">
					<view class="title">{{age}}</view>
					<input class="uni-input" name="input" placeholder="请输入年龄" />
				</view>

				<view class="uni-form-item uni-column">
					<view class="title">{{height}}</view>
					<input class="uni-input" name="input" placeholder="请输入身高" />
				</view>

				<view class="uni-form-item uni-column">
					<view class="title">{{weight}}</view>
					<input class="uni-input" name="input" placeholder="请输入体重" />
				</view>


				<view class="uni-form-item uni-column">
					<view class="title">{{city}}</view>
					<radio-group name="radio">
						<label>
							<radio value="radio" /><text>城市</text>
						</label>
						<label>
							<radio value="radio" /><text>农村</text>
						</label>
					</radio-group>
				</view>

				<view class="uni-form-item uni-column">
					<view class="title">{{career}}</view>
					<checkbox-group name="checkbox">
						<label>
							<checkbox value="checkbox1" /><text>家公务员</text>
						</label>
						<label>
							<checkbox value="checkbox2" /><text>专业技术人员</text>
						</label>
						<label>
							<checkbox value="checkbox3" /><text>农、林、牧、渔业人员</text>
						</label>
						<label>
							<checkbox value="checkbox4" /><text>社会生产和生活服务人员</text>
						</label>
						<label>
							<checkbox value="checkbox5" /><text>其他不便分类的从业人员</text>
						</label>
					</checkbox-group>
				</view>

				<view class="uni-form-item uni-column">
					<view class="title">{{drug}}</view>
					<!-- <radio-group name="radio">
						<label>
							<radio value="radio" /><text>是</text>
						</label>
						<label>
							<radio value="radio" /><text>否</text>
						</label>
					</radio-group> -->

					<radio-group v-model="radioValue">
						<radio value="是">是</radio>
						<radio value="否">否</radio>
					</radio-group>
					<input v-if="radioValue === '否'" />
				</view>

				<view class="uni-form-item uni-column">
					<view class="title">slider</view>
					<slider value="50" name="slider" show-value></slider>
				</view>

				<view class="uni-btn-v">
					<button form-type="submit">Submit</button>
					<button type="default" form-type="reset">Reset</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import navbar from '@/components/navbar/navbar.vue';
	
	export default {
		data() {
			return {
				safeAreaInsets: null,
				quantityTable: "阿尔兹海默病早期筛查及评估",
				name: "姓名：",
				sex: "性别：",
				age: "年龄：",
				height: "身高：",
				weight: "体重：",
				city: "长期居住地：",
				career: "职业：",
				drug: "毒药物接触史：",
				radioValue: '是',
				inputValue: '',
			}
		},
		mounted() {
			this.getSafeAreaInsets()
		},
		computed: {
			inputDisabled() {
				return this.radioValue === '是';
			},
		},
		methods: {
			getSafeAreaInsets() {
				// 获取屏幕边界到安全区域距离
				const systemInfo = uni.getSystemInfoSync()
				this.safeAreaInsets = systemInfo.safeAreaInsets
			},
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var formdata = e.detail.value
				uni.showModal({
					content: '表单数据内容：' + JSON.stringify(formdata),
					showCancel: false
				});
			},
			formReset: function(e) {
				console.log('清空数据')
			}
		}
	}
</script>

<style>
	.uni-form-item .title {
		padding: 20rpx 0;
	}
</style>