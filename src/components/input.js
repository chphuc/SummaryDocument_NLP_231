import React from 'react'

const input = ({ value, onChnage, ...prop }) => {
    return (
        <input
            className="w-28 px-2 py-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            value={value}
            onChange={onChnage}
            {...prop}
        />
    )
}

export default input