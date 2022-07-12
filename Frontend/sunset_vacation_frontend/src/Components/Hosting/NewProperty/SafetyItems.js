import { Button } from '@mui/material'
import * as React from 'react'

export default function SafetyItemsPage(props){
    return(
        <div>
            <h1>Safety items</h1>
            <Button onClick={()=>{props.setPageNo(props.pageNo + 1)}}>next</Button>
        </div>
    )
}