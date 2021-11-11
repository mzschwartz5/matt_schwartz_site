import { makeStyles, Grid, Theme} from "@material-ui/core";
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
    const classes = useCardStyles(projects.length)();
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
            direction="column"
        >   
            {projectCards.length ? projectCards : cardSkeletons}
        </Grid>
    );
}

const useCardStyles = (numGridItems: number) => makeStyles((theme: Theme) => ({

    // If this ever has problems, try looking into mui Image List component instead.
    gridContainer: {
            padding: "15px 15px 0px 15px",
            [theme.breakpoints.only("xs")]: {
                height: String(75 * numGridItems) + "vh"
            },
            [theme.breakpoints.between("sm","md")]: {
                height: String(75 * numGridItems / 2) + "vh"
            },
            [theme.breakpoints.up("lg")]: {
                height: String(75 * numGridItems / 3) + "vh"
            },

        },
    })
);

export default ProjectGallery;