import React, { useState } from 'react'
import { Gif } from '@giphy/react-components';
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import FirebaseApp from '../firebase-configs'
import { updateUserDocWithMediaUrls } from '../firestore-methods';

// Get a reference to the storage service, a.k.a. root reference
let storage = getStorage(FirebaseApp);

// while the file names are the same, the references point to different files
// mountainsRef.name === mountainImagesRef.name;           // true
// mountainsRef.fullPath === mountainImagesRef.fullPath;   // false 
// basically they are two different file references from two different file hierarchy

export let testUploadBlobFileAsyncApproach = (file, fileId, urlUpdater) => {
    // let [mediaUrl, setMediaUrl] = useState('')
    let mediaUrl;
    if (file) {        
        // console.log(file, 'blob here', fileId)
        // mediaUrl = uploadAndDownloadUrl(file, fileId);
        uploadAndDownloadUrl(file, fileId).then((url) =>{ 
            mediaUrl = url;
            // console.log(mediaUrl, ':url here:', url)
            urlUpdater(url)
        }).catch(err=>console.log('no url', err.message))
    }
    // mediaUrl && console.log(mediaUrl, 'url here!!')
    // mediaUrl && console.log(mediaUrl, 'mediaUrl')
    // return <div>{mediaUrl}</div>
    // return mediaUrl && mediaUrl
}

export let uploadTweetPictureUrlToStorage = (imgFile, fileId, updateUploadingStatus) => {
    let storageRef = ref(storage, 'test/'+(fileId));
    uploadBytes(storageRef, imgFile)
    .then(res => {
        console.log('<< picture upoloaded to storage >>', res, res.metadata)
        updateUploadingStatus();
    })
    .catch(err=>console.log('<< could not uploaded picture to storage >>', err.message))
}

export let downloadTweetPictureUrlFromStorage = (fileId, updateUrl) => {
    let storageRef = ref(storage, 'test/'+(fileId));
    getDownloadURL(storageRef).then(res=> {
        console.log('<< tweet picture url downloaded >>', res)
        // think of an alternative how this can be done, so that this gets easier and always gets run by update function when needed
        updateUrl(res);
        // updateUserDocWithMediaUrls(fileId, res)
    }).catch(err=>console.log('<< couldnt found picture url >>', err.message))
}

export let lookupTweetPictureUrl = (fileId, updateUrlFoundStatus) => {
    let storageRef = ref(storage, 'test/'+(fileId));
    
    
}

let uploadAndDownloadUrl = async (file, fileId) => {
    let mediaUrl;
    let storageRef = ref(storage, 'test/'+(fileId));
    try {
        await uploadBytes(storageRef, file) 
        console.log('uploaded a blob file into storage....')
        // testDownloadBlobFile(fileId)
        mediaUrl = await getDownloadURL(storageRef)
        // setMediaUrl(await getDownloadURL(storageRef))
        mediaUrl && console.log(mediaUrl, 'mediaUrl')
        // mediaUrl && urlUpdater(mediaUrl)
        return mediaUrl && mediaUrl
    } catch (err) {
        console.log('error while uploading a blob file into storage....', err)
    }
}


// Download files with Cloud Storage on Web
// to download a file, first create a Cloud Storage reference to the file you want to download.
// we can create a reference by appending child paths to the root of our Cloud Storage bucket
// or we can create a reference from an existing gs:// or https:// URL referencing an object in Cloud Storage
// export let testDownloadBlobFile = (docID) => {
//     // create a reference with an initial file path and name
//     // let fileName = (fileObject.gifItem.id || fileObject.imgFile.name)
//     let pathRef = ref(storage, 'test/'+docID)
//     // let pathRef = ref(storage, 'test/imgFile')

//     // we can get the download URL for a file by calling the getDownloadURL() method on a Cloud Storage reference
//     let elementReturned = pathRef && getDownloadURL(pathRef)
//     .then(url => {
//         console.log(url, 'url!!', <a href={url}>{fileName}</a>)
//         // return [<a href={url}>{fileName}</a>]
//         // return [<img src={url} />]

//     }).catch(err => console.log('erro while downloding blob', err.message))
//     // console.log(elementReturned, 'is it?!')
//     let test;
//     elementReturned.then(el=> test = el[0]).catch(err=>console.log('could not return element', err.message))
//     return test && test
// }