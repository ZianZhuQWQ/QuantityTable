<template>
	<view class="wrapper">
		<navbar :quantityTable="dynamicValue"/>
		
		 <uni-card
		      :isShadow="true"
		      v-for="(item, index) in itemList"
		      :key="index"
		      :title="item.title"
		      :sub-title="item.subtitle"
		      mode="basic"
			  @clickCard="handleCardClick">

		    <view>
				<radio-group class="selct" v-model="select" @change="handleRadioChange">
				  <label class="是">
					<radio value="yes">是</radio>
				  </label>
				  <label class="否">
					<radio value="no">否</radio>
				  </label>
				</radio-group>
			</view>
		</uni-card>
		
		
		
		
	</view>
</template>

<script>
	import navbar from '@/components/navbar/navbar.vue';
	
	export default {
		components: {
			navbar
		  },
		  
		data() {
			return {
				dynamicValue: "HIS量表",
				itemList: [
				        { title: '1、急性起病', subtitle: '' },
				        { title: '2、阶梯式恶化', subtitle: '指疾病或痴呆发生后，病情停留在一个水平上，\n然后病情又加重，接着又停留在一个水平上，\n多见于多次梗塞时。' },
				        { title: '3、波动性病程', subtitle: '指病情好转后又恶化的情况。' },
				        { title: '4、夜间意识模糊', subtitle: '' },
				        { title: '5、人格相对保持完整', subtitle: '' },
				        { title: '6、情绪低落', subtitle: '' },
				        { title: '7、身体诉述', subtitle: '指病人有任何躯体不适的诉述，如头痛、耳鸣、眩晕等。' },
				        { title: '8、情感失禁', subtitle: '指情感的控制能力减弱，易哭、易笑、易怒，\n但情感的维持时间很短。' },
				        { title: '9、有高血压或高血压史', subtitle: '' },
				        { title: '10、中风史', subtitle: '包括“短暂性脑缺血发作。”' },
				        { title: '11、动脉硬化', subtitle: '主要指冠状动脉、肾动脉、眼底动脉的硬化，ECG、\n眼底检查或脑血流图检查的证据等。' },
				        { title: '12、局灶神经系统症状', subtitle: '指提示定位性的神经系症状。' },
				        { title: '13、局灶神经系体征', subtitle: '指提示定位性的神经系体征。' },
				      ],
					  select:'',
				   //    radioValues: [],
					  // selectedValues: [], // 初始化一个空数组来存储每个radio-group的选中状态
				}
			},
			
		//   created() {  
		// 	// 在组件创建时，初始化selectedValues数组的长度与radiolist1相同，并将每个元素设置为空字符串  
		// 	this.selectedValues = this.itemList.map(() => '');  
		//   },  
		
			
		methods: {
		
			    
				handleRadioChange(event) {
					console.log('Selected option:', event);
					this.select= event.detail.value
					console.log(' select:', select);
					
					// console.log('Selected option:', event.detail);
				      // console.log('Selected option:', event.detail.value);
				 },
				    handleCardClick() {
				 console.log('Card clicked');
				    },
			    // getValue(item, index) {
			    //   // 获取当前radio的值
			    //   const radioValue = this.radioValues[index];
			      
			    //   // 更新radioValues数组中对应索引的值
			    //   this.$set(this.radioValues, index, radioValue);
			    // },
			    
			  
		}
	}
</script>

<style>
</style>