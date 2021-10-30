import { Gif } from '@giphy/react-components';
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import FirebaseApp from '../firebase-configs'

// Get a reference to the storage service, a.k.a. root reference
let storage = getStorage(FirebaseApp);

// Create a Reference
// in order to upload or download files, delete files, or get or update metadata, 
// we must create a reference to the file you want to operate on
// a reference can be thought of as a pointer to a file in the cloud
// References are lightweight, so you can create as many as you need, 
// and they are also reusable for multiple operations

// Create a storage reference from our storage service
const storageRef = ref(storage);

// Create a child reference
const testFolderRef = ref(storage, 'test')

// Child references can also take paths delimited by '/'
const welcomeRef = ref(storage, 'test/welcome.jpg');
// now testFolderRef points to 'test/'
// and welcomeRef points to a resource from 'test' folder

// Navigate with References
// we can also use the parent and root properties to navigate up the file hierarchy
// parent navigates up one level, while root navigates all the way to the top
// child(), parent, and root can be chained together multiple times, as each returns a reference

// parent allows us to move to the parent of a reference
const folderRef = welcomeRef.parent;

// root allows us to move all the way back to the top of our bucket
const rootRef = welcomeRef.root;
// exception is the parent of root, which is null

// References can be chained together multiple times
const earthRef = ref(welcomeRef.parent, 'earth.jpg');
// earthRef points to 'test/earth.jpg'

// nullRef is null, since the parent of root is null
const nullRef = welcomeRef.root.parent;

// Reference Properties
// we can inspect references to better understand the files they point to using the fullPath, name, and bucket properties
// these properties get the full path of the file, the name of the file, and the bucket the file is stored in

// Reference's path is: 'test/welcome.jpg'
// This is analogous to a file path on disk
welcomeRef.fullPath;

// Reference's name is the last segment of the full path: 'welcome.jpg'
// This is analogous to the file name
welcomeRef.name;

// Reference's bucket is the name of the storage bucket where files are stored
welcomeRef.bucket;

// Limitations on References
// Reference paths and names can contain any sequence of valid Unicode characters, but certain restrictions are imposed
// Total length of reference.fullPath must be between 1 and 1024 bytes when UTF-8 encoded
// No Carriage Return or Line Feed characters.
// Avoid using #, [, ], *, or ?, as these do not work well with other tools such as the Firebase Realtime Database or gsutil.



// Upload files with Cloud Storage on Web
// to upload a file to Cloud Storage, we must first create a reference to the full path of the file, including the file name.

// creating a reference to 'mountains.jpg'
const mountainsRef = ref(storage, 'mountains.jpg');

// creating a reference to 'images/mountains.jpg'
const mountainImagesRef = ref(storage, 'images/mountains.jpg');

// while the file names are the same, the references point to different files
mountainsRef.name === mountainImagesRef.name;           // true
mountainsRef.fullPath === mountainImagesRef.fullPath;   // false 
// basically they are two different file references from two different file hierarchy

// Upload from a Blob or File
export let testUploadBlobFile = (file) => {
    if (file) {
        let storageRef = ref(storage, 'test/'+(file.name || file.id));
        console.log(file, 'blob here')
        uploadBytes(storageRef, file)
        .then((snapshot) => console.log('uploaded a blob file into storage', snapshot))
        .catch(err=>console.log('error while uploading a blob file into storage....', err.message))
    }
}




// Download files with Cloud Storage on Web
// to download a file, first create a Cloud Storage reference to the file you want to download.
// we can create a reference by appending child paths to the root of our Cloud Storage bucket
// or we can create a reference from an existing gs:// or https:// URL referencing an object in Cloud Storage

export let testDownloadBlobFile = (filename) => {
    // create a reference with an initial file path and name
    let pathRef = ref(storage, 'test/undefined')

    // create a reference from a Google Cloud Storage URI
    let gsRef = ref(storage, 'gs://prototyping-a-basic-twitter.appspot.com/test/undefined');

    // we can get the download URL for a file by calling the getDownloadURL() method on a Cloud Storage reference
    getDownloadURL(pathRef)
    .then(url => {
        // url is downloadable url for this blob file and can be downloaded directly
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        
        xhr.onload = event => {
            let blob = xhr.response;
        }
        
        xhr.open('GET', url);
        // xhr.setRequestHeader('Access-Control-Allow-Credentials', true)
        // xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
        xhr.send()

        console.log(url, 'url!!')

        // return <Gif height='290px' width='96%' gif={url} className='style-gif-border-radius' />
    }).catch(err => console.log('erro while downloding blob', err.message))
}