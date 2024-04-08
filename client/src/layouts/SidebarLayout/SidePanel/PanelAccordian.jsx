import React from 'react'
import styles from './SidePanel.module.css'
import { Accordion, AccordionDetails, AccordionSummary,Typography, MenuItem } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './SidePanal.css'
import png1 from '../../../assets/Svg/accOT.svg'
import png2 from '../../../assets/Svg/accTWO.svg'
import png3 from '../../../assets/Svg/accCT.svg'


const PanelAccordian = (props) => {
    const { image, title } = props
    return (
        <Accordion className={`accordian ${styles.accordian}`}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                className={styles.accSummary}
            >
                <img src={image} alt={title}  className={styles.itemImg}/> &nbsp;{title}
            </AccordionSummary>
            <AccordionDetails>
                <AccordianMenuItem image={png1} title={'Open Tickets'} />
                <AccordianMenuItem image={png2} title={'Tickets with orders'} />
                <AccordianMenuItem image={png3} title={'Closed Tickets'} />
            </AccordionDetails>
        </Accordion>
    )
}

export default PanelAccordian


export const AccordianMenuItem = (props) => {
    const { image, title } = props

    return (
        <MenuItem className={styles.menuItems}>
            <img src={image} alt={''} className={styles.itemimg} />&nbsp;
            <Typography className={styles.itemText} >
                {title}
            </Typography>
        </MenuItem>
    )
}
