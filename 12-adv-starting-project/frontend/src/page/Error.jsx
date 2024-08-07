import { useRouteError } from "react-router-dom";
import PageContent from "../components/PageContent";

export default function ErrorPage(){
    const error = useRouteError();

    console.log(error)

    let title = 'An error occured';
    let message = 'Something went wrong'

    if(error.status === 500){
        title = error.data.message;
    }
    if(error.status === 404){
        title = 'Not Found!';
        message = 'Page Not Found';
    }

    return (
        <PageContent title={title}>
            {message}
        </PageContent>
    )
}