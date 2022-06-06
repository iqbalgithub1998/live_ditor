import React from 'react'
type Props = {
    value:string,
    placeholder:string,
    enterValue: (e: any) => void
}
const Input :React.FC<Props> = ({value,placeholder,enterValue}) => {
  return (
    <>
        <input type="text" value={value} placeholder={placeholder} onChange={enterValue} className=" border bg-[#F1FAEE]  p-2 rounded-lg mb-4 w-full placeholder-slate-400 font-mono tracking-wide" />
    </>
  )
}

export default Input