import React from "react";

const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button{...props}
               className={`bg-primary p-2 rounded ${props.className} ${props.disabled && 'bg-primary-dark cursor-not-allowed'} hover:bg-opacity-80 disabled:hover:bg-opacity-100`}>
        </button>
    );
}

export default Button;