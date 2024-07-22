import { forwardRef } from "react";
const Input = forwardRef( function Input({isTextArea, label, ...props}, ref){
    const textInputClass = 'w-full p-1 border-b-2 rounded border-tone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600';

    return (
        <p className=" flex flex-col gap-1 my-4">
            <label className=" text-sm font-bold uppercase text-stone-500">{label}</label>
            {isTextArea ? <textarea className={textInputClass} {...props} ref={ref}/> : <input className={textInputClass} {...props} ref={ref} />}
        </p>
    )
})

export default Input;