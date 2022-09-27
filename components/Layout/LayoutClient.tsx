import { makeStyles } from '@mui/material'
import { Box } from '@mui/system'
import Head from 'next/head'
import React, { FC } from 'react'
import { Footer } from '../Footer'
import Image from 'next/image';
import { Header } from '../ui'

interface Props {
    title: string,
    children: React.ReactNode
}

export const LayoutClient: FC<Props> = ({ children, title }) => {

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <Header />
            <Box >
                {children}
                <Footer />
            </Box>
        </>
    )
}
