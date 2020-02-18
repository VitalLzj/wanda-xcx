let ajaxTimes = 0;
let app = getApp();
const baseUrl = app.globalData.schema + "://" + app.globalData.host + ":" + app.globalData.port + app.globalData.path;

export const httpGet = (params) => {
    wx.showLoading({
        title: "正在加载..."
    });
    ajaxTimes++;
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url: baseUrl + params.url,
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            },
            complete: () => {
                ajaxTimes--;
                if (ajaxTimes === 0) {
                    wx.hideLoading();
                }
            }
        });

    });
}

export const httpPost = (params) => {
    wx.showLoading({
        title: "正在上传..."
    });
    ajaxTimes++;
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url: baseUrl + params.url,
            method: 'POST',
            success: (result) => {
                resolve(result);
            },
            fail: (err) => { reject(err); },
            complete: () => {
                ajaxTimes--;
                if (ajaxTimes === 0) {
                    wx.hideLoading();
                }
            }
        });

    })

}

