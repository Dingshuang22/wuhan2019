// pages/home/home.js

import {ajax} from "../../utils/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    word:"Are you ok?",
    msg:"daydayup",
    flag:!!0,
    id:2019,
    count:7788,
    imgUrl:"http://106.15.237.125/base/imgs/mv2.jpg",
    array:[
      {msg:"zuozuomu"},
      {msg:"DDS"},
      {msg:"leson"}
    ],
    num:[1,2,3,4,5,6,7,8,9],
    isLogin:false,
    users:{
      name:"lesson",
      age:18
    },
    like:{
      liker:"zuozuomu",
      count:2019
    },
    itemList:["拍照","从相册里查找图片"],
    actionData:{
      hidden:true,
      items:["护照","移民","签证"]
    },
    loginData:{
      isLogin:true,
      code:"",
      mobile:"13007189370"
    }
  },
  sendCode(){
    // 发送验证码
    wx.showLoading({
      title:"请求中..."
    })
    wx.request({
      url: 'http://106.15.237.125:2019/react/sendCode', //仅为示例，并非真实的接口地址
      method:"POST",
      data: {
        mobile:this.data.loginData.mobile
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data);
        wx.showToast({
          title: res.data.mag,
          icon: 'success',
          duration: 500
        })
      }
    })

  },
  getMobile(e){
    console.log(e.detail.value);
    this.setData({
      "loginData.mobile":e.detail.value
    })
  },
  getCode(e){
    console.log(e.detail.value);
    this.setData({
      "loginData.code":e.detail.value
    })
  },
  logincancel(){
    this.setData({
      "loginData.isLogin":false,
    })
  },
  autoLogin(){
    ajax({
      url:"http://106.15.237.125:2019/react/checkCode",
      method:"POST",
      data:{
        mobile:this.data.loginData.moble,
        code:this.data.loginData.code
      },
      cb:(res=>{
        console.log(res);
        if(!!res.data.type){
          wx.setStorageSync("isLogin",!!res.data.type);
        }else{
          wx.setStorageSync("isLogin",!!res.data.type);
        }
        // 不论登录是否成功，都改为隐藏
        this.setData({
          "loginData.isLogin":false,
        })
      })
    })
  },
  todoSome(e){
    console.log(e.target.dataset.idx);
    var idx = e.target.dataset.idx;
    wx.showToast({
      title: `${this.data.actionData.items[idx]} success`,
      icon: 'success',
      duration: 500
    })
  },
  actioncancel(){
    this.setData({
      "actionData.hidden":true
    })
    wx.showToast({
      title: "取消成功",
      icon: 'success',
      duration: 500
    })
  },
  openMyAction(){
    this.setData({
      "actionData.hidden":false
    })
  },
  openModal(){
    wx.showModal({
      title: '警告',
      content: '你正在使用4G流量观看视频...',
      cancelText:"暂停播放",
      cancelColor:"#000",
      confirmText:"继续播放",
      confirmColor:"#576B95",
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          wx.showToast({
            title: '土豪请继续...',
            icon: 'success',
            duration: 500
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  openAction(){
    wx.showActionSheet({
      itemList: this.data.itemList,
      success(res) {
        console.log(res.tapIndex)
      },
      fail(res) {
        console.log(res.errMsg)
      }
    }) 
  },
  childone(){
    console.log("不会阻止事件冒泡哦...");
  },
  childtwo() {
    console.log("一定会阻止事件冒泡哦...");
  },
  parent() {
    console.log("父组件的传递事件...");
  },
  changeInput(e){
    console.log(e.detail.value);
  },
  tapMe(e){
    console.log(e.target.dataset.msg)
  },
  countAdd(){
    this.setData({
      count:++this.data.count
    })
  },
  changeFlag(){
    this.setData({
      flag:!this.data.flag
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        loginData:{

          isLogin:!wx.getStorageSync("isLogin")
        }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title:"轻松购欢迎你来购买",
      url:"pages/home/home"
    }
  }
})