//Component Object
Component({
    properties: {
        swiperClass: {
            type: Object,
            value: '',
        },
        swiperList: {
            type: Array,
            value: []
        }
    },
    data: {
        swiper: ''
    },
    methods: {

    },
    created: function() {},
    attached: function() {
        this.setData({
            swiper: 'width:100%;height: calc(100vw * ' + this.data.swiperClass.height + ' /' + this.data.swiperClass.width + ')'
        })
    },
    ready: function() {
    },
    moved: function() {
    },
    detached: function() {
    },
});