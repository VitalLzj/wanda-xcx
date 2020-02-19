import { chooseImage } from '../../utils/asyncWx.js';
import regeneratorRuntime from '../../libs/runtime/runtime';

//Page Object
Page({
    data: {
        filePath: [],
        btn_text: '开始录音'
    },
    //options(Object)
    onLoad: function(options) {

    },
    onReady: function() {

    },
    onShow: function() {

    },
    onHide: function() {

    },
    onUnload: function() {

    },
    onPullDownRefresh: function() {

    },
    onReachBottom: function() {

    },
    onShareAppMessage: function() {

    },
    onPageScroll: function() {

    },
    async handleImageSelect() {
        const result = await chooseImage({ count: 5 - this.data.filePath.length });
        //图片转base64
        // var fileManager = wx.getFileSystemManager();
        // const base64 = fileManager.readFileSync(result[0], 'base64');
        // console.debug(base64);
        this.setData({
            filePath: [...this.data.filePath, ...result]
        });
    },
    handleImageDelete(e) {
        const index = e.detail.index;
        let filePath = this.data.filePath;
        filePath.splice(index, 1);
        this.setData({
            filePath
        });
    },
    handleScan(e) {
        const result = e.detail.result;
        console.debug(result);
    },
    handleSpeech(e) {
        console.debug(e);
    }
});