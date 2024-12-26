import { Theme, useMediaQuery} from "@material-ui/core";
import ImageList from '@mui/material/ImageList';
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { loadAllProjects, IProject } from "../../data/projects_db";
import { activeUserAtom } from "../../data/users_db";
import { makeStyles } from "@material-ui/core/styles";
import CardSkeleton from "../core/CardSkeleton";
import CreateProjectCard from "./admin/CreateProjectCard";
import ProjectCard from "./ProjectCard";

interface IProjectGaleryProps {

}

const ProjectGallery: React.FunctionComponent<IProjectGaleryProps> = (props:IProjectGaleryProps): JSX.Element =>
{
    const [projects, setProjects] = useState<IProject[]>([]);
    const activeUser = useRecoilValue(activeUserAtom);
    const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("xs"));
    const isMediumScreen = useMediaQuery((theme: Theme) => theme.breakpoints.between("sm","md"));
    const classes = useProjectGalleryStyles();

    useEffect(() => {
        const projectData = loadAllProjects();
        projectData.then(data => {
            const visibleProjects = data.filter(proj => !proj.hidden);
            setProjects(visibleProjects);
        });
    }, []);

    const projectCards = projects.map((proj) => {
        return <ProjectCard project={proj} key={proj.title}/> // change proj.title to ID later
    });

    const createNewProject = (projectRef: IProject) => {
        setProjects((prevProjs) => [...prevProjs, projectRef]);
    }

    if (activeUser?.isAdmin) {
        projectCards.push(
            <CreateProjectCard setCreatedProjectRef={createNewProject} key="CreateCard"/>
        )
    }

    const cardSkeletons = Array.from(Array(12).keys()).map((_val, idx) => {
        return <CardSkeleton key={idx}/>
    });


    return(
        <div className={classes.rootDiv}>
            <ImageList variant="masonry" gap={7} className={classes.imageList} cols={isSmallScreen ? 1 : (isMediumScreen ? 2 : 3)}>
                {projectCards.length ? projectCards : cardSkeletons}
            </ImageList>
        </div>
    );
}

const useProjectGalleryStyles = makeStyles({
    rootDiv: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    imageList: {
        margin: "3vh",
        width: "100%",
    }
});


export default ProjectGallery;