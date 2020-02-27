import {
  httpGet
} from '../../request/index.js';
import regeneratorRuntime from '../../libs/runtime/runtime';
import { previewImage } from '../../utils/asyncWx.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: [],
    photos: [{
      id: 0,
      url: 'https://img.yzcdn.cn/vant/cat.jpeg'
    }, {
      id: 1,
      url: 'https://img.yzcdn.cn/vant/cat.jpeg'
    }, {
      id: 2,
      url: 'https://img.yzcdn.cn/vant/cat.jpeg'
    }, {
      id: 3,
      url: 'https://img.yzcdn.cn/vant/cat.jpeg'
    }, {
      id: 4,
      url: 'https://img.yzcdn.cn/vant/cat.jpeg'
    }, {
      id: 5,
      url: 'https://img.yzcdn.cn/vant/cat.jpeg'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id } = options;
    this.getData(id);
  },
  async getData(id) {
    const result = await httpGet(true, {
      url: 'xj/xjxq',
      data: { "xjgzglbzid": id }
    })
    const data = result.data;
    this.setData({
      data
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
  onImgClick(e) {
    const { index } = e.currentTarget.dataset;
    var that = this;
    const urls = this.data.photos.map((item)=>{
      return item.url;
    })
    previewImage({
      current: that.data.photos[index].url,
      urls: urls
    });
  }
})