"use client"
import { Logo } from "@/Logo/page"
import { Grid, Typography } from "@mui/material"
import { DEFAULT_TEXT_HEADER } from '../../data'
import useTextHeaderDelay from '../../hooks/useTextHeaderDelay'
import stylesHeader from './stylesHeader.module.css'

const Header: React.FC = () => {
    const changeText = useTextHeaderDelay({ texts: DEFAULT_TEXT_HEADER, delay: 3500 })
    return (
        <header>
            <Grid className={stylesHeader.ctnLogo} container>
                <Grid xs={12} alignItems='center' justifyContent='center' item>
                    <Logo />
                    <Typography className={stylesHeader['rotating-text']}>{changeText}</Typography>
                    <Typography className={stylesHeader.bf} />
                </Grid>
            </Grid>
        </header>
    )
}

export default Header