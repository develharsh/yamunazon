import { useContext } from "react";
import { DataContext } from "../store/GlobalState";
import Loading from './Loading';
import Toast from './Toast';

const Notify = () => {
    const { state, dispatch } = useContext(DataContext);
    const { notify } = state
    return (
        <>
            {notify.loading && <Loading />}
            {
                notify.fail &&
                <Toast
                    msg={{ msg: notify.fail, title: 'Oops, Sorry' }}
                    handleShow={() => dispatch({ type: 'NOTIFY', payload: {} })}
                    bgColor='bg-danger'
                />
            }
            {
                notify.success &&
                <Toast
                    msg={{ msg: notify.success, title: 'Great, Done' }}
                    handleShow={() => dispatch({ type: 'NOTIFY', payload: {} })}
                    bgColor='bg-success'
                />
            }
            {
                notify.info &&
                <Toast
                    msg={{ msg: notify.info, title: 'Hello' }}
                    handleShow={() => dispatch({ type: 'NOTIFY', payload: {} })}
                    bgColor='bg-primary'
                />
            }
        </>
    )
}

export default Notify