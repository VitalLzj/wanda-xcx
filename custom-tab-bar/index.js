let app = getApp();

Component({
    data: {
        selected: 0,
        color: "#bfbfbf",
        selectedColor: "#005bac",
        list: [{
            url: "/pages/index/index",
            icon: "/icons/home.png",
            selectedIconPath: "/icons/home_pressed.png",
            text: "首页"
        }, {
            url: "/pages/pending/index",
            icon: "/icons/pending.png",
            selectedIconPath: "/icons/pending_pressed.png",
            text: "待领"
        }, {
            url: "/pages/new/index",
            icon: "/icons/new.png",
            selectedIconPath: "/icons/new.png"
        }, {
            url: "/pages/todo/index",
            icon: "/icons/todo.png",
            selectedIconPath: "/icons/todo_pressed.png",
            text: "待办"
        }, {
            url: "/pages/user/index",
            icon: "/icons/user.png",
            selectedIconPath: "/icons/user_pressed.png",
            text: "个人"
        }],
        showModalStatus: false,
        new_list: [{
            id: 0,
            name: '大商业',
            imageUrl: '/icons/tabs5.png'
        },
        {
            id: 1,
            name: '慧云验收',
            imageUrl: '/icons/tabs6.png'
        },
        {
            id: 2,
            name: '大面积',
            imageUrl: '/icons/tabs8.png'
        },
        {
            id: 3,
            name: '问题台账',
            imageUrl: '/icons/tabs9.png'
        },
        {
            id: 4,
            name: '报修',
            imageUrl: '/icons/tabs5.png',
            url: '/pages/repair_new/index'
        },
        {
            id: 5,
            name: '工单',
            imageUrl: '/icons/tabs6.png'
        },
        {
            id: 6,
            name: '问题台账',
            imageUrl: '/icons/tabs8.png'
        }
        ],
        isIphoneX: app.globalData.isIphoneX
    },
    attached() { },
    methods: {
        onChange(event) {
            console.debug(event)
            if (event.detail === 2) {
                console.debug(this.data.showModalStatus);
                if (!this.data.showModalStatus) {
                    this.showModal();
                } else {
                    this.hideModal();
                }
            } else {
                this.setData({ active: event.detail });
                this.hideModal();
                wx.switchTab({
                    url: this.data.list[event.detail].url
                });
            }
        },
        init() {
            const page = getCurrentPages().pop();
            this.setData({
                active: this.data.list.findIndex(item => item.url === `/${page.route}`)
            });
        },
        //显示对话框
        showModal: function () {
            // 显示遮罩层
            var animation = wx.createAnimation({
                duration: 200,
                timingFunction: "linear",
                delay: 0
            })
            this.animation = animation
            animation.translateY(300).step()
            this.setData({
                animationData: animation.export(),
                showModalStatus: true
            })
            setTimeout(function () {
                animation.translateY(0).step()
                this.setData({
                    animationData: animation.export()
                })
            }.bind(this), 200)
        },
        //隐藏对话框
        hideModal: function () {
            // 隐藏遮罩层
            var animation = wx.createAnimation({
                duration: 200,
                timingFunction: "linear",
                delay: 0
            })
            this.animation = animation
            animation.translateY(300).step()
            this.setData({
                animationData: animation.export(),
            })
            setTimeout(function () {
                animation.translateY(0).step()
                this.setData({
                    animationData: animation.export(),
                    showModalStatus: false
                })
            }.bind(this), 200)
        },
        //新建
        handleNavClick(e) {
            const id = e.currentTarget.dataset.id;
            if (id === 4) {
                wx.navigateTo({
                    url: this.data.new_list[id].url
                });
            } else {
                wx.showToast({
                    title: '暂未开发',
                    icon: 'none'
                });
            }
        }
    }
})