import { httpGet, httpPost } from "../../request/index.js";
import regeneratorRuntime from '../../libs/runtime/runtime'

let app = getApp();
let searchValue = '%%';

Page({
  data: {
    tabs: [{
      title: '巡检'
    }, {
      title: '维保'
    }, {
      title: '安全管理'
    }, {
      title: '交接班'
    }, {
      title: '供方维保'
    }, {
      title: '移交管理'
    },],
    activeTab: 0,
    themeColor: app.globalData.themeColor,
    child1: [{
      title: '安全巡检'
    }, {
      title: '安全维保'
    }, {
      title: '第三方检测'
    }],
    child2: [{
      title: '大商业'
    }, {
      title: '大面积'
    }, {
      title: '慧云验收'
    }],
    child1ActiveTab: 0,
    child2ActiveTab: 0,
    xjData: []
  },

  onLoad() {
  },

  onTabCLick(e) {
    const index = e.detail.index;
    this.setData({ activeTab: index });
    this.getPendingData(index);
  },

  onChange(e) {
    const index = e.detail.index
    this.setData({ activeTab: index })
  },

  handleChildClick(e) {
    const index = e.detail.index;
    const title = e.currentTarget.dataset.title;
    if (title === '安全管理') {
      this.setData({ child1ActiveTab: index })
    } else if (title === '移交管理') {
      this.setData({ child2ActiveTab: index })
    }
  },
  async getPendingData(index) {
    try {
      const result = await httpGet({
        url: 'xj/pending',
        data: {
          personid: app.globalData.personid,
          siteid: app.globalData.siteid,
          appname: this.data.tabs[index].title,
          desc: searchValue
        }
      });
      this.setData({
        xjData: [...this.data.xjData, ...result.data]
      })
    } catch (error) {
      console.error(error);
    }
  }

})
