import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, Grid, GridColumn, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Activity } from "../../../app/models/activities";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";

export default observer(function ActivityForm() {
    const { activityStore } = useStore();
    const { id } = useParams();
    const navigate = useNavigate();

    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        if (id) activityStore.loadActivity(id).then(activity => setActivity(activity!));
    }, [activityStore.loadActivity, id, activityStore])

    function handleSubmit() {
        if (!activity.id) {
            activity.id = uuid();
            activityStore.createActivity(activity).then(() => navigate(`/activities/${activity.id}`));
        } else {
            activityStore.updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value })
    }

    if (activityStore.loadingInitial) return <LoadingComponent />

    return (
        <Grid centered>
            <GridColumn width={10}>
                <Segment clearing>
                    <Form onSubmit={handleSubmit} autoComplete='off'>
                        <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange} />
                        <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange} />
                        <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange} />
                        <Form.Input type="date" placeholder='Date' value={activity.date} name='date' onChange={handleInputChange} />
                        <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange} />
                        <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange} />
                        <Button loading={activityStore.loading} floated="right" positive type="submit" content="Submit" />
                        <Button as={Link} to='/activities' floated="right" type="submit" content="Cancel" />
                    </Form>
                </Segment>
            </GridColumn>
        </Grid>
    )
})