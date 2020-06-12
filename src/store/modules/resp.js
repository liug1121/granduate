
export default{
    toCommonResult(response){
        let respData = response.data
        return {
            message:respData.message,
            data:respData.data
        }
    },
}
