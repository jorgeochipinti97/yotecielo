import { Box, Button, Card, Checkbox, Divider, Grid, IconButton, Input, InputAdornment, Typography, capitalize, Chip } from '@mui/material';
import type { NextPage } from 'next'
import { useEffect, useState, useRef } from 'react'
import { CardComponent, LayoutAdmin } from '../../components'
import { SearchOutlined } from '@mui/icons-material';
import { usePedidos } from '../../hooks'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { pedido } from '../../interfaces';
import html2canvas from 'html2canvas';



const PedidosAdminPage: NextPage = () => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [searchTerm, setSearchTerm] = useState<string>()
    const { pedidos, isLoading } = usePedidos('/pedidos')
    const [isGenerate, setIsGenerate] = useState(false)
    const [pedidos_, setPedidos_] = useState(pedidos)
    const [printPedidos, setPrintPedidos] = useState<pedido[]>([])

    const printRef = useRef<HTMLElement>()

    const handleDownloadImage = async () => {
        const element = printRef.current
        const canvas = await html2canvas(element ? element : document.createElement('div'), {
            allowTaint: true,
            useCORS: true
        })
        const data = canvas.toDataURL(`image/jpg`);
        const link = document.createElement('a');
        if (typeof link.download === 'string') {
            link.href = data;
            link.download = 'YoTeCielo.jpg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            window.open(data);
        }
    };

    useEffect(() => {
        const newPedidos = searchTerm && pedidos_.filter(e => e.transactionId.includes(searchTerm))
        newPedidos && setPedidos_(newPedidos)

        searchTerm && searchTerm.length < 2 && setPedidos_(pedidos)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm])




    const handleChange = (pedidoAImprimir: pedido) => {
        const newArray = [...printPedidos, pedidoAImprimir]
        printPedidos.includes(pedidoAImprimir)
            ? setPrintPedidos(printPedidos.filter(e => e._id != pedidoAImprimir._id))
            : setPrintPedidos(newArray)
    }
    return (
        <>
            <LayoutAdmin title='Admin - Pedidos'>
                {isGenerate &&
                    (
                        <>
                            <Box sx={{ size: 'A4', backgroundColor: 'white', m: 2 }} display='flex' ref={printRef} >
                                {
                                    printPedidos.map(e => (
                                        <Box sx={{ border: '1px solid grey' }} key={e._id}>
                                            <CardComponent pedidoQr={`https://yotecielo.vercel.app/pedidos/${e.transactionId}`} numeroDePedido={e.transactionId} name={e.name} />
                                        </Box>
                                    ))}
                            </Box>
                            <Box display='flex' justifyContent='center' sx={{ mt: 2, mb: 3 }}>
                                <Button
                                    variant='contained'
                                    color='success'
                                    onClick={handleDownloadImage}
                                >
                                    Descargar imagen
                                </Button>
                            </Box>
                        </>
                    )}
                <Divider />
                {!isGenerate &&
                    <Box display='flex' justifyContent='center' sx={{ m: 2 }}>
                        <Box display='flex' flexDirection='column' >
                            <Box sx={{ border: '1px solid black', backgroundColor: 'white', p: 3, borderRadius: '9px' }}>
                                <Typography variant='h6' sx={{ color: 'black' }}>Numeros de orden a imprimir</Typography>
                                {
                                    printPedidos.map(e => (
                                        <Chip label={e.transactionId} color='success' sx={{ m: 1 }} key={e.transactionId} />
                                    ))
                                }
                            </Box>
                            <Box sx={{ m: 1 }} display='flex' justifyContent='center'>
                                <Button variant='contained' color='secondary' onClick={() => setIsGenerate(true)}>generar imagen</Button>
                            </Box>
                        </Box>
                    </Box>
                }
                <Divider />
                <Box display='flex' justifyContent='center' sx={{ mt: 3, mb: 2 }}>
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
                <Grid container spacing={2}>
                    {pedidos_.map(e =>
                    (
                        <Grid item xs={12} md={3} lg={3} xl={3} key={e._id}>
                            <Box key={e.transactionId} display='flex' justifyContent='center' sx={{ m: 2 }}>
                                <Card sx={{ width: 250 }}>
                                    <Box display='flex' justifyContent='end'>
                                        {
                                            printPedidos.includes(e) &&
                                            <CheckCircleIcon />

                                        }
                                    </Box>
                                    <Typography variant='h6' sx={{ textAlign: 'center' }}>{e.transactionId}</Typography>
                                    <Typography variant='subtitle1' sx={{ textAlign: 'center' }}>{capitalize(e.name)}</Typography>
                                    <Box display='flex' justifyContent='center' sx={{ mt: 3 }}>

                                        <Button
                                            sx={{ m: 1 }}
                                            variant='contained'
                                            color='secondary'
                                            onClick={() => handleChange(e)}
                                        >
                                            Agregar / eliminar

                                        </Button>
                                    </Box>
                                </Card>
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

