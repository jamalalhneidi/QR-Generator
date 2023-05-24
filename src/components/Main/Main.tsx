import {useEffect, useRef, useState} from "react";
import Head from "next/head";
import InlineSVG from "react-inlinesvg";
import MyMenu from "@/components/Menu/MyMenu";
import {ArrowDownTrayIcon} from "@heroicons/react/24/outline";
import qrcode from "@/utils/qrcode/qrcode";
import Button from "@/components/Button/Button";

const Main = () => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [input, setInput] = useState('');
    const qr = generate(input);
    const svg = qr.createSvgTag();
    const OnInputChange = (e) => {
        setInput(e.target.value);
    };
    const clearInput = () => {
        setInput('');
        textareaRef.current?.focus();
    };
    // TODO dropdown menu to download as {svg,png}
    const downloadAsSvg = () => {
        const svgBlob = new Blob([svg], {type: "image/svg+xml;charset=utf-8"});
        const svgUrl = URL.createObjectURL(svgBlob);
        const downloadLink = document.createElement("a");
        downloadLink.href = svgUrl;
        downloadLink.download = `qr-code.svg`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
    const downloadAsPng = (base64Data: string) => {
        const downloadLink = document.createElement("a");
        downloadLink.href = base64Data;
        downloadLink.download = `qr-code.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
    useEffect(() => {
        textareaRef.current?.focus();
    }, []);
    return (
        <>
            <Head>
                <title>QR Code Generator</title>
            </Head>
            <div className='flex h-screen w-screen items-center justify-center dark:bg-gray-800'>
                <div className='flex'>
                    <div className='flex flex-col items-center justify-center'>
                        <textarea
                            className='resize-none border-2 p-1 h-[200px] w-[400px] dark:placeholder-gray-300 dark:bg-gray-500 dark:text-gray-100'
                            ref={textareaRef}
                            name='input'
                            placeholder={'Data to encode...'}
                            value={input}
                            onChange={OnInputChange}
                            onPaste={OnInputChange}/>
                        <Button className={'mt-4'} onClick={clearInput}>Clear</Button>
                    </div>
                    <div className={`ml-8 flex flex-col`}>
                        <div className='bg-white border-4 box-content w-[200px] h-[200px]'>
                            {input && <InlineSVG src={svg} width={200} height={200}/>}
                        </div>
                        <div
                            className={`mt-4 flex items-center justify-center dark:text-gray-100`}>
                            <MyMenu
                                disabled={!input}
                                label={
                                    <ArrowDownTrayIcon
                                        className={`w-[24px] h-[24px]`}/>
                                }>
                                <MyMenu.Item onClick={() => downloadAsPng(qr.createDataURL(5))}>PNG</MyMenu.Item>
                                <MyMenu.Item
                                    onClick={() => downloadAsSvg()}>SVG</MyMenu.Item>
                            </MyMenu>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const generate = (text: string) => {
    const qr = qrcode(0, 'M');
    qr.addData(text);
    qr.make();
    return qr;
};

export default Main;