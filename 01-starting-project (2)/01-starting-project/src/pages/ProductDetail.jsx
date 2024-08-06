import { useParams } from "react-router-dom"

export default function ProductDetail(){
    const params = useParams();
    console.log(params)
    return(
        <ul>
            <li>{params.id}</li>
        </ul>
    )
}