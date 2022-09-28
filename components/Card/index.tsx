import { Divider, Typography } from '@mui/material';
import { Box } from '@mui/system'
import { FC } from 'react';
import { Qrcode } from '../qrcode/index';
import { capitalizarPrimeraLetraSolamente } from '../../utils/capitalize';

interface Props {
  pedidoQr: string
  numeroDePedido: string
  name: string
}


export const CardComponent: FC<Props> = ({ pedidoQr, numeroDePedido, name }) => {

  const styles = {
    paperContainer: {
      minHeigth: '100vh',
      backgroundImage: `url(https://res.cloudinary.com/djk4q3tys/image/upload/v1664338667/hxpvv4hhn53wzwqmlskq.png)`,
      backgroundRepeat: 'no-repeat'
    }
  };

  return (
    <>
      <Box display='flex' flexDirection='column' >
        <Box display='flex' justifyContent='center' sx={{ widht: 500 }} >
          <Box>
            <Box sx={{ backgroundColor: 'white', color: 'black' }}>
              <Typography sx={{ textAlign: 'center' }} variant='h5'>Numero de Pedido: {numeroDePedido}</Typography>
              <Typography sx={{ textAlign: 'center' }} variant='h6'>{capitalizarPrimeraLetraSolamente(name)}</Typography>
              <Typography sx={{ textAlign: 'center' }} variant='h6'> {`${new Date().toLocaleDateString("es-ES", { year: 'numeric', month: 'long', day: 'numeric' })}`} </Typography>
              <Divider />
            </Box>
            <Box sx={{ backgroundColor: 'white' }}  >
              <Box style={styles.paperContainer} sx={{ height: 587, width: 340 }} display='flex' justifyContent='center'>
                <Box alignSelf='end' sx={{ mb: 7, mr: 2 }}>
                  <Qrcode url={pedidoQr} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider />
    </>
  )
}
