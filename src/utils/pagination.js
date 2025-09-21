
 const  pagination=({page=1,size=2})=>{

    if(page<1) page=1
    if(size<1) size=2
    const skip=(page-1)*size
    return {skip,limit:size}
}
export default pagination