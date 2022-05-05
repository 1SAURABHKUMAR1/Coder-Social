import './Footer.css';

const Footer = () => {
    return (
        <footer>
            <p>
                <a
                    href="https://github.com/1SAURABHKUMAR1/Coder-Social"
                    className="footer-link"
                    target="_blank"
                    rel="noreferrer"
                >
                    Coder Social
                </a>
                is a inclusive network for software developer
            </p>
            <p>
                Made with ❤️ by
                <a
                    href="https://github.com/1SAURABHKUMAR1"
                    className="footer-link"
                    target="_blank"
                    rel="noreferrer"
                >
                    Saurabh
                </a>
                and React
            </p>
        </footer>
    );
};

export default Footer;
