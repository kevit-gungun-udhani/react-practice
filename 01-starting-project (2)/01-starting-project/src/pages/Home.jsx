import { Link, useNavigate } from "react-router-dom"
export default function HomePage(){
    const navigate = useNavigate();
    function handleClick(){
        navigate('/products')
    }

    return (
        <>
            <h1>Home Page</h1>
            <p>Go to <Link to='/products'>Products page</Link></p>
            <button onClick={handleClick}>Go to product page</button>
        </>
    )
}