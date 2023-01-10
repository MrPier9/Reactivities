import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Button, Header, Image, Item, ItemContent, ItemGroup, Segment, SegmentGroup } from "semantic-ui-react"
import { Activity } from "../../../app/models/activity"

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

export default function ActivityDetailedHeader({ activity }: Props) {

    return (
        <SegmentGroup>
            <Segment basic attached='top' style={{ padding: 0 }}>
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
                                    Hosted by <strong>Bob</strong>
                                </p>
                            </ItemContent>
                        </Item>
                    </ItemGroup>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button color="teal">Join Activity</Button>
                <Button>Cancel attendence</Button>
                <Button as={Link} to={`/manage/${activity.id}`} color="orange" floated="right">Manage event</Button>
            </Segment>
        </SegmentGroup>
    )
}