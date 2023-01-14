import { observer } from "mobx-react-lite"
import { SyntheticEvent, useState } from "react";
import { Button, ButtonGroup, Card, CardGroup, Grid, GridColumn, Header, Image, TabPane } from "semantic-ui-react"
import PhotoUploadWidget from "../../app/common/imageUpload/PhotoUploadWidget";
import { Photo, Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";

interface Props {
    profile: Profile;
}

export default observer(function ProfilePhoto({ profile }: Props) {
    const { profileStore: { isCurrentUser, uploadPhoto, uploading, setMain, loading, deleting, deletePhoto } } = useStore();
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const [target, setTarget] = useState('');

    function handlePhotoUpload(file: Blob) {
        uploadPhoto(file).then(() => setAddPhotoMode(false));
    }

    function handleSetMainPhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name);
        setMain(photo);
    }

    function handleDeleting(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name);
        deletePhoto(photo);
    }

    return (
        <TabPane>
            <Grid>
                <GridColumn width={16}>
                    <Header icon='image' content='Photos' floated="left" />
                    {isCurrentUser && (
                        <Button
                            floated="right" basic content={addPhotoMode ? 'Cancel' : 'Add Photo'}
                            onClick={() => setAddPhotoMode(!addPhotoMode)}
                            color={addPhotoMode ? 'red' : 'blue'}
                        />
                    )}
                </GridColumn>
                <GridColumn width={16}>
                    {addPhotoMode ? (
                        <PhotoUploadWidget uploadPhoto={handlePhotoUpload} uploading={uploading} />
                    ) : (
                        <CardGroup itemsPerRow={5}>
                            {profile.photos?.map(photo => (
                                <Card key={photo.id}>
                                    <Image src={photo.url} />
                                    {isCurrentUser && (
                                        <ButtonGroup fluid widths={2}>
                                            <Button
                                                basic color="green" content='Main' name={photo.id} disabled={photo.isMain}
                                                loading={target === photo.id && loading} onClick={e => handleSetMainPhoto(photo, e)}
                                            />
                                            <Button
                                                basic color="red" icon='trash' name={photo.id} disabled={photo.isMain}
                                                loading={target === photo.id && deleting} onClick={e => handleDeleting(photo, e)}
                                            />
                                        </ButtonGroup>
                                    )}
                                </Card>
                            ))}
                        </CardGroup>
                    )}
                </GridColumn>
            </Grid>
        </TabPane>
    )
})