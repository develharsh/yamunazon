const Toast = ({ msg, handleShow, bgColor }) => {
    const timer = () => {
        setTimeout(function () {
            handleShow()
        }, 3000)
    }
    timer()
    return (
        <div id='elementToast' className={`toast show position-fixed text-light ${bgColor}`}
            style={{ top: '5px', right: '5px', zIndex: 4, minWidth: '280px' }}
            role="alert" aria-live="assertive" aria-atomic="true">
            <div className={`toast-header ${bgColor} text-light`}>
                <strong className="mr-auto">{msg.title}</strong>
                <span style={{ margin: "0 auto" }}></span>
                <button type="button" className={`btn ${bgColor} ml-2 mb-1 close`} data-dismiss="toast" aria-label="Close" style={{ border: "none" }} onClick={handleShow}>
                    <span className='text-light' aria-hidden="true">X</span>
                </button>
            </div>
            <div className="toast-body">
                {msg.msg}
            </div>
        </div>
    )
}
export default Toast