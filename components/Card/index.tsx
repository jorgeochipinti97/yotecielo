import { Button, Divider, Typography } from '@mui/material';
import { Box } from '@mui/system'
import html2canvas from 'html2canvas';
import { FC, useRef } from 'react';
import { Qrcode } from '../qrcode/index';
import { capitalizarPrimeraLetraSolamente } from '../../utils/capitalize';

interface Props {
  pedidoQr: string
  numeroDePedido: string
  name: string
}


export const CardComponent: FC<Props> = ({ pedidoQr, numeroDePedido, name }) => {
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
      link.download = `YoTeCielo-${numeroDePedido}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };

  const styles = {
    paperContainer: {
      minHeigth: '100vh',
      backgroundImage: `url(https://res.cloudinary.com/djk4q3tys/image/upload/v1663644193/l9jmeizutbfcorcptekg.png)`,
      backgroundRepeat: 'no-repeat'
    }
  };

  return (
    <>
      <Box display='flex' flexDirection='column' >
        <Box display='flex' justifyContent='center' ref={printRef} sx={{widht:500}} >
          <Box>
            <Box sx={{ backgroundColor: 'white', color: 'black' }}>
              <Typography sx={{ textAlign: 'center' }} variant='h5'>Numero de Pedido: {numeroDePedido}</Typography>
              <Typography sx={{ textAlign: 'center' }} variant='h6'>{capitalizarPrimeraLetraSolamente(name)}</Typography>
              <Typography sx={{ textAlign: 'center' }} variant='h6'> {`${new Date().toLocaleDateString("es-ES", { year: 'numeric', month: 'long', day: 'numeric' })}`} </Typography>
              <Divider />
            </Box>
            <Box sx={{ backgroundColor: 'white' }}  >
              <Box style={styles.paperContainer} sx={{ height: 718, width: 416 }} display='flex' justifyContent='center'>
                <Box alignSelf='end' sx={{ mb: 9, mr: 2 }}>
                  <Qrcode url={pedidoQr} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>


      <Box display='flex' justifyContent='center' sx={{ mt: 3 }}>
        <Button
          variant='contained'
          color='success'
          onClick={handleDownloadImage}
        >
          Descargar imagen
        </Button>
      </Box>
    </>
  )
}
