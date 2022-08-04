const CpuLogic = (probs)=>{
    const arr = [0,1,2,3,4,5,6,7,8].filter(x=>{
        return !probs.includes(x)
    })

    return arr[Math.trunc(Math.random()*arr.length)]
}
export default CpuLogic