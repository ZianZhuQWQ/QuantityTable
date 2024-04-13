<template>
	<view>
		<view class='pages'>
			<view class="navbar" :style="{ paddingTop: safeAreaInsets ? safeAreaInsets.top + 5 +'px' : '0' }">
			<text class="navtext">{{quantityTable}}</text>
			</view>
			
			<!-- 题目 -->
			<view class="question">
			<view class="question_order">{{ quantityTableType }}量表 2/3</view>
			<view class="question_content">
				<text>{{ question_content }}</text>
			</view>
			</view>
			
			<!-- 图片 -->
			<view class="images_box">
				<block v-for="(item, index) in imglist" :key="index">
				  <view class='img-box'>
					<image class='img' :src='item' mode='aspectFit'></image>
					<view class='img-delete' @click='imgDelete1' :data-delindex="index">
					    <image class='img' src='../../static/delect.png' ></image>  
					</view>
				  </view>
				</block>
				<view class='img-box' @click='addPic1' v-if="imglist.length<1">
					<image class='img' src='../../static/add_image.png'></image>  
				</view>
			</view>
			
			<view class="img_upload">
			<button @click='uploadimage'>上传</button>
			</view>
		</view>		
	</view>	
</template>

<script>
	import Upimg from './upimg.js';
	export default {
		data() {
			return {
				imglist:[],//选择图片后生成的临时地址数组
				imglist00:[],
				quantityTableType:"Mini-Cog",
				question_content:"画出钟表表盘：\n徒手画出11:10或8:20",
				safeAreaInsets: null,
				quantityTable:"HIS量表",
			}
		},
		
		onLoad() {	},
		
		mounted() {
		  this.getSafeAreaInsets()
		},
		
		methods: {	
			getSafeAreaInsets() {
			  // 获取屏幕边界到安全区域距离
			  const systemInfo = uni.getSystemInfoSync()
			  this.safeAreaInsets = systemInfo.safeAreaInsets
			},
			
			//*选择图片*//
			addPic1: async function() {
				let that = this				
				uni.chooseImage({
					count: 1,  // 最多可以选择的图片张数，默认9
					sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
					sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
				    success: function (res) {						
						if (that.imglist.length === 0) {
							that.imglist = res.tempFilePaths
						} else if (that.imglist.length < 1) {
							that.imglist = that.imglist.concat(res.tempFilePaths); //concat追加到数组
						}
					}
				})
			},
			
			//*显示选择后的图片*//
			imgbox: function (e) {				
			    this.imglist = e.detail.value
			},
			
			//* 删除已经选择的图片 *//
			imgDelete1: function (e) {				
				let index = e.currentTarget.dataset.delindex; //获取要删除的图片的下标，否则删除的永远是第一张 ,对应 <view class='img-delect' @click='imgDelete1' :data-delindex="index">
				this.imglist.splice(index, 1);			  	
			},
			
			//*上传图片*//
			uploadimage: function () {
				let app = getApp()
				let that = this
				let upimg = require("./upimg.js") //引用当前目录下的自定义函数
				console.log(11111111);	
				if (that.imglist.length != 0 ) { //数组不为空的时候才执行 				
					// upimg.uploadimg({ //********* 调用引入的upimg.js文件uploadimg函数 ************
					// 	url: app.globalData.url+'/imgup', //全局变量，后端接口地址
					// 	path: that.imglist, //选取图片的临时地址数组 
					// 	user: app.globalData.username, 
					// });
					
					upimg.uploadimg({ //********* 调用引入的upimg.js文件uploadimg函数 ************
						url: 'http://47.113.91.80:8002/file_upload1', //全局变量，后端接口地址
						path: that.imglist, //选取图片的临时地址数组 
						patient_name: 1, 
						patient_id: 1,
					});
					
					
					uni.showToast({  //显示对话框
						title: "上传中！",
						icon: 'loading',
						duration: 3000,
					});					
					setTimeout(function () { //延迟执行，目的是等待上一步的uploadimg函数执行完成赋值给全局变量后再执行下面的代码
						that.imglist = []  //清空选择的图片
					}, 1000); //延迟时间
				 
				} else {
					uni.showToast({
					  title: "请添加图片！",
					  icon: 'none',
					  duration: 1000,
					})
				}
				}
			},
			
			
		
	}
</script>

<style lang="less">
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
	
	.navtext{
		color: white;
	}
	.pages {
			box-sizing: border-box;
			// padding: 16rpx;
			width: 100vw;
			
			
				
			.question_order{
				font-weight: bold;
				margin-top: 14rpx;
				margin-bottom: 30rpx;
			}
			
			.question_content{
				font-weight: bold;
				font-size: 45rpx;
				text-align: center;
				justify-content: center;
				align-items: center;
				display: flex;
				box-sizing: border-box;
				padding: 8rpx;
				width: 100%;
				height:300rpx;
				background-color: #e7eaec;
				border-radius: 8px;
			}
			
			// 图片区域
			.images_box {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				.img-box {
					// width: calc((100vw - 48px) / 3);
					// height: calc((100vw - 48px) / 3);
					width: 400px;
					height: 300px;
					margin-top: 30rpx;
					margin-bottom: 30rpx;
					position: relative;
					// &.img-add-wrap {
					// 	background-color: #c7d6d2;
					// 	border-radius: 6px;
					// 	display: flex;
					// 	align-items: center;
					// 	justify-content: center;
					// 	.img-add {
					// 		width: 40%;
					// 		height: 40%;
					// 	}
					// }
					// &:nth-child(3n + 2) {
					// 	margin-left: 8px;
					// 	margin-right: 8px;
					// }
					// 图片本身
					.img-item {
						width: 100%;
						height: 100%;
						
						object-fit: contain;
					}
					.img {
						width: 100%;
						height: 100%;
						
						object-fit: contain;
					}
					.img-delete {
						width: 50rpx;
						height: 50rpx;
						position: absolute;
						top: 0;
						right: 0;
					}
				}
			}
					
			
			.img_upload {
			  display: flex;
			  justify-content: center;
			  align-items: center;
			}
					  
			// 按钮
			button {
				border: none;
				color: #ffffff;
				margin: 0;
				// margin-top: 20rpx;
				width: calc(100vw - 32px);
				background-color: #76EEC6;
				border-radius: 8px;
				
			}
		}

				
		

	
	
	
</style>

