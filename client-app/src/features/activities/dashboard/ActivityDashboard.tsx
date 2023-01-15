import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityFitlers from "./ActivityFilters";
import ActivityList from "./ActivityList";

export default observer(function ActivityDashboard() {
    const { activityStore, profileStore } = useStore();

    useEffect(() => {
        if (activityStore.activityRegistry.size < 2 || activityStore.isDirty || profileStore.isDirty) {
            activityStore.loadActivities();
            activityStore.isDirty = false;
            profileStore.isDirty = false;
        }
    }, [activityStore, profileStore])

    if (activityStore.loadingInitial) return <LoadingComponent />

    return (
        <Grid>
            <Grid.Column width={10} >
                <ActivityList />
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityFitlers />
            </Grid.Column>
        </Grid>
    )
})