const ajax = require('../utils/ajax')

export default {
    getNav () {
        var url = '/topic.json'
        return ajax({url: url})
    },
    getDetail () {
        var url = '/detail.json'
        return ajax({url: url})
    }
};