import {
    httpGet
} from '../../request/index.js';
import regeneratorRuntime from '../../libs/runtime/runtime';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        activeNames: [],
        sb_arr: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const {
            id,
            location,
            description
        } = options;
        wx.setNavigationBarTitle({
            title: description
        });
        this.getData(id, location);
    },
    async getData(id, location) {
        const result = await httpGet(false, {
            url: 'xj/xjsb',
            data: {
                "xjgzglid": id,
                "location": location
            }
        });
        let activeNames = [];
        const data = result.data.map((item, index) => {
            activeNames.push(index);
            return {
                isshutdown: item.isshutdown,
                sbmc: item.sbmc,
                wzmc: item.wzmc,
                id: index,
                xjgzglbz: item.xjgzglbz.map((item) => {
                    return {
                        zt: item.zt,
                        xjxm: item.xjxm,
                        xjgzglbzid: item.xjgzglbzid
                    }
                })
            }
        });
        this.setData({
            sb_arr: data,
            activeNames
        });

    },
    onChange(event) {
        this.setData({
            activeNames: event.detail
        });
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
    onItemTap(e) {
        const { parentindex, index } = e.currentTarget.dataset;
        const xjgzglbzid = this.data.sb_arr[parentindex].xjgzglbz[index].xjgzglbzid;
        wx.navigateTo({
            url: '/pages/xj_bz/index?id=' + xjgzglbzid
        });
    }
})