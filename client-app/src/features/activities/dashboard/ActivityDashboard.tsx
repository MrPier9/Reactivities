import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

export default observer(function ActivityDashboard() {
    const { activityStore } = useStore();

    if (activityStore.loadingInitial) return <LoadingComponent />

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width={6}>
                {activityStore.selectedActivity && !activityStore.editMode &&
                    <ActivityDetails />
                }
                {activityStore.editMode &&
                    <ActivityForm />
                }
            </Grid.Column>
        </Grid>
    )
})