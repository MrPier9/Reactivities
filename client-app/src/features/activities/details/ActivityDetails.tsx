import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, GridColumn } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";

export default observer(function ActivityDetails() {
    const { activityStore } = useStore();
    const { id } = useParams();

    useEffect(() => {
        if (id) activityStore.loadActivity(id);
    }, [id, activityStore.loadActivity, activityStore])

    if (activityStore.loadingInitial || !activityStore.selectedActivity) return <LoadingComponent />;

    return (
        <Grid>
            <GridColumn width={10}>
                <ActivityDetailedHeader activity={activityStore.selectedActivity} />
                <ActivityDetailedInfo activity={activityStore.selectedActivity} />
                <ActivityDetailedChat />
            </GridColumn>
            <GridColumn width={6}>
                <ActivityDetailedSidebar activity={activityStore.selectedActivity} />
            </GridColumn>
        </Grid>
    )
})