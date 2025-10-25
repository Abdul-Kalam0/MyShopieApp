export default function Toast({ toast, onClose }){
  if(!toast) return null
  return (
    <div className="position-fixed bottom-0 end-0 p-3" style={{zIndex: 1080}}>
      <div className={`toast align-items-center text-bg-${toast.variant||'primary'} show`}>
        <div className="d-flex">
          <div className="toast-body">{toast.message}</div>
          <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={onClose}></button>
        </div>
      </div>
    </div>
  )
}
