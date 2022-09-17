import { Box } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import React, { FC } from 'react'
import { NavbarAdmin } from '../admin'

interface Props {
    title: string,
    children: React.ReactNode
}


export const LayoutAdmin: FC<Props> = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>Yo te cielo | {title}</title>
            </Head>
            <Box display='flex' justifyContent='center' sx={{ backgroundColor: 'white' }}>
                <Image src='/yotecielo.png' width={200} height={70} alt='yotecielo' />
            </Box>
            <NavbarAdmin />
            <Box >
                {children}
            </Box>
        </>
    )
}
