import React, { useState } from 'react'
import { Gif } from '@giphy/react-components';
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import FirebaseApp from '../firebase-configs'
import { updateUserDocWithMediaUrls } from '../firestore-methods';

// Get a reference to the storage service, a.k.a. root reference
let storage = getStorage(FirebaseApp);

export let uploadTweetPictureUrlToStorage = (imgFile, fileId, updateUploadingStatus, extra) => {
    // let storageRef = ref(storage, 'test/'+(fileId));
    // let storageRef = ref(storage, extra ? 'test/'+ (fileId)+'extra' : 'test/'+ (fileId));
    
    let route = extra == 'extra' ? 'test/extra/'+(fileId) : 'test/'+(fileId) 
    let storageRef = ref(storage, route);

    uploadBytes(storageRef, imgFile)
    .then(res => {
        // console.log('<< picture upoloaded to storage >>', res, res.metadata)
        console.log('<< picture upoloaded to storage >>', res)
        updateUploadingStatus();
    })
    .catch(err=>console.log('<< could not uploaded picture to storage >>', err.message))
}

export let downloadTweetPictureUrlFromStorage = (fileId, updateUrl, extra) => {
    // console.log(fileId, '<<here>>')
    // let storageRef = ref(storage, 'test/'+(fileId));

    let route = extra == 'extra' ? 'test/extra/'+(fileId) : 'test/'+(fileId) 
    let storageRef = ref(storage, route);

    getDownloadURL(storageRef).then(res=> {
        console.log('<< tweet picture url downloaded >>', res)
        // think of an alternative how this can be done, so that this gets easier and always gets run by update function when needed
        updateUrl(res);
        // updateUserDocWithMediaUrls(fileId, res)
    }).catch(err=>console.log('<< couldnt found picture url >>', err.message))
}

export let uploadUserProfilePictureToStorage = (imgFile, fileId, updateUploadingStatus, coverPhoto) => {
    let route = `profiles/${fileId}/${coverPhoto ? 'coverPhoto' : 'profilePhoto'}/`
    let storageRef = ref(storage, route)
    uploadBytes(storageRef, imgFile)
    .then(res => {
        console.log(`${coverPhoto ? 'coverPhoto' : 'profilePhoto'} is now uploaded`)
        updateUploadingStatus();
    }).catch(err => console.log('picture resource upload into storage from profile module is failed', err.code, err.message))
}

export let downloadProfilePictureUrlFromStorage = (fileId, updateUrl, coverPhoto) => {
    let route = `profiles/${fileId}/${coverPhoto ? 'coverPhoto' : 'profilePhoto'}/`
    let storageRef = ref(storage, route)

    getDownloadURL(storageRef)
    .then(res => {
        console.log(`${coverPhoto ? 'coverPhoto' : 'profilePhoto'} is now downloaded`)
        updateUrl(res);
    }).catch(err => console.log('picture resource/s download from storage is failed', err.code, err.message))
}