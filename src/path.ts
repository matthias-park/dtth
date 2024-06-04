const path = {
    home() {
        return '/'
    },
    demonShow(demonId: string) {
        return `/demonds/${demonId}`
    },
    shopShow() {
        return'/shop'
    }
}

export default path;