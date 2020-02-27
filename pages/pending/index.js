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
        }, ],
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
    onShow() {
        this.getTabBar().init();
        this.getPendingData(this.data.activeTab);
    },
    onTabCLick(e) {
        const index = e.detail.index;
        this.setData({ activeTab: index });
        this.getPendingData(index);
    },
    onPullDownRefresh: function() {
        this.getPendingData(this.data.activeTab);
        wx.stopPullDownRefresh();
    },
    async getPendingData(index) {
        wx.showNavigationBarLoading();
        try {
            const result = await httpGet(false, {
                url: 'xj/pending',
                data: {
                    personid: app.globalData.personid,
                    siteid: app.globalData.siteid,
                    appname: this.data.tabs[index].title,
                    desc: searchValue
                }
            });
            this.setData({
                xjData: result.data
            })
        } catch (error) {
            console.error(error);
        } finally {
            wx.hideNavigationBarLoading();
        }
    }

})