import { Button } from '@mui/material'
import * as React from 'react'

export default function PricePage(props){
    return(
        <div>
            <h1>Price</h1>
            <Button onClick={()=>{props.setPageNo(props.pageNo + 1)}}>next</Button>
        </div>
    )
}