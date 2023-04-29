import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import gstyles from '@/styles/global.module.css';
import qrcode from '@/utils/qrcode/qrcode';
import {useEffect, useRef, useState} from 'react';
import InlineSVG from 'react-inlinesvg';
import {ArrowDownTrayIcon} from "@heroicons/react/24/outline";

export default function Home() {
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

            <div className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.input}>
                        <textarea
                            ref={textareaRef}
                            name='input'
                            placeholder={'Data to encode...'}
                            value={input}
                            onChange={OnInputChange}
                            onPaste={OnInputChange}/>
                        <div className={styles.inputActions}>
                            <button onClick={clearInput}>Clear</button>
                        </div>
                    </div>
                    <div className={styles.preview}>
                        <div className={styles.previewSkeleton}>
                            {input && <InlineSVG src={svg} width={200} height={200}/>}
                        </div>
                        <div className={styles.previewActions}>
                            <button className={gstyles.icon}
                                    onClick={() => downloadAsPng(qr.createDataURL(5))}>
                                <ArrowDownTrayIcon/>
                            </button>
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
