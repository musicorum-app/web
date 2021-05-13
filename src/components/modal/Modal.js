import React, {useEffect} from "react"
import ReactModal from "react-modal"
import { elevationOne, elevationOneStroke } from "../../config/colors"

ReactModal.setAppElement("#___gatsby")

const style = {
  overlay: {
    background: "rgba(0, 0, 0, .4)",
    display: "flex",
    justifyContent: "center"
  },
  content: {
    background: "rgba(0, 0, 0, 0.6)",
    border: `2px solid ${elevationOneStroke}`,
    borderRadius: "0.375rem",
    boxShadow: "5px 5px 22px rgba(0, 0, 0, 0.8)",
    transition: "background .4s",
    height: "fit-content",
    maxWidth: 620,
    margin: "auto",
    inset: 30
  }
}

export default function Modal({ children, ...others }) {
  const show = others.isOpen
  useEffect(() => {
    if (show) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
  }, [show ]);

  return <ReactModal
    closeTimeoutMS={180}
    style={style}
    {...others}
  >
    {children}
  </ReactModal>
}