import { Theme, useMediaQuery} from "@material-ui/core";
import ImageList from '@mui/material/ImageList';
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { loadAllProjects, IProject } from "../../data/projects_db";
import { activeUserAtom } from "../../data/users_db";
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


    useEffect(() => {
        const projectData = loadAllProjects();
        projectData.then(data => setProjects(data));
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
        <ImageList variant="masonry" cols={isSmallScreen ? 1 : (isMediumScreen ? 2 : 3)}>
            {projectCards.length ? projectCards : cardSkeletons}
        </ImageList>
    );
}


export default ProjectGallery;