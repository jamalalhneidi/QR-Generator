import styles from './Header.module.css';
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";

const Header = () => {
    return (
        <div className={'fixed h-16 w-screen bg-primary'}>
            <div className={'flex h-full w-full items-center'}>
                <h2 className={'absolute left-8'}>QR Generator</h2>
                <ThemeToggle/>
            </div>
        </div>
    );
}

export default Header;