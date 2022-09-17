import React, { FC } from 'react'
import Marquee from "react-fast-marquee";
import Image from 'next/image';
import { Box } from '@mui/material';
interface Props {
    imagenes: string[]
}


export const Merquee: FC<Props> = ({ imagenes }) => {
    return (
        <Marquee  gradientColor={[0, 0, 0]} gradientWidth={0} speed={100}>
            {imagenes.map(e => (
                <Box className='keen-slider__slide' key={e} display='flex' justifyContent='center'>
                    <Image src={e} width={600} height={700} alt={e} />
                </Box>
            ))}
        </Marquee>
    )
}
