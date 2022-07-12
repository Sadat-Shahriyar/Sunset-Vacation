import { Button } from '@mui/material'
import * as React from 'react'

export default function TitlePage(props){
    return(
        <div>
            <h1>Title</h1>
            <Button onClick={()=>{props.setPageNo(props.pageNo + 1)}}>next</Button>
        </div>
    )
}