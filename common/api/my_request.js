//访问服务端的根路径
const BASE_URL = '自己写自己的'

//对uniapp的请求进行全局封装，方便进行统一调用
export const myRequest = (options) => {
     // getStorageSync 获取token
	var token = uni.getStorageSync('student_access_token') || '';
	return new Promise((resolve,reject)=>{
		uni.showLoading({
		    title: '努力加载中'
		});
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'GET',//默认是get
			data: options.data || {},
			header: {'student_access_token': token},
			success: (res) => {			
				resolve(res.data)
			},
			fail: (err) => {
				uni.showToast({
					title: "请求接口失败"
				})
				reject(err)
			},
			complete: ()=> {
				uni.hideLoading();//隐藏 loading 提示框。
			}
		})
	})	
}
