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
        console.debug("attached");
        this.setData({
            swiper: 'width:100%;height: calc(100vw * ' + this.data.swiperClass.height + ' /' + this.data.swiperClass.width + ')'
        })
        console.debug(this.data.swiper);
    },
    ready: function() {
        console.debug("ready");
    },
    moved: function() {
        console.debug("moved");
    },
    detached: function() {
        console.debug("detached");
    },
});