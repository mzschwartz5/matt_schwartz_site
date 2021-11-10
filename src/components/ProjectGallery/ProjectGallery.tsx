import { makeStyles, Grid} from "@material-ui/core";
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
    const classes = useCardStyles();
    const [projects, setProjects] = useState<IProject[]>([]);
    const activeUser = useRecoilValue(activeUserAtom);
    
    useEffect(() => {
        loadAllProjects(setProjects)
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
        <Grid container
            alignContent="flex-start"
            alignItems="flex-start"
            spacing={3}
            className={classes.gridContainer}
        >   
            {projectCards.length ? projectCards : cardSkeletons}
        </Grid>
    );
}

const useCardStyles = makeStyles({
    
    gridContainer: {
        height: "100%",
        padding: "15px 15px 0px 15px"
    },

});

export default ProjectGallery;