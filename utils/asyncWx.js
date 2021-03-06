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

/**
 * 扫码
 * 默认 二维码，只支持拍
 * 
 */
export const scanCode = () => {
    return new Promise((resolve, reject) => {
        wx.scanCode({
            onlyFromCamera: true,
            scanType: ['qrCode'],
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
 * 检测session
 */
export const checkSession = () => {
    return new Promise((resolve, reject) => {
        wx.checkSession({
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
 * 微信登陆
 */
export const login = () => {
    return new Promise((resolve, reject) => {
        wx.login({
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            }
        });
    })
}

const fileManager = wx.getFileSystemManager();
export const readFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fileManager.readFile({
            filePath: filePath,
            encoding: 'base64',
            success: (result) => {
                resolve(result.data);
            },
            fail: (err) => {
                reject(err);
            }
        });
    })
}