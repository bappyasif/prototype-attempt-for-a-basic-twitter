import React, { useState } from 'react'
import { Gif } from '@giphy/react-components';
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import FirebaseApp from '../firebase-configs'
import { updateUserDocWithMediaUrls } from '../firestore-methods';

// Get a reference to the storage service, a.k.a. root reference
let storage = getStorage(FirebaseApp);

export let uploadTweetPictureUrlToStorage = (imgFile, fileId, updateUploadingStatus) => {
    let storageRef = ref(storage, 'test/'+(fileId));
    uploadBytes(storageRef, imgFile)
    .then(res => {
        // console.log('<< picture upoloaded to storage >>', res, res.metadata)
        console.log('<< picture upoloaded to storage >>', res)
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