import { Box, Card, Grid, IconButton, Input, InputAdornment, Typography } from '@mui/material'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { CardComponent, LayoutAdmin } from '../../components'

import { SearchOutlined } from '@mui/icons-material';

import { usePedidos } from '../../hooks'




const PedidosAdminPage: NextPage = () => {
    const [searchTerm, setSearchTerm] = useState<string>()
    const { pedidos, isLoading } = usePedidos('/pedidos')
    const [pedidos_, setPedidos_] = useState(pedidos)

    useEffect(() => {
        const newPedidos = searchTerm && pedidos_.filter(e => e.transactionId.includes(searchTerm))
        newPedidos && setPedidos_(newPedidos)

        searchTerm && searchTerm.length < 2 && setPedidos_(pedidos)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm])




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
                <Grid container spacing={2} sx={{justifyContent: { xs: 'center', sm: 'center', md: 'space-between', lg: 'space-between' } }}>
                    {pedidos_.map(e => (
                        <Grid item xs={8} md={4} key={e.transactionId}>
                            <Box sx={{ m: 2 }}>
                                <CardComponent pedidoQr={`https://yotecielo.vercel.app/pedidos/${e.transactionId}`} numeroDePedido={e.transactionId} name={e.name} />
                            </Box>
                        </Grid>
                    ))
                    }
                </Grid>
            </LayoutAdmin >
        </>
    )
}


export default PedidosAdminPage

