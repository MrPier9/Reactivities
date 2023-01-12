import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Header, Image, Item, ItemContent, ItemGroup, Label, Segment, SegmentGroup } from "semantic-ui-react"
import { Activity } from "../../../app/models/activity"
import { useStore } from "../../../app/stores/store";

interface Props {
    activity: Activity
}

const activityImageStyle = {
    filter: 'brightness(30%)'
};

const activityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

export default observer(function ActivityDetailedHeader({ activity }: Props) {
    const { activityStore } = useStore();

    return (
        <SegmentGroup>
            <Segment basic attached='top' style={{ padding: 0 }}>
                {activity.isCancelled && (
                    <Label style={{ position: 'absolute', zIndex: 999, left: -14, top: 20 }} ribbon color="red" content='Cancelled' />
                )}
                <Image src={`/assets/categoryImages/${activity.category}.jpg`} fluid style={activityImageStyle} />
                <Segment style={activityImageTextStyle} basic>
                    <ItemGroup>
                        <Item>
                            <ItemContent>
                                <Header
                                    size="huge"
                                    content={activity.title}
                                    style={{ color: 'white' }}
                                />
                                <p>{format(activity.date!, 'dd MMM yyyy')}</p>
                                <p>
                                    Hosted by <strong><Link to={`/profiles/${activity.host?.username}`}>{activity.host?.displayName}</Link></strong>
                                </p>
                            </ItemContent>
                        </Item>
                    </ItemGroup>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                {!activity.isGoing && (
                    <Button loading={activityStore.loading} color="teal" onClick={activityStore.updateAttendance} disabled={activity.isCancelled}>
                        Join Activity
                    </Button>
                )}
                {!activity.isHost && activity.isGoing && (
                    <Button loading={activityStore.loading} onClick={activityStore.updateAttendance}>Cancel attendence</Button>
                )}
                {activity.isHost && (
                    <>
                        <Button
                            onClick={activityStore.cancelActivityToggle}
                            loading={activityStore.loading}
                            color={activity.isCancelled ? 'green' : "red"}
                            floated="left"
                        >
                            {activity.isCancelled ? "Re - activate event" : "Delete event"}
                        </Button>
                        <Button as={Link} to={`/manage/${activity.id}`} color="orange" floated="right" disabled={activity.isCancelled}>
                            Manage event
                        </Button>
                    </>
                )}
            </Segment>
        </SegmentGroup >
    )
})