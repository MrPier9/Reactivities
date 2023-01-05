import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default function ActivityDetails() {
    const { activityStore } = useStore();

    if (!activityStore.selectedActivity) return <LoadingComponent />;

    return (
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
                    <Button onClick={() => activityStore.openForm(activityStore.selectedActivity!.id)} basic color="blue" content="Edit" />
                    <Button onClick={() => activityStore.cancelSelectedActivity()} basic color="grey" content="Cancel" />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}