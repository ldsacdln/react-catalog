import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Catalog from './catalog/Catalog';

export default () => (
    <BrowserRouter>
        <Routes>   
            <Route path="/" element={<Catalog/>} />
            <Route path="*" element={<div>404</div> } />
        </Routes>
    </BrowserRouter>
);