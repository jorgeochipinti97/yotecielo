import { Box, Typography, capitalize } from '@mui/material'
import React from 'react'
import { SlideShow } from '../SlideShow'
import { FC } from 'react';
import { pedido } from '../../../interfaces';
import Image from 'next/image'
import { capitalizarPrimeraLetraSolamente } from '../../../utils/capitalize';

interface Props {
    pedido: pedido
}


export const CardPedido: FC<Props> = ({ pedido }) => {
    const styles = {
        paperContainer: {
            minHeigth: '100vh',
            backgroundImage: `url(https://yotecielo.vercel.app/bg.jpeg)`,
            backgroundRepeat: 'no-repeat'
        }
    };
    return (
        <>
            <div data-aos="fade-left">
                <SlideShow images={pedido.images} />
                <Box display='flex' justifyContent='center'>
                    <Box >
                            <Box sx={{ maxWidth: '100vw' }}>
                                <Box display='flex' justifyContent='center'>
                                </Box>
                                <Box style={styles.paperContainer} sx={{ p: 1 }}>
                                    <Typography variant='h6' sx={{ fontFamily: 'Itim', color: 'black', textAlign: 'start', ml: 1 }}>
                                        {capitalizarPrimeraLetraSolamente(pedido.name)}
                                    </Typography>
                                    <Typography sx={{ fontFamily: 'Itim', color: 'black', textAlign: 'justify' }}>
                                        {capitalizarPrimeraLetraSolamente(pedido.message)}
                                    </Typography>
                                    <Typography sx={{ fontFamily: 'Itim', color: 'black', textAlign: 'end', mr: 2 }}>
                                        {`${new Date(pedido.createdAt!).toLocaleDateString("es-ES", { year: 'numeric', month: 'long', day: 'numeric' })}`}
                                    </Typography>
                                </Box>
                            </Box>
                        <div data-aos="fade-left">
                            <Box display='flex' justifyContent='center'>
                                <Image src='/foto.png' width={500} height={500} alt='foto' />
                            </Box>
                        </div>
                    </Box>
                </Box>
            </div>
        </>
    )
}
