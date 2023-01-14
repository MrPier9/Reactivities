import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, GridColumn } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";

export default observer(function ProfilePage() {
    const { username } = useParams();
    const { profileStore } = useStore();
    const { loadingProfile, loadProfile, profile } = profileStore;

    useEffect(() => {
        if (username) loadProfile(username);
    }, [loadProfile, username])

    if (loadingProfile) return <LoadingComponent />

    return (
        <Grid centered>
            <GridColumn width={15}>
                {profile &&
                    <>
                        <ProfileHeader profile={profile} />
                        <ProfileContent profile={profile} />
                    </>
                }

            </GridColumn>
        </Grid>
    )
})