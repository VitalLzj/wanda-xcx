export const getSetting = () => {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success: (result) => {
                resolve(result);
            },
            fail: (err) => { reject(err); }
        });

    });
};


export const openSetting = () => {
    return new Promise((resolve, reject) => {
        wx.openSetting({
            success: (result) => {
                resolve(result);
            },
            fail: (err) => { reject(err); }
        });
    })
}

export const getUserInfo = () => {
    return new Promise((resolve, reject) => {
        wx.getUserInfo({
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            }
        });

    })
}

/**
 * 
 * @param {属性配置} options 
 * count:number 最大图片个数
 * sourceType:array 图片/拍摄
 */
export const chooseImage = (options) => {
    return new Promise((resolve, reject) => {
        wx.chooseImage({
            sizeType: ['original', 'compressed'],
            ...options,
            success: (result) => {
                resolve(result.tempFilePaths);
            },
            fail: (err) => {
                reject(err);
            }
        });

    })
}


/**
 * 
 * @param {*} options 
 */
export const showModal = (options) => {
    return new Promise((resolve, reject) => {
        wx.showModal({
            ...options,
            success: (result) => {
                if (result.confirm) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            },
            fail: (err) => { reject(err) }
        });

    })
}

/**
 * 
 * @param {这有啥用呢} optionssss dd
 */
export const previewImage = (options) => {
    return new Promise((resolve, reject) => {
        wx.previewImage({
            ...options,
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            }
        });
    })
}