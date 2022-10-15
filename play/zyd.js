window.addEventListener('load', function () {
    // 搜索框
    var ipt = document.querySelector('.search').querySelector('input')
    ipt.addEventListener('focus', function () {
        if (ipt.value == '搜一搜') {
            ipt.value = ''
        }
    })
    ipt.addEventListener('blur', function () {
        if (ipt.value == '') {
            ipt.value = '搜一搜'
        }
    })

    // 轮播图
    var lbt = document.querySelector('.lbt')
    var ul = lbt.querySelector('ul')
    var ol = lbt.querySelector('ol')
    var ullist = ul.children.length
    var w = lbt.offsetWidth
    var anlt = document.querySelector('.anlt')
    var anrt = document.querySelector('.anrt')

    ul.style.width = (ullist + 1) * 100 + '%'
    // 给左右箭头按钮添加鼠标经过事件
    lbt.addEventListener('mouseover', function () {
        clearInterval(times)
    })
    // 给左右箭头按钮添加鼠标离开事件
    lbt.addEventListener('mouseout', function () {
        times = setInterval(function () {
            anrt.click()
        }, 2000)

    })


    // 动态创建相对应的小圆点
    for (var i = 0; i < ullist; i++) {
        var li = document.createElement('li')
        li.setAttribute('index', i)
        ol.appendChild(li)
        ol.children[i].addEventListener('click', function () {
            for (var j = 0; j < ol.children.length; j++) {
                ol.children[j].className = ''
            }
            this.className = 'bgfff'
            var index = this.getAttribute('index')
            num = index
            xyd = index
            zyd(ul, - w * index)
            console.log(w);
        })

    }
    ol.children[0].className = 'bgfff'

    var li = ul.children[0].cloneNode(true)
    ul.appendChild(li)

    var num = 0
    var xyd = 0
    var flag=true
    // 右侧箭头按钮
    anrt.addEventListener('click', function () {
        if (flag) {
            flag = false
            if (num == ul.children.length - 1) {
                num = 0
                ul.style.left = '0px'
            }
            num++
            zyd(ul, -w * num, function () {
                flag=true
            })
            xyd++
            if (xyd >= ol.children.length) {
                xyd = 0
            }
            yd()
       }
    })
    // 左侧箭头按钮
    anlt.addEventListener('click', function () {
        if (flag) {
            flag=false
            if (num == 0) {
                num = ul.children.length - 1
                ul.style.left = -num * w + 'px'
            }
            num--
            zyd(ul, -w * num, function () {
                flag=true
            })
            xyd--
            if (xyd < 0) {
                xyd = ol.children.length - 1
            }
            yd()
        }
    })


    // 排他思想选中小圆点
    function yd() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = ''
        }
        ol.children[xyd].className = 'bgfff'
    }

    var times = setInterval(function () {
        anrt.click()
    }, 2000)

    // 动画函数
    function zyd(obj, juli, callback) {
        clearInterval(obj.time)
        obj.time = setInterval(function () {
            var step = (juli - obj.offsetLeft) / 10
            step = step > 0 ? Math.ceil(step) : Math.floor(step)
            if (obj.offsetLeft == juli) {
                clearInterval(obj.time)
                callback && callback()
            }
            obj.style.left = obj.offsetLeft + step + 'px'
        }, 15)
    }
})
