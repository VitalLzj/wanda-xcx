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
        themeColor: app.globalData.themeColor
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
            if (content.length > 0) {
                this.setData({
                    aqxj_arr: [...this.data.aqxj_arr, ...content]
                })
            } else {
                wx.showToast({
                    title: '么的了'
                });
            }
        } catch (error) {
            console.debug(error);
        } finally {
            wx.hideNavigationBarLoading();
            wx.stopPullDownRefresh();
            wx.setNavigationBarTitle({
                title: '待办'
            });
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        this.getTabBar().init();
    },
    onChange(event) {
        wx.showToast({
            title: `切换到标签 ${event.detail.name}`,
            icon: 'none'
        });
    },
    onBottom: function() {
        page++;
        this.getXjData();
    },
    onTop() {
        page = 0;
        this.setData({
            aqxj_arr: []
        });
        this.getXjData();
    },
    onSearch(e) {
        const searchValue = e.detail;
        if (searchValue !== '') {
            conditionslist.push({
                property: "description",
                operator: "contains",
                value: searchValue
            })
        } else {
            conditionslist.splice(1, 1);
        }
        page = 0;
        this.setData({
            aqxj_arr: []
        });
        this.getXjData();
    },
    onItmeTap(e) {
        const index = e.currentTarget.dataset.index;
        const id = this.data.aqxj_arr[index].xjgzglid;
        const description = this.data.aqxj_arr[index].description;
        wx.navigateTo({
            url: '/pages/xj_wz/index?id=' + id + "&description=" + description
        });

    }
})