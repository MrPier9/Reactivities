import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Header, Icon } from 'semantic-ui-react';

interface Props {
    setFiles: (files: any) => void;
}

export default function PhotoWidgetDropzone({ setFiles }: Props) {
    const dzStyle = {
        border: 'dashed 3px LightGrey',
        borderColor: 'LightGrey',
        borderRadius: '5px',
        paddingTop: '30px',
        marginTop: '10px',
        textAlign: 'center' as 'center',
        height: 180,
        width: 180
    }

    const dzActive = {
        borderColor: 'green'
    }

    const onDrop = useCallback((acceptedFiles: any) => {
        setFiles(acceptedFiles.map((file: any) => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
    }, [setFiles])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()} style={isDragActive ? { ...dzStyle, ...dzActive } : dzStyle} >
            <input {...getInputProps()} />
            <Icon name='upload' size='huge' />
            <Header content='Drop image here' />
        </div>
    )
}