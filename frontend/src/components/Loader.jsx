import '../components/static/styles/css/loader.css';

export default function Loader() {
    return(
        <div className='loader-overlay'>
            <div className="lds-ripple"><div></div><div></div></div>
        </div>
    )
}