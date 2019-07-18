

export const ajax = ({url,method,data,cb})=>{
    wx.hideLoading();
    wx.showLoading({
        title:"请求中..."
    })
    wx.request({
        url:url, //仅为示例，并非真实的接口地址
        method:method,
        data:data,
        header: {
            'content-type': 'application/json' // 默认值
        },
        success (res) {
            console.log(res.data);
            cb(res);    
            wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 500
            })
        }
    })
}