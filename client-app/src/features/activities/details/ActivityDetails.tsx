import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Grid, GridColumn, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default observer(function ActivityDetails() {
    const { activityStore } = useStore();
    const { id } = useParams();

    useEffect(() => {
        if (id) activityStore.loadActivity(id);
    }, [id, activityStore.loadActivity, activityStore])

    if (activityStore.loadingInitial || !activityStore.selectedActivity) return <LoadingComponent />;

    return (
        <Grid centered>
            <GridColumn width={11}>
                <Card fluid>
                    <Image src={`/assets/categoryImages/${activityStore.selectedActivity.category}.jpg`} />
                    <Card.Content>
                        <Card.Header>{activityStore.selectedActivity.title}</Card.Header>
                        <Card.Meta>
                            {activityStore.selectedActivity.date}
                        </Card.Meta>
                        <Card.Description>
                            {activityStore.selectedActivity.description}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Button.Group widths='2'>
                            <Button as={Link} to={`/manage/${activityStore.selectedActivity.id}`} basic color="blue" content="Edit" />
                            <Button as={Link} to={'/activities'} basic color="grey" content="Cancel" />
                        </Button.Group>
                    </Card.Content>
                </Card>
            </GridColumn>
        </Grid>
    )
})