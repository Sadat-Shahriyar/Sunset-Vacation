import { Button } from '@mui/material'
import * as React from 'react'

export default function PublishPage(props){
    return(
        <div>
            <h1>Publish</h1>
            <Button onClick={()=>{props.setPageNo(props.pageNo + 1)}}>next</Button>
        </div>
    )
}