/*
* 对对象进行 深/浅 克隆函数
* @params
*   o Object: 需要进行克隆的对象
*   deep Boolean: 是否需要进行 深度 克隆
* @return
*   已经克隆的对象
* */
export function clone(o, deep) {
    if (typeof o !== "object" || o === null) return o;
    let newObj = new o.constructor();
    for (let key in o) {
        newObj[key] = deep ? clone(o[key], deep) : o[key];
    }
    return newObj;
}


/*
* 响应式函数
* @params
*   designWidth: 设计稿的宽度
*   designHeight: 设计稿的高度
* @return  Function PushEl
*   返回一个函数 该函数可以传入 需要进行比例转换的 元素 , 变换的原点
*      @params
*        el 需要比例转换的函数
*        origin 变换点
*      @return compute
*         执行该函数会立即触发一次转换
* */
export function screenResponder(designWidth = 1920, designHeight = 1080) {
    const els = []
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    const compute = () => {
        const ratioH = sizes.height / designHeight,
            ratioW = sizes.width / designWidth

        let scale = ratioH < ratioW ? ratioH : ratioW

        els.forEach(({el, origin}) => {
            el.style.transform = `scale(${scale})`

            el.style.transformOrigin = origin
        })
    }


    const onWindowResize = () => {
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight
        compute()
    }

    window.addEventListener('resize', onWindowResize)

    return function pushEl(el, origin = 'center') {
        els.push({el, origin})
        return compute
    }
}

/*
*  日期格式化 (ISO 8601 标准)
* @params
*   formatter: 格式化模板
*   date: 需要转换的日期对象
* @return String
*   格式化的日期字符串
* */
export function formatterDate(formatter = 'yyyy-MM-dd hh:mm:ss', date = new Date) {
    const formatterObj = {
        'y+': date.getFullYear(),
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    let res = formatter

    Object.keys(formatterObj).forEach(regKey => {
        res = res.replace(new RegExp(regKey), (...args) => {
            return fillZero(formatterObj[regKey].toString().substr(0, args[0].length), args[0].length)
        })
    })

    return res
}

const fillZero = (num = '', length = 0) => {
    let numStr = num.toString()
    return numStr.length < length ? '0'.repeat(length - numStr.length) + numStr : numStr
}

export const autoFillData = (target, data, length) => {
    // 超出预期
    if (target.length >= length) return clone(target, true)
    // 未满足预期长度, 填充 length - target.length 的长度为 data
    return new Array(length).fill().map((item, index) => index < target.length ? clone(target[index]) : clone(data))
}