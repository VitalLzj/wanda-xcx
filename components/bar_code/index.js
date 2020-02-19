import { scanCode } from '../../utils/asyncWx.js';
import regeneratorRuntime from '../../libs/runtime/runtime';

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

    /**
     * 组件的方法列表
     */
    methods: {
        async handleScan() {
            let result = 0;
            try {
                result = await scanCode();
            } catch (error) {
                result = error.errMsg;
            }
            this.triggerEvent('scanCallback', { result: result });
        }
    }
})