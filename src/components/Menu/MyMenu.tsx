import {Popover, Transition} from "@headlessui/react";
import {Fragment, MouseEventHandler, ReactNode} from "react";
import {useRef} from "react";

const MyMenu = ({label, children, disabled = false}: { label: ReactNode, children: ReactNode, disabled: boolean }) => {
    const timeoutDuration = 120;
    const triggerRef = useRef<Popover.Button>()
    const timeOutRef = useRef<NodeJS.Timeout>()
    const handleEnter = (isOpen: boolean) => {
        if (disabled) return;
        clearTimeout(timeOutRef.current)
        if (isOpen) return;
        triggerRef.current?.click()
        triggerRef.current?.blur();
    }
    const handleLeave = (isOpen: boolean) => {
        if (disabled) return;
        timeOutRef.current = setTimeout(() => {
            if (!isOpen) return;
            triggerRef.current?.click();
            triggerRef.current?.blur();
        }, timeoutDuration)
    }
    return (
        <Popover className='relative'>
            {({open}) => (
                <div className={'flex justify-center'}
                     onMouseEnter={() => handleEnter(open)}
                     onMouseLeave={() => handleLeave(open)}
                >
                    <Popover.Button ref={triggerRef}>
                        {label}
                    </Popover.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel
                            className="absolute left-1/2 z-50 mt-12 -translate-x-1/2 transform rounded bg-primary">
                            <ul className={'w-full my-2'}>
                                {children}
                            </ul>
                        </Popover.Panel>
                    </Transition>
                </div>
            )}
        </Popover>
    );
}
// eslint-disable-next-line react/display-name
MyMenu.Item = ({children, onClick}: {
    children: ReactNode,
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined
}) => (
    <li className={'w-full hover:bg-secondary'}>
        <button className={'py-2 w-full text-start px-4'} onClick={onClick}>{children}</button>
    </li>
)
export default MyMenu;