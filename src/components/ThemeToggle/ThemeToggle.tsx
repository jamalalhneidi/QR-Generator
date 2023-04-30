import React, {useEffect, useState} from 'react'
import {useTheme} from "next-themes";
import {MoonIcon, SunIcon} from "@heroicons/react/24/solid";

const ThemeToggle = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    const {systemTheme, theme, setTheme} = useTheme();
    const renderThemeChanger = () => {
        if (!mounted) return null;
        const currentTheme = theme === "system" ? systemTheme : theme;
        return currentTheme === 'dark' ?
            <SunIcon className="w-10 h-10 text-yellow-500 absolute right-8" role="button"
                     onClick={() => setTheme('light')}/>
            :
            <MoonIcon className="w-10 h-10 text-gray-900 absolute right-8" role="button"
                      onClick={() => setTheme('dark')}/>
    };
    return renderThemeChanger();
}

export default ThemeToggle