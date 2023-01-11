import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Grid, GridColumn, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";

import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";

export default observer(function ActivityForm() {
    const { activityStore } = useStore();
    const { id } = useParams();
    const navigate = useNavigate();

    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: null,
        city: '',
        venue: ''
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required('The activity description is required'),
        category: Yup.string().required(),
        date: Yup.string().required('The activity date is required').nullable(),
        venue: Yup.string().required(),
        city: Yup.string().required(),
    })

    useEffect(() => {
        if (id) activityStore.loadActivity(id).then(activity => setActivity(activity!));
    }, [activityStore.loadActivity, id, activityStore])

    function handleFormSubmit(activity: Activity) {
        if (activity.id.length === 0) {
            activity.id = uuid();
            activityStore.createActivity(activity).then(() => navigate(`/activities/${activity.id}`));
        } else {
            activityStore.updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
        }
    }

    if (activityStore.loadingInitial) return <LoadingComponent />

    return (
        <Grid centered>
            <GridColumn width={10}>
                <Segment clearing>
                    <Header content='Activity Details' sub color="teal" />
                    <Formik
                        validationSchema={validationSchema} enableReinitialize initialValues={activity} onSubmit={values => handleFormSubmit(values)}
                    >
                        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                            <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                                <MyTextInput name="title" placeholder="Title" />
                                <MyTextArea placeholder='Description' rows={3} name='description' />
                                <MySelectInput options={categoryOptions} placeholder='Category' name='category' />
                                <MyDateInput
                                    placeholderText='Date'
                                    name='date'
                                    showTimeSelect
                                    timeCaption="time"
                                    dateFormat='MMMM d, yyyy h:mm aa'
                                />
                                <Header content='Location Details' sub color="teal" />
                                <MyTextInput placeholder='City' name='city' />
                                <MyTextInput placeholder='Venue' name='venue' />
                                <Button
                                    disabled={isSubmitting || !dirty || !isValid}
                                    loading={isSubmitting}
                                    floated="right"
                                    positive
                                    type="submit"
                                    content="Submit"
                                />
                                <Button as={Link} to='/activities' floated="right" type="submit" content="Cancel" />
                            </Form>
                        )}
                    </Formik>
                </Segment>
            </GridColumn>
        </Grid>
    )
})