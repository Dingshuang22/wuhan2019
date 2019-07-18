// pages/my/my.js
import {ajax} from "../../utils/index.js";
function getRandomColor () {
  let rgb = []
  for (let i = 0 ; i < 3; ++i){
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

let timer = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:true,
    current:0,
    banner:[],
    poster:"http://106.15.237.125/base/imgs/mv2.jpg",
    name:"journey",
    author:"DDS",
    src:"http://106.15.237.125/base/music/journey.mp3",
    vsrc:"http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
    danmuList: [

      {
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 3
    }],
    word:"真好看"
  },
  videoplay(){
    console.log("play")
    if(!wx.getStorageSync("play")){
      this.showWarning()
    }
  },
  videoupdate(){
    console.log("继续播放...")
    if(!wx.getStorageSync("play")&&this.data.toggle){
      this.showWarning();
      this.setData({
        toggle:!this.data.toggle
      })
    }
  },
  showWarning(){
    console.log(111);
    console.log(this.videoContext);
    this.videoContext.pause();
    // 不是wifi
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
          });
          wx.setStorageSync("play",true);
          setTimeout(()=>{
            this.videoContext.play();
            this.setData({
              toggle:true
            })
          },10)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  getWord(e){
    console.log(e.detail.value);
    this.setData({
      word:e.detail.value
    })
  },
  
  bindSendDanmu(){
    this.videoContext.sendDanmu({
      text: this.data.word,
      color: getRandomColor()
    })
    this.setData({
      word:''
    })
  },
  bindButtonTap(){
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front','back'],
      success: function(res) {
        that.setData({
          vsrc: res.tempFilePath
        })
      }
    })
  },
  audioPlay(){
    this.audioCtx.play();
  },
  audioPause(){
    this.audioCtx.pause();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    timer = setInterval(()=>{
      if(this.data.current<100){
        this.setData({
          current:++this.data.current
         
        })
      }else{
        clearInterval(timer);
        this.setData({
          show:!this.data.show,
          current:0
        })
        wx.showToast({
          title:"加载成功...",
        })
      }
    },10)
    this.getBanner();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady:function () {
    this.audioCtx = wx.createAudioContext('myAudio');
    this.videoContext = wx.createVideoContext('myVideo');

    wx.getNetworkType({
      success (res) {
        const networkType = res.networkType
        console.log(networkType);
        if(networkType == "wifi"){  
          wx.setStorageSync("play",true)
        }else{
          wx.setStorageSync("play",false)
        }
      }
    })

    wx.onNetworkStatusChange(function (res) {
      // console.log(res.isConnected);
      // console.log(res.networkType);
      const networkType = res.networkType;
      console.log(networkType);
      if(networkType == "wifi"){  
        wx.setStorageSync("play",true)
      }else{
        wx.setStorageSync("play",false)
      }
    })
  },
  getBanner(){
    wx.request({
      url:"http://106.15.237.125:2019/react/getGoods",
      data:{
        limit:6
      },
      success:(res)=>{
        console.log(res);
        this.setData({
          banner:res.data.result
        })
      }
    })
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

  }
})