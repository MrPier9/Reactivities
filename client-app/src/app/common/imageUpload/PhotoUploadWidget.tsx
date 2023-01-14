import { useEffect, useState } from "react";
import { Button, ButtonGroup, Grid, GridColumn, Header } from "semantic-ui-react";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";

interface Props {
    uploadPhoto: (file: Blob) => void;
    uploading: boolean;
}

export default function PhotoUploadWidget({ uploadPhoto, uploading }: Props) {
    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();

    function onCrop() {
        if (cropper) {
            cropper.getCroppedCanvas().toBlob(blob => uploadPhoto(blob!));
        }
    }

    useEffect(() => {
        return () => {
            files.forEach((file: any) => URL.revokeObjectURL(file.preview))
        }
    }, [files])

    return (
        <Grid centered>
            <GridColumn width={4}>
                <Header sub color="teal" content='Step 1 - Add Photo' />
                <PhotoWidgetDropzone setFiles={setFiles} />
            </GridColumn>
            <GridColumn width={1} />
            <GridColumn width={4}>
                <Header sub color="teal" content='Step 2 - Resize image' />
                {files && files.length > 0 && (
                    <PhotoWidgetCropper setCropper={setCropper} imagePreview={files[0].preview} />
                )}
            </GridColumn>
            <GridColumn width={1} />
            <GridColumn width={4}>
                <Header sub color="teal" content='Step 3 - Preview & upload' />
                {files && files.length > 0 && (
                    <>
                        <div className="img-preview" style={{ marginTop: '10px', marginBottom: '10px', minHeight: 180, width: 180, overflow: 'hidden' }} />
                        <ButtonGroup widths={2}>
                            <Button loading={uploading} onClick={onCrop} positive icon='check' />
                            <Button disabled={uploading} onClick={() => setFiles([])} icon='close' />
                        </ButtonGroup>
                    </>
                )}
            </GridColumn>
        </Grid>
    )
}