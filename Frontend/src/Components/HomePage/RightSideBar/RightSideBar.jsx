import './RightSideBar.css';

import { Link } from 'react-router-dom';

const RightSideBar = () => {
    return (
        <>
            <div className="sidebar-right">
                <div className="right-sidebar-menu">
                    <h2>#news</h2>
                    <ul>
                        <li>
                            <Link to="/">Whats new in ES2022? 🤔</Link>
                        </li>
                        <li>
                            <Link to="/">
                                Typescript 4.6 has been announced
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="right-sidebar-menu">
                    <h2>#discuss</h2>
                    <ul>
                        <li>
                            <Link to="/">
                                What are your favourite features in ES2022?
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                What's best React Folder Structure
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                React useContext vs Redux for state management?
                                When to use which?
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="right-sidebar-menu">
                    <h2>#webdev</h2>
                    <ul>
                        <li>
                            <Link to="/">What's new in ES20202? 🤔</Link>
                        </li>
                        <li>
                            <Link to="/">
                                Understanding Asynchronous Javascript 👩‍💻
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                Javascript : Understanding The Weird Parts - #1
                                : Glossary
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                Javascript : Understanding The Weird Parts - #2
                                Scope Chain
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                JavaScript : Understanding The Weird Parts - #3
                                Dynamic Typing, Types & Operators
                            </Link>
                        </li>
                        <li>
                            <Link to="/">Learn CSS by playing games 🥳</Link>
                        </li>
                        <li>
                            <Link to="/">
                                Learn to build Coder Social from scratch! 😇🥳
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default RightSideBar;
