const imageUpload = async (media) => {
    const data = new FormData()
    data.append('file', media)
    data.append('upload_preset', process.env.CLOUD_UPDATE_PRESET)
    data.append('cloud_name', process.env.CLOUD_NAME)
    const res = await fetch(process.env.CLOUD_API,{
        method:"POST",
        body:data
    })
    const res2 = await res.json()
    //console.log(res2)
    return res2.url
}

export default imageUpload