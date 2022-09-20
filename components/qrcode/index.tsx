import React, { FC } from 'react';
import { useQRCode } from 'next-qrcode';


interface Props {
    url: string
}

export const Qrcode: FC<Props> = ({ url }) => {
    const { Canvas } = useQRCode();
    return (
        <Canvas
            text={url}
            options={{
                type: 'image/jpeg',
                quality: 0.3,
                level: 'Q',
                margin: 3,
                scale: 4,
                width: 200,
                color: {
                    dark: '#2596be',
                    light: '#FFFFFF',
                },
            }}
        />
    );
}
