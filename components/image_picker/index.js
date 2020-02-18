import { showModal, previewImage } from '../../utils/asyncWx.js';
import regeneratorRuntime from '../../libs/runtime/runtime';

// components/image_picker/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        filePath: {
            type: Array,
            value: []
        }
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
        selectImage() {
            this.triggerEvent('selectImage');
        },
        async deleteImage(e) {
            const index = e.currentTarget.dataset.index;
            const result = await showModal({
                content: '确定要删除么'
            });
            if (result) {
                this.triggerEvent('deleteImage', { index: index });
            }
        },
        async priviewImage(e) {
            const index = e.currentTarget.dataset.index;
            await previewImage({
                current: this.data.filePath[index],
                urls: this.data.filePath
            });
        }
    }
})