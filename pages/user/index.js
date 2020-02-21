import { httpGet, httpPost } from "../../request/index.js";
import regeneratorRuntime from '../../libs/runtime/runtime'
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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
        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            this.getTabBar().setData({
                selected: 4
            })
        }
        wx.getLocation({
            type: 'wgs84',
            altitude: false,
            success: (result) => {

            },
            fail: () => {},
            complete: () => {}
        });

    },

    openSetting() {
        wx.showModal({
            title: '提示',
            content: '授权了',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#3CC51F',
            success: (result) => {
                if (result.confirm) {
                    wx.openSetting({
                        success: (result) => {
                            console.debug("success");
                        },
                        fail: () => {},
                        complete: () => {}
                    });

                }
            },
            fail: () => {},
            complete: () => {}
        });

    },
    getUserInfo() {
        wx.checkSession({
            success: (result) => {
                //直接进去
                // wx.switchTab({
                //     url: '/pages/index/index'
                // });
                console.debug("sessionSuccess");
            },
            fail: () => {
                wx.login({
                    success: (result) => {
                        console.debug("loginSuccess");
                    }
                });

                //从新登陆
                // wx.login({
                //     success: (result) => {
                //         const code = result.code;
                //         httpGet(true, { url: 'login/' + code }).then(result => {
                //             console.debug(result);
                //         });
                //         console.debug(result);
                //         //判断用户是否授权
                //         // wx.getUserInfo({
                //         //     success: (result) => {
                //         //         console.debug(result);
                //         //     },
                //         //     fail: () => {
                //         //         //提示授权
                //         //         wx.showToast({
                //         //             title: '请授权'
                //         //         });

                //         //     },
                //         //     complete: () => {}
                //         // });

                //     },
                //     fail: (err) => { console.debug(err) },
                //     complete: () => {}
                // });

            },
            complete: () => {}
        });
    }
})