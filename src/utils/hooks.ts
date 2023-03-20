import {MutableRefObject, useEffect} from "react";

export const useResizeTextarea = (text: string, ref: MutableRefObject<any>) => {
    useEffect(() => {
        if (!(ref?.current)) return;
        ref.current.style.height = 'auto';
        ref.current.style.height = ref.current.scrollHeight + 'px';
    }, [ref, text])
}
