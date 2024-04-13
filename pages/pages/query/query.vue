<template>
	<view class="Page">
		<input v-model="patient_id" type="text" placeholder="请输入ID" />
		<input v-model="patient_name" type="text" placeholder="请输入姓名" />
		<button @click="handleSubmit">查询</button>
		<view v-if="showResult">后端返回的quest_num值：{{ quest_num }}</view>




		<!-- 	
	<view>
	<radio-group>
	<label class="是">
	<radio value="yes">是</radio>
	</label>
	
	<label class="否">	</label>

	<radio value="no">否
	<input v-model="inputValue"  placeholder="具体" />
	</radio>
	
	</radio-group>
	</view> -->



		<view>
			<radio-group v-model="selct" @change="changes">
				<label class="是">
					<radio value="yes">是</radio>
				</label>

				<label class="否">
					<radio value="no">否</radio>

					<input v-model="inputValue" v-if="selct === 'no'" placeholder="具体" />

				</label>

			</radio-group>

		</view>





		<uni-card :isShadow="true" v-for="(item, index) in itemList" :key="index" :title="item.title"
			:sub-title="item.subtitle" mode="basic" @clickCard="handleCardClick">

			<view>
				<radio-group class="selct" v-model="select" @change="getValue">
					<label class="是">
						<radio value="yes">是</radio>
					</label>
					<label class="否">
						<radio value="no">否</radio>
					</label>
				</radio-group>


				<text>{{ index }}</text>

			</view>
		</uni-card>






	</view>
</template>

<script>
	export default {
		data() {
			return {
				patient_id: '',
				patient_name: '',
				quest_num: null,
				showResult: false,

				inputValue: '',
				selct: '',


				unconscious: '',




				itemList: [{
						title: '1、急性起病',
						subtitle: ''
					},
					{
						title: '2、阶梯式恶化',
						subtitle: '指疾病或痴呆发生后，病情停留在一个水平上，\n然后病情又加重，接着又停留在一个水平上，\n多见于多次梗塞时。'
					},
					{
						title: '3、波动性病程',
						subtitle: '指病情好转后又恶化的情况。'
					},
					{
						title: '4、夜间意识模糊',
						subtitle: ''
					},
					{
						title: '5、人格相对保持完整',
						subtitle: ''
					},
					{
						title: '6、情绪低落',
						subtitle: ''
					},
					{
						title: '7、身体诉述',
						subtitle: '指病人有任何躯体不适的诉述，如头痛、耳鸣、眩晕等。'
					},
					{
						title: '8、情感失禁',
						subtitle: '指情感的控制能力减弱，易哭、易笑、易怒，\n但情感的维持时间很短。'
					},
					{
						title: '9、有高血压或高血压史',
						subtitle: ''
					},
					{
						title: '10、中风史',
						subtitle: '包括“短暂性脑缺血发作。”'
					},
					{
						title: '11、动脉硬化',
						subtitle: '主要指冠状动脉、肾动脉、眼底动脉的硬化，ECG、\n眼底检查或脑血流图检查的证据等。'
					},
					{
						title: '12、局灶神经系统症状',
						subtitle: '指提示定位性的神经系症状。'
					},
					{
						title: '13、局灶神经系体征',
						subtitle: '指提示定位性的神经系体征。'
					},
				],
			};
		},


		methods: {

			changes(e) {


				// console.log(e.detail.value)
				this.selct = e.detail.value
				console.log('index', index)
			},

			getValue(e) {
				console.log(e.detail)
				console.log(e.detail.value)
				const unconscious = e.detail.value
				console.log('unconscious:', unconscious)


			},
			handleCardClick() {
				console.log(index)

			},









			handleSubmit() {
				// 构造请求数据
				const requestData = {
					patient_id: this.patient_id,
					patient_name: this.patient_name
				};

				// 发送POST请求
				uni.request({
					url: 'http://47.113.91.80:8002/quest_get', // 替换成实际的后端接口地址
					method: 'POST',
					data: requestData,
					success: (res) => {
						// 请求成功回调
						if (res.statusCode === 200 && res.data && res.data.quest_num) {
							this.quest_num = res.data.quest_num;
							this.showResult = true;
						}
					},
					fail: (err) => {
						// 请求失败回调
						console.error('请求失败', err);
					}
				});
			}
		}
	};
</script>

<style scoped>
	.Page {
		padding: 20px;
	}



	.radio-label {
		margin-right: 20px;
	}
</style>