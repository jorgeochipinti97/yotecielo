import { GetServerSideProps, NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { dbPedidos } from '../../database';
import { pedido } from '../../interfaces';
import Pedido from '../../Models/Pedido';

import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import { LayoutClient, Merquee } from '../../components'
import { capitalize } from '../../utils';
import { FullScreenLoading } from '../../components/FullScreenLoading';

interface Props {
    pedido: pedido
}


const PedidosPage: NextPage<Props> = ({ pedido }) => {
    const styles = {
        paperContainer: {
            minHeigth: '100vh',
            backgroundImage: `url(http://localhost:3000/bg.jpeg)`,
            backgroundRepeat: 'no-repeat'
        }
    };
    const [loading, setIsLoading] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            setIsLoading(true)
        }, 3000);

        return () => clearInterval(interval)
    }, []);

    return (
        <>
            <LayoutClient title='Yo te cielo'>
                {
                    !loading
                        ? <FullScreenLoading />
                        : <Box display='flex' justifyContent='center'>
                            <Box >
                                <Box sx={{ maxWidth: '100vw' }}>
                                    <Box display='flex' justifyContent='center'>
                                        <Merquee imagenes={pedido.images} />
                                    </Box>
                                    <Box style={styles.paperContainer} sx={{p:1}}>
                                        <Typography variant='h6' sx={{ fontFamily: 'Itim', color: 'black', textAlign: 'start', ml: 1 }}>
                                            {capitalize.capitalizarPrimeraLetraPalabras(pedido.name)}
                                        </Typography>
                                        <Typography sx={{ fontFamily: 'Itim', color: 'black', textAlign: 'justify' }}>
                                            {capitalize.capitalizarPrimeraLetraSolamente(pedido.message)}
                                        </Typography>
                                        <Typography sx={{ fontFamily: 'Itim', color: 'black', textAlign: 'end',  mr: 2 }}>
                                            {`${new Date(pedido.createdAt!).toLocaleDateString("es-ES", { year: 'numeric', month: 'long', day: 'numeric' })}`}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box display='flex' justifyContent='center'>
                                    <Image src='/foto.png' width={500} height={500} alt='foto' />
                                </Box>
                            </Box>
                        </Box>
                }
            </LayoutClient>
        </>
    )
}


export default PedidosPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {

    const { id = '' } = query;

    let pedido: pedido | null;

    pedido = await dbPedidos.getPedidoById(id.toString())

    if (!pedido && pedido != undefined) {
        return {
            redirect: {
                destination: '/create',
                permanent: false,
            }
        }
    }

    return {
        props: {
            pedido,
        }
    }
}