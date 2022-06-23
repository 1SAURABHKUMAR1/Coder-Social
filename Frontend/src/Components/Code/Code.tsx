import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export interface CodeProps {
    className: string;
}

const Code = ({ className, ...props }: CodeProps) => {
    const language = className.replace('lang-', '');

    return (
        <SyntaxHighlighter
            style={vscDarkPlus}
            language={language ?? 'js'}
            PreTag="div"
            className="codeStyle"
            // @ts-ignore
            children={props.children}
            {...props}
        />
    );
};

export default Code;
