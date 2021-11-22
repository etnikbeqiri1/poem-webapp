import React from 'react';

export default function CustomInput(props) {
    // return <div className={"p-2 sm:w-1/2 md:w-1/4 w-full"}>
    return <div className={"p-2 w-full"}>
        <input
            className="w-full bg-primary text-gray-500 hover:shadow-2xl capitalize focus:outline-none transition-all border-0 p-2 rounded-lg shadow-md" {...props}/>
    </div>
}