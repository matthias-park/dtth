const path = {
    home() {
        return '/'
    },
    userShow(url: string) {
        return `/demonds/${url}`
    },
    shopShow() {
        return'/shop'
    }
}

export default path;