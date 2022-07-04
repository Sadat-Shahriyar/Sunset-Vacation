import * as React from 'react'
export default function ShowPropertyList(props){

    const [properties, setProperties] = React.useState({});

    React.useEffect(()=>{
        fetch("http://localhost:8000/hosting/" + `${props.userId}/`, {
            method:"GET",
            headers: {
            'Content-type': 'application/json'
            }
        })
        .then((response) => {
            if(response.ok){
                return response
            }
            else{
                let err = new Error(response.status + ": " + response.text);
                throw err;
            }
        })
        .then((response) => response.json())
        .then((response) => {
            setProperties(response.properties)
        })
        .catch((err) => {
            alert(err.message);
        })
    })

    let properts = properties.map((property) => {
        return(<h1>{property.title}</h1>);
    })

    return (
        <div>
            {properts}
        </div>
    );
}