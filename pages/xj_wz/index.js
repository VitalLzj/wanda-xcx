import {
    httpGet
} from '../../request/index.js';
import regeneratorRuntime from '../../libs/runtime/runtime';
import {
    formatDateMi,
    parase
} from '../../utils/date.js';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchValue: '',
        wz_arr: [],
        wz_arr2: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const { id, description } = options;
        wx.setNavigationBarTitle({
            title: description
        });
        this.getData(id);
    },
    async getData(id) {
        const result = await httpGet(true, {
            url: 'xj/xjwz',
            data: { xjgzglid: id }
        });
        const data = result.data.map((item) => {
            return {
                xjgzglid: item.xjgzglid,
                location: item.location,
                xjlocationsid: item.xjlocationsid,
                wzmc: item.wzmc,
                sjkssj: formatDateMi(parase(item.sjkssj)),
                sjwcsj: formatDateMi(parase(item.sjwcsj)),
                ybassetsl: item.ybassetsl,
                assetsl: item.assetsl,
                ycsl: item.ycsl,
                status2: item.status2
            }
        });
        this.setData({
            wz_arr: data,
            wz_arr2: data
        })
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

    },
    onSearch(e) {
        const searchValue = e.detail;
        if (searchValue !== '') {
            const filter_result = this.data.wz_arr2.filter(function(item) {
                return item.wzmc.indexOf(searchValue) != -1;
            });
            this.setData({
                wz_arr: filter_result
            })
        } else {
            this.setData({
                wz_arr: this.data.wz_arr2
            })
        }
    },
    onItmeTap(e) {
        const index = e.currentTarget.dataset.index;
        const id = this.data.wz_arr[index].xjgzglid;
        const location = this.data.wz_arr[index].location;
        const description = this.data.wz_arr[index].wzmc;
        wx.navigateTo({
            url: '/pages/xj_sb/index?id=' + id + "&location=" + location + "&description=" + description
        });
    }
})