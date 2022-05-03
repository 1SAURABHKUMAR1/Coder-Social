import { BrowserRouter as Router } from 'react-router-dom';

import { Toaster } from 'react-hot-toast';

const MainProvider = ({ children }) => {
    return (
        <Router>
            <Toaster position="top-right" reverseOrder={false} />
            {children}
        </Router>
    );
};

export default MainProvider;
