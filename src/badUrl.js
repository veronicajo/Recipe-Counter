import errorExample from './errorExample.png'

export default function BadUrl(props) {

    return(
        <div>
            <h1 id="errorMsg">Oops!</h1>
            <p>
                Looks like the URL you entered is not recipe or is not a recipe in a format we can easily parse. We recommend that you use recipes that show up on the top of the Google search results page:
            </p>
            <p>
                <img src={errorExample} alt='error example' />;
            </p>
        </div>
    );
}