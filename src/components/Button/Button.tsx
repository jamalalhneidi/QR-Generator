import React from "react";

const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button{...props} className={`bg-secondary text-primary p-2 rounded ${props.className}`}></button>
    );
}

export default Button;