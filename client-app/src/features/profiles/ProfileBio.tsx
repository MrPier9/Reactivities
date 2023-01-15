import { Container, Grid } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";

interface Props {
    profile: Profile;
}

export default function ProfileBio({ profile }: Props) {
    return (
        <Grid width={15}>
            <Container text style={{ paddingBottom: '20px', whiteSpace: 'pre-wrap' }}>
                {profile.bio}
            </Container>
        </Grid>
    )
}