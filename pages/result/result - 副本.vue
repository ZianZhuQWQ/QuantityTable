<template>
	<view class="pages">
		<view class="navbar" :style="{ paddingTop: safeAreaInsets ? safeAreaInsets.top + 5 +'px' : '0' }">
		<text class="navtext">{{quantityTable}}</text>
		</view>
	
		<uni-list>
		   <uni-list-item title="测评结果（按时间顺序）" />
		  <uni-list-item v-for="item in itemList" :key="item.title" :title="item.title" :note="item.note" :rightText="item.rightText" :thumb="item.thumb" :thumb-size="item.thumbSize" showArrow clickable @click="onClick" />
		</uni-list>
		

	</view>
	
</template>

<script>
export default {
  data() {
    return {
      safeAreaInsets: null,
	  quantityTable: "结果",
	  itemList: [
	    { title: '老人1', note: '列表描述信息', rightText: '查看结果', thumb: '/static/old.png', thumbSize: 'lg' },
	    { title: '老人2', note: '列表描述信息', rightText: '查看结果', thumb: '/static/old.png',thumbSize: 'lg' },
	    { title: '老人3', note: '列表描述信息', rightText: '查看结果', thumb: '/static/old.png',thumbSize: 'lg' },
	    { title: '老人4', note: '列表描述信息', rightText: '查看结果', thumb: '/static/old.png',thumbSize: 'lg' },
		{ title: '老人5', note: '列表描述信息', rightText: '查看结果', thumb: '/static/old.png', thumbSize: 'lg' },
		{ title: '老人6', note: '列表描述信息', rightText: '查看结果', thumb: '/static/old.png',thumbSize: 'lg' },
		{ title: '老人7', note: '列表描述信息', rightText: '查看结果', thumb: '/static/old.png',thumbSize: 'lg' },
		{ title: '老人8', note: '列表描述信息', rightText: '查看结果', thumb: '/static/old.png',thumbSize: 'lg' },
		{ title: '老人9', note: '列表描述信息', rightText: '查看结果', thumb: '/static/old.png',thumbSize: 'lg' },
		{ title: '老人10', note: '列表描述信息', rightText: '查看结果', thumb: '/static/old.png',thumbSize: 'lg' },
		{ title: '老人11', note: '列表描述信息', rightText: '查看结果', thumb: '/static/old.png', thumbSize: 'lg' },
		{ title: '老人12', note: '列表描述信息', rightText: '查看结果', thumb: '/static/old.png',thumbSize: 'lg' },
		{ title: '老人13', note: '列表描述信息', rightText: '查看结果', thumb: '/static/old.png',thumbSize: 'lg' },
		{ title: '老人14', note: '列表描述信息', rightText: '查看结果', thumb: '/static/old.png',thumbSize: 'lg' },
	  ]
    }
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
	onClick(e) {
		uni.showToast({
			title: '点击反馈'
		});
	}

  }
}
</script>







<style>
/* 自定义导航条 */
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
</style>