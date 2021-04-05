const PageHeader: React.FunctionComponent = (): JSX.Element =>
{
    return(
        <>
            <div className="page-header">
                Matt Schwartz
                <a href="mailto: mzschwartz5@gmail.com">
                    <img src="/Icons/email_icon.png" className="icon"/>
                </a>
                <a href="/Files/Resume 2021.pdf" target="_blank">
                    <img src="/Icons/resume_icon.png" className="icon"/>
                </a>
                <a href="https://github.com/mzschwartz5" target="_blank">
                    <img src="/Icons/github_logo.png" className="icon"/>
                </a>          
            </div>
            <br />
        </>
    );
}

export default PageHeader;