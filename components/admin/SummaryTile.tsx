
import { FC } from 'react';

import { Grid, Card, CardContent, Typography, Box } from '@mui/material';

interface Props {
    title: string | number;
    subTitle: string | number;
    icon: JSX.Element
}


export const SummaryTile: FC<Props> = ({ title, subTitle, icon }) => {
    return (
        <Grid item xs={12} sm={4} md={3}>
            <Card sx={{ display: 'flex' }}>
                <CardContent sx={{ width: 150, height: 150, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {icon}
                </CardContent>
                <CardContent sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column' }}>
                    <Box display='flex' justifyContent='center'>
                        <Typography variant='h5'>{title}</Typography>
                    </Box>
                    <Box display='flex' justifyContent='center'>
                        <Typography variant='h3'>{subTitle}</Typography>
                    </Box>
                </CardContent>
            </Card>

        </Grid>
    )
}