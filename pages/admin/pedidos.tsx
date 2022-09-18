import { Box, Button, Card, CardMedia, Divider, Grid, IconButton, Input, InputAdornment, Typography } from '@mui/material'
import type { GetServerSideProps, NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'
import { LayoutAdmin } from '../../components'
import { dbPedidos } from '../../database'
import { pedido } from '../../interfaces'
import QrCodeIcon from '@mui/icons-material/QrCode';
import Image from 'next/image'
import { SearchOutlined } from '@mui/icons-material';
import QRcode from 'qrcode';
import EmentorsApi from '../../api/EmentorsApi';
import VerifiedIcon from '@mui/icons-material/Verified';
import { usePedidos } from '../../hooks'
import { FullScreenLoading } from '../../components/FullScreenLoading'




const PedidosAdminPage: NextPage = () => {
    const AnchorRef = useRef<HTMLAnchorElement>(null)
    const [qr_, setQr_] = useState<string>()
    const [transactionId__, setTransactionId__] = useState<string>()
    const [searchTerm, setSearchTerm] = useState<string>()
    const { pedidos, isLoading } = usePedidos('/pedidos')
    const [pedidos_, setPedidos_] = useState(pedidos)

    useEffect(() => {
        qr_ != undefined && download()
    }, [qr_])


    useEffect(() => {
        const newPedidos = searchTerm && pedidos_.filter(e => e.transactionId.includes(searchTerm))
        newPedidos && setPedidos_(newPedidos)

        searchTerm && searchTerm.length < 2 && setPedidos_(pedidos)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm])


    const createQR = async (pedido___: pedido) => {

        const newPedido: pedido = {
            _id: pedido___._id,
            name: pedido___.name,
            email: pedido___.email,
            transactionId: pedido___.transactionId,
            message: pedido___.message,
            images: pedido___.images,
            isQrDownload: true,
            createdAt: pedido___.createdAt,
            updatedAt: pedido___.updatedAt
        }

        try {
            await EmentorsApi.put('/pedidos', newPedido)
            const url = await QRcode.toDataURL(`https://yotecielo.vercel.app/pedidos/${pedido___.transactionId}`)
            setQr_(url)
            setTransactionId__(pedido___.transactionId)
        } catch (err) {
            console.log(err)
        }
    }

    const download = () => {
        AnchorRef.current?.click()

    }

    return (
        <>
            <LayoutAdmin title='Admin - Pedidos'>
                <Box display='flex' justifyContent='center' sx={{ mt: 3 }}>
                    <Input
                        type='text'
                        placeholder="Número de pedido..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                >
                                    <SearchOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </Box>


                <Grid container spacing={2} sx={{ justifyContent: { xs: 'center', sm: 'center', md: 'space-between', lg: 'space-between' } }}>
                    {pedidos_.map(e => (
                        <Grid item xs={8} md={2} sx={{ m: 1 }} key={e.transactionId}>
                            <Box display='flex' justifyContent='center' >
                                <Card key={e.transactionId} sx={{ width: 300 }}>
                                    {e.isQrDownload && (
                                        <Box display='flex' justifyContent='end'>
                                            < VerifiedIcon />
                                        </Box>
                                    )
                                    }
                                    <Typography variant='subtitle1' sx={{ textAlign: 'center' }}>{e.transactionId}</Typography>
                                    <Typography variant='body1' sx={{ textAlign: 'center' }}>{e.name}</Typography>
                                    <Typography variant='body1' sx={{ textAlign: 'center' }}>{e.message.slice(0, 10)}...</Typography>
                                    <Box display='flex' justifyContent='center'>
                                        <Button
                                            variant='outlined'
                                            startIcon={<QrCodeIcon />}
                                            sx={{ m: 3 }}
                                            onClick={() => createQR(e)}>
                                            Descargar QR
                                        </Button>
                                    </Box>
                                </Card>
                            </Box>
                        </Grid>
                    ))
                    }
                </Grid>



                <a ref={AnchorRef} href={`${qr_}`} download={`${transactionId__}`} style={{ display: 'none' }} />
            </LayoutAdmin>
        </>
    )
}


export default PedidosAdminPage

