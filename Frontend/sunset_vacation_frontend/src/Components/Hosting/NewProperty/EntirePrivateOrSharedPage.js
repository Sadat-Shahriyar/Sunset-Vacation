import { Button } from '@mui/material'
import * as React from 'react'

export default function EntirePrivateOrSharePage(props){
    return(
        <div>
            <h1>Entire private or shared</h1>
            <Button onClick={()=>{props.setPageNo(props.pageNo + 1)}}>next</Button>
        </div>
    )
}