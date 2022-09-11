import React, {useCallback, useMemo} from "react";
import {useDropzone} from 'react-dropzone';

// DropZone CSS Styling
const baseStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: '20px',
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    transition: 'border .3s ease-in-out',
    width: '20%',
    height: '60px'
  };
  
  const activeStyle = {
    borderColor: '#2196f3'
  };
  
  const acceptStyle = {
    borderColor: '#00e676'
  };
  
  const rejectStyle = {
    borderColor: '#ff1744'
  };

// Upload Feature
const Upload = () => {
    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles, "UPLOADED_FILE")
      }, []);

    const {getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({onDrop})

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
      }), [
        isDragActive,
        isDragReject,
        isDragAccept
      ]);

      
    return (
        <div>
            <div {...getRootProps({style})}>
                <input {...getInputProps()} />
                    {
                        isDragActive ?
                        <p>Drop ....</p> :
                        <p>Drag File Here ....</p>
                    }
                </div>
        </div>
    );
}

export default Upload;