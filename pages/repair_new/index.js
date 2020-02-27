import { formatTime } from '../../utils/date.js';
import { httpGet, httpPost } from '../../request/index.js';
import { readFile } from '../../utils/asyncWx.js';
import regeneratorRuntime from '../../libs/runtime/runtime';

let globalData = getApp().globalData;
//Page Object
Page({
    data: {
        bm: globalData.bm,
        bmname: globalData.bmname,
        bxr: globalData.personid,
        bxsqrxm: globalData.displayName,
        bxsqrdh: globalData.mobile,
        wtly: '1001',
        wtly_name: '报修申请',
        bxlx: '1001',
        bxlx_name: '工程管理',
        siteid: globalData.siteid,
        bxsj: formatTime(new Date()),
        assetname: '',
        assetnum: '',
        locationname: '',
        location: '',
        zyjxt: '',
        wtxx: '',
        fwsqyxj: '1001', //优先级阈值
        fwsqyxj_desc: '低',
        fileList: [],
        showPop: false,
        yxj_arr: [],
        bxlx_arr: [],
        options: '',
        zyjxt_arr: [{
                id: 0,
                description: '电梯系统'
            },
            {
                id: 1,
                description: '供配电系统'
            },
            {
                id: 2,
                description: '照明系统'
            },
            {
                id: 3,
                description: '监控系统'
            },
            {
                id: 4,
                description: '电子巡更系统'
            },
            {
                id: 5,
                description: 'BA系统'
            },
            {
                id: 6,
                description: '停车场管理系统'
            },
            {
                id: 7,
                description: '停车场导引系统'
            },
            {
                id: 8,
                description: '背景音乐系统'
            },
            {
                id: 9,
                description: '门禁系统'
            },
            {
                id: 10,
                description: '信息发布系统'
            },
            {
                id: 11,
                description: '报警系统'
            },
            {
                id: 12,
                description: '消防水系统'
            },
            {
                id: 13,
                description: '消防电系统'
            },
            {
                id: 14,
                description: '防排烟系统'
            },
            {
                id: 15,
                description: '空调系统'
            }
        ],
        asset_arr: [],
        searchValue: '',
        location_arr: [],
        photoList: [],
        isIphoneX: globalData.isIphoneX
    },
    //options(Object)
    onLoad: function(options) {

    },
    onReady: function() {

    },
    onShow: function() {},
    onBlur(event) {
        this.setData({
            wtxx: event.detail.value
        })
    },
    afterRead(event) {
        const { file } = event.detail;
        let files = [];
        let photoList = [];
        file.forEach(element => {
            files.push({
                url: element.path,
                name: Date.now()
            })
            readFile(element.path).then(function(rs) {
                photoList.push({
                    ownertable: 'SR',
                    imgcode: rs,
                    filename: globalData.personid + new Date().getTime()
                });
            })
        });
        this.setData({
            fileList: [...this.data.fileList, ...files],
            photoList
        })
    },
    deleteFile(event) {
        const index = event.detail.index;
        console.debug(index);
    },
    handleScanCallback(event) {
        console.debug(event);
    },
    async handleTap(e) {
        const option = e.target.dataset.options;
        try {
            if (option === 'yxj') {
                let result = await httpGet(true, {
                    url: 'basedata/alndomain/FWYXJ'
                });
                result = result.data;
                const yxj_arr = result.map((key) => {
                    return {
                        description: key.description,
                        value: key.value
                    }
                });
                this.setData({
                    showPop: true,
                    yxj_arr: yxj_arr,
                    option
                })
            } else if (option === 'bxlx') {
                let result = await httpGet(true, {
                    url: 'basedata/alndomain/BXLX'
                });
                result = result.data;
                const bxlx_arr = result.map((key) => {
                    return {
                        description: key.description,
                        value: key.value
                    }
                });
                this.setData({
                    showPop: true,
                    bxlx_arr: bxlx_arr,
                    option
                })
            } else if (option === 'zyjxt') {
                this.setData({
                    showPop: true,
                    option
                })
            } else if (option === 'asset') {
                let result = await httpGet(true, {
                    url: 'basedata/asset',
                    data: { siteid: globalData.siteid }
                });
                result = result.data;
                const asset_arr = result.map((key) => {
                    return {
                        description: key.sbjc,
                        value: key.assetnum
                    }
                });
                this.setData({
                    showPop: true,
                    option,
                    asset_arr
                })
            } else if (option === 'location') {
                let result = await httpGet(true, {
                    url: 'basedata/locations',
                    data: { siteid: globalData.siteid }
                });
                result = result.data;
                const location_arr = result.map((key) => {
                    return {
                        description: key.description,
                        value: key.location
                    }
                });
                this.setData({
                    showPop: true,
                    option,
                    location_arr
                })
            }
        } catch (error) {
            console.debug(error);
        }
    },
    onClose() {
        this.setData({
            showPop: false
        })
    },
    handleYxjItemClick(e) {
        const index = e.target.dataset.index;
        this.setData({
            showPop: false,
            fwsqyxj: this.data.yxj_arr[index].value,
            fwsqyxj_desc: this.data.yxj_arr[index].description
        })
    },
    handleBxlxItemClick(e) {
        const index = e.target.dataset.index;
        this.setData({
            showPop: false,
            bxlx: this.data.bxlx_arr[index].value,
            bxlx_name: this.data.bxlx_arr[index].description
        })
    },
    handleZyjxtItemClick(e) {
        const index = e.target.dataset.index;
        this.setData({
            showPop: false,
            zyjxt: this.data.zyjxt_arr[index].description
        })
    },
    handleAssetItemClick(e) {
        const index = e.target.dataset.index;
        if (this.data.option === 'asset') {
            this.setData({
                showPop: false,
                assetnum: this.data.asset_arr[index].value,
                assetname: this.data.asset_arr[index].description
            })
        } else {
            this.setData({
                showPop: false,
                location: this.data.location_arr[index].value,
                locationname: this.data.location_arr[index].description
            })
        }
    },
    async commit() {
        const result = await httpPost({
            url: 'repair/sysnSr',
            data: this.data
        });
        console.debug(result);
    }
});