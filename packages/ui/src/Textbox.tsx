"use client";
import React from 'react'

const Textbox = ({
    label,
    onchange, 
    placeholder,
} : {
    label : string,
    onchange : (value : any) => void,
    placeholder : string,
}) => {
  return (
    <div className="pt-2">
    <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
    <input onChange={(e) => onchange(e.target.value)} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} />
    </div>
  )
}

export default Textbox
