import { format } from "date-fns"
import { Grid, GridColumn, Icon, Segment, SegmentGroup } from "semantic-ui-react"
import { Activity } from "../../../app/models/activity"

interface Props {
    activity: Activity
}

export default function ActivityDetailedInfo({ activity }: Props) {
    return (
        <SegmentGroup>
            <Segment attached='top'>
                <Grid>
                    <GridColumn width={1}>
                        <Icon size="large" color="teal" name="info" />
                    </GridColumn>
                    <GridColumn width={15}>
                        <p>{activity.description}</p>
                    </GridColumn>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign="middle">
                    <GridColumn width={1}>
                        <Icon size="large" color="teal" name="calendar" />
                    </GridColumn>
                    <GridColumn width={15}>
                        <span>{format(activity.date!, 'dd MMM yyyy -  h:mm aa')}</span>
                    </GridColumn>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign="middle">
                    <GridColumn width={1}>
                        <Icon size="large" color="teal" name="marker" />
                    </GridColumn>
                    <GridColumn width={15}>
                        <span>{activity.venue}, {activity.city}</span>
                    </GridColumn>
                </Grid>
            </Segment>
        </SegmentGroup>
    )
}