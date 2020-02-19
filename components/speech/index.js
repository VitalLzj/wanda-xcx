var plugin = requirePlugin("WechatSI")
let manager = plugin.getRecordRecognitionManager();
let isStart = false;

Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {

    },
    created: function() {
        let myThis = this;
        manager.onRecognize = function(res) {}
        manager.onStop = function(res) {
            isStart = false;
            wx.hideLoading();
            myThis.triggerEvent('recoderCallback', { code: 1, result: res.result });
        }
        manager.onError = function(res) {
            wx.hideLoading();
            isStart = false;
            //-30003这个代表没有听到话
            if (res.retcode !== -30003) {
                myThis.triggerEvent('recoderCallback', { code: res.retcode, res: res.msg });
            }
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        startRecoder() {
            if (isStart) {
                return;
            }
            isStart = !isStart;
            wx.showLoading({
                title: '识别中...',
                mask: true
            });
            manager.start({ duration: 30 * 1000, lang: "zh_CN" });
        },
        stopRecoder() {
            manager.stop();
        }
    }
})