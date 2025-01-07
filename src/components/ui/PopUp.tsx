import { createPortal } from "react-dom"
import React from "react"
import Button from "./Button"

type PopUpProps = {
  onClose: () => void
  children: React.ReactNode
}

const PopUp: React.FC<PopUpProps> = ({ onClose, children }) => {
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full relative">
        <Button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 bg-slate-500 hover:text-gray-700 hover:bg-slate-600 focus:outline-none"
          aria-label="Close"
        >
          &times;
        </Button>
        {children}
      </div>
    </div>,
    document.getElementById("root") as HTMLDivElement
  )
}

export default PopUp
