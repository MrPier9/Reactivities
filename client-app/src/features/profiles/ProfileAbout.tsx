import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Button, Form, Grid, GridColumn, Header, TabPane } from "semantic-ui-react";
import MyTextArea from "../../app/common/form/MyTextArea";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import ProfileBio from "./ProfileBio";
import * as Yup from 'yup';
import { Formik } from "formik";
import { ProfileFormValues } from "../../app/models/profile";

export default observer(function ProfileAbout() {
    const { profileStore } = useStore();
    const [editMode, setEditMode] = useState(false);
    const [initialStateForm, setInitialStateForm] = useState<ProfileFormValues>(new ProfileFormValues(profileStore.profile!));

    const validationSchema = Yup.object({
        displayName: Yup.string().required("Name is required")
    })

    function handleFormSubmit(values: ProfileFormValues) {
        profileStore.editName(values.displayName, values.bio).then(() => setEditMode(false));
        setInitialStateForm(values);
    }

    return (
        <TabPane>
            <Grid>
                <GridColumn width={8}>
                    <Header icon='user' content={'About ' + profileStore.profile?.displayName} />
                </GridColumn>
                <GridColumn width={8}>
                    {profileStore.isCurrentUser && editMode &&
                        <Button content='Cancel' floated="right" onClick={() => setEditMode(false)} />
                    }
                    {profileStore.isCurrentUser && !editMode &&
                        <Button content='Edit profile' floated="right" onClick={() => setEditMode(true)} />
                    }
                </GridColumn>
                <GridColumn width={16}>
                    {profileStore.profile?.bio && !editMode && (
                        <ProfileBio profile={profileStore.profile} />
                    )}
                    {editMode && (
                        <>
                            <Formik
                                validationSchema={validationSchema} enableReinitialize initialValues={initialStateForm}
                                onSubmit={values => handleFormSubmit(values)}
                            >
                                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                                    <Form className="ui form" autoComplete='off' onSubmit={handleSubmit}>
                                        <MyTextInput placeholder="Name" name="displayName" />
                                        <MyTextArea placeholder="Add you Bio" name="bio" rows={4} />
                                        <Button
                                            loading={isSubmitting}
                                            disabled={!isValid || !dirty}
                                            floated="right"
                                            type="submit"
                                            positive
                                            content="Upgrade profile"
                                        />
                                    </Form>
                                )}
                            </Formik>
                        </>
                    )}
                </GridColumn>
            </Grid>
        </TabPane>
    )
})