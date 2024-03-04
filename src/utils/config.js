const config = {
    get() {
        return {
            url : process.env.VUE_APP_BASE_API_URL + process.env.VUE_APP_BASE_API + '/',
            name: process.env.VUE_APP_BASE_API,
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/cl99222176/client/index.html'
        }
    },
    getProjectName(){
        return {
            projectName: "线上点单+卡路里健康指导网站"
        } 
    }
}
export default config
