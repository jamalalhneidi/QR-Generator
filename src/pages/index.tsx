import {useTheme} from "next-themes";
import Main from "@/components/Main/Main";
import {useEffect} from "react";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";

export default function Home() {
    return (
        <>
            <ThemeToggle/>
            <Main/>
        </>
    )
}
