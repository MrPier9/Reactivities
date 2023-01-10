import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Button, Icon, Item, ItemContent, ItemDescription, ItemGroup, ItemHeader, ItemImage, Segment, SegmentGroup } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
    activity: Activity
}

export default function ActivityListItem({ activity }: Props) {
    return (
        <SegmentGroup raised>
            <Segment>
                <ItemGroup>
                    <Item>
                        <ItemImage size="tiny" circular src='/assets/user.png' />
                        <ItemContent>
                            <ItemHeader as={Link} to={`/activities/${activity.id}`}>
                                {activity.title}
                            </ItemHeader>
                            <ItemDescription>Hosted by Bob</ItemDescription>
                        </ItemContent>
                    </Item>
                </ItemGroup>
            </Segment>
            <Segment>
                <span>
                    <Icon name="clock" /> {format(activity.date!, 'dd MMM yyyy - h:mm aa')}
                    <Icon name="marker" style={{ paddingLeft: 8 }} /> {activity.venue}
                </span>
            </Segment>
            <Segment tertiary>
                Attends goes here
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button
                    as={Link}
                    to={`/activities/${activity.id}`}
                    color='teal'
                    floated="right"
                    content='View'
                />
            </Segment>
        </SegmentGroup>
    )
}