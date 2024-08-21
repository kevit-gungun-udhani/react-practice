import { createPortal } from 'react-dom';
import {motion} from 'framer-motion';
import { AnimatePresence } from 'framer-motion';

export default function Modal({ title, children, onClose }) {
  return createPortal(
    <>
      <div className="backdrop" onClick={onClose} />
      <AnimatePresence>
        <motion.dialog 
          variants={{
            hidden: {opacity: 0, y: 30},
            visible: {opacity: 1, y: 0}  
          }}
          initial="hidden"
          animate="visible"
          exit="hidden"
          open 
          className="modal">
          <h2>{title}</h2>
          {children}
        </motion.dialog>
      </AnimatePresence>
    </>,
    document.getElementById('modal')
  );
}
