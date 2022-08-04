import './ButtonPrimary.css'
function ButtonPrimary(probs){
    return <div onClick={probs.onClick} className={probs.className + ' font-header btn-primary'}>{probs.children}</div>
}
export default ButtonPrimary