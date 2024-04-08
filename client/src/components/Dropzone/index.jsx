import React, { ReactNode, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Upload from '../imageUploader/Upload'


export const MyDropzone = (props) => {
  const { setFiles, setfileUrls, setFileStatus } = props
  const onDrop = useCallback(async (acceptedFiles) => {
    var UpdatedFiles= [] 
    setfileUrls([])
    setFileStatus(null)
    acceptedFiles.forEach(async(file) => {
      try {
        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
          const reader = new FileReader()
          reader.onload = (e) => {
            UpdatedFiles.push({ data: file, url: e.target?.result  })
          }
          reader.readAsDataURL(file)
          // console.log('file: ', file);
          Upload(file,setFileStatus,setfileUrls)

        }
        else {
          console.log("wrong file");
        }
      } catch (error) {
        console.log('error_in_DZ: ', error);
      }
    })
    setTimeout(() => {
      setFiles(UpdatedFiles)
      // console.log('UpdatedFiles: ', UpdatedFiles);
    }, 100);

  }, [])
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()} style={{ height: '100%', width: '100%' }}>
      <input {...getInputProps()} accept='image/*' />
      {props.children}
    </div>
  )
}