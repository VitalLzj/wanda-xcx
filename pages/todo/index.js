import {
    httpGet
} from '../../request/index.js';
import regeneratorRuntime from '../../libs/runtime/runtime';
import {
    formatDateMi,
    format_Date,
    parase
} from '../../utils/date.js';

let app = getApp();
let page = 0;
let conditionslist = [{
    property: "siteid",
    operator: "=",
    value: app.globalData.siteid
}];

Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 0,
        searchValue: '',
        aqxj_arr: [],
        themeColor: app.globalData.themeColor,
        triggered: false
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getXjData();
    },
    async getXjData() {
        wx.showNavigationBarLoading();
        wx.setNavigationBarTitle({
            title: '加载中'
        });
        try {
            const result = await httpGet(false, {
                url: 'xj',
                data: {
                    page: page,
                    conditions: JSON.stringify(conditionslist)
                },
            });
            const content = result.data.content.map((item) => {
                return {
                    xjgzglid: item.xjgzglid,
                    description: item.description,
                    jhjsdate: format_Date(parase(item.jhjsdate)),
                    ybassetsl: item.ybassetsl,
                    assetsl: item.assetsl,
                    ycsl: item.ycsl,
                    // sjkssj: formatDateMi(parase(item.sjkssj)),
                    // sjwcsj: formatDateMi(parase(item.sjwcsj)),
                    sjkssj: item.sjkssj,
                    sjwcsj: item.sjwcsj,
                    status2: item.status2
                }
            })
            this.setData({
                aqxj_arr: content
            })
            page++;
        } catch (error) {
            console.debug(error);
        } finally {
            wx.hideNavigationBarLoading();
            wx.setNavigationBarTitle({
                title: '待办'
            });
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

        setTimeout(() => {
            this.setData({
                triggered: true,
            })
        }, 1000)
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            this.getTabBar().setData({
                selected: 3
            })
        }
    },
    onChange(event) {
        wx.showToast({
            title: `切换到标签 ${event.detail.name}`,
            icon: 'none'
        });
    },
    onPullDownRefresh: function() {
        console.debug("xiala。。。");
        page = 0;
        this.getXjData();
    },

    onPulling(e) {
        console.log('onPulling:', e)
    },

    onRefresh() {
        if (this._freshing) return
        this._freshing = true
        setTimeout(() => {
            this.setData({
                triggered: false,
            })
            this._freshing = false
        }, 3000)
    },

    onRestore(e) {
        console.log('onRestore:', e)
    },

    onAbort(e) {
        console.log('onAbort', e)
    },
})