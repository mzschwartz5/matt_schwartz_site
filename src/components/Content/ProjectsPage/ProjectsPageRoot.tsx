interface IProjectPageProps {

}

/*
    Content containing my projects. Currently only contains an embedded unity project I worked on for a 48 hour game jam. The them was
    "retro" and "spiritual successor," so I built a follow up to Bejeweled but in 3D instead of 2D, called Jewel3d.

    In the future this tab will hold a gallery of projects which you can interact with -- e.g. play a game, watch a video, etc.
*/
const ProjectTab: React.FunctionComponent<IProjectPageProps> = (props:IProjectPageProps): JSX.Element =>
{
    return(
        <div>Projects placeholder</div>
        //<div id="unityContainer"></div>
    );
}

export default ProjectTab;