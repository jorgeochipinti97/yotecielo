import { Box, Grid } from '@mui/material'
import type { GetServerSideProps, NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'
import { LayoutAdmin, Slider } from '../components'
import { dbPedidos } from '../database'
import { pedido } from '../interfaces'
import QrCodeIcon from '@mui/icons-material/QrCode';
import { SummaryTile } from '../components/admin'
import { AccessTimeOutlined } from '@mui/icons-material';
import useSWR from 'swr'
import { usePedidos } from '../hooks/UsePedidos';
import { FullScreenLoading } from '../components/FullScreenLoading/FullScreenLoading';


const Home: NextPage = () => {
  const [refreshIn, setRefreshIn] = useState(30);
  const { pedidos, isLoading } = usePedidos('/pedidos')

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshIn(refreshIn => refreshIn > 0 ? refreshIn - 1 : 30);
    }, 1000);

    return () => clearInterval(interval)
  }, []);

  return (
    <>
      <LayoutAdmin title='Dashboard'>

        {
          isLoading
            ? <FullScreenLoading />
            : <Box display='flex' justifyContent='space-around' sx={{ mt: 5 }} flexWrap='wrap'>
              <Box sx={{ m: 1 }}>
                <SummaryTile title='Pedidos' subTitle={`${pedidos.length}`} icon={<QrCodeIcon sx={{ fontSize: 40 }} />} />
              </Box>
              <Box sx={{ m: 1 }}>

                <SummaryTile
                  title='Actualización en'
                  subTitle={refreshIn}
                  icon={<AccessTimeOutlined color="secondary" sx={{ fontSize: 40 }} />}
                />
              </Box>
            </Box>

        }
      </LayoutAdmin>
    </>
  )
}

export default Home

