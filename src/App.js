import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Quotes from "./components/Quotes";
import categories from './components/QuotesCategories';

function App() {

    return (
        <>
            <Quotes categories={categories} />
        </>
    );
}

export default App;
