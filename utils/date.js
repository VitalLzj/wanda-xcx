const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatDateMi = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute].map(formatNumber).join(':')
}

const parase = (str) => {
    if (!str || typeof(str) != "string") {
        return str;
    }
    var dateParts = str.split(/[T\-:\.\+]/); // 只支持 yyyy-MM-ddTHH:mm:ss.sssZ 的格式
    var yyyy = parseInt(dateParts[0], 10);
    var MM = parseInt(dateParts[1], 10) - 1;
    var dd = parseInt(dateParts[2], 10);
    var HH = parseInt(dateParts[3], 10);
    var mm = parseInt(dateParts[4], 10);
    var ss = parseInt(dateParts[5], 10);
    var sss = parseInt(dateParts[6], 10);
    return new Date(yyyy, MM, dd, HH, mm, ss, sss);
}

const formatNewTime = n => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join(n) + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatDate = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    return year + '年' + month + '月' + day + '日';
}

const format_Date = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

const filePath = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    const openId = wx.getStorageSync('openId')

    return 'uploadImg/' + [year, month, day].map(formatNumber).join('/') + '/' + openId + '-' + [year, month, day, hour, minute, second].map(formatNumber).join('')
}


module.exports = {
    formatTime,
    formatNewTime,
    formatDate,
    formatNumber,
    filePath,
    parase,
    formatDateMi,
    format_Date
}