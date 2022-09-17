import { makeStyles } from '@mui/material'
import { Box } from '@mui/system'
import Head from 'next/head'
import React, { FC } from 'react'
import { Footer } from '../Footer'
import Image from 'next/image';

interface Props {
    title: string,
    children: React.ReactNode
}

export const LayoutClient: FC<Props> = ({ children, title }) => {
    const styles = {
        paperContainer: {
            backgroundColor: ' #5bb6d6'
        }
    };

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <Box display='flex' justifyContent='center' sx={{ backgroundColor: 'white' }}>
                <Image src='/yotecielo.png' width={200} height={70} alt='yotecielo' />
            </Box>
            <Box style={styles.paperContainer} sx={{height:'100vh'}} display='flex' flexDirection='column' justifyContent='space-between'>
                {children}
                <Footer />
            </Box>
        </>
    )
}
