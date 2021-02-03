import { launchCamera, launchImageLibrary, CameraOptions, ImagePickerResponse, ImageLibraryOptions, ErrorCode } from 'react-native-image-picker';

import { getPhotos, PhotoIdentifier, getAlbums, Album } from '@react-native-community/cameraroll'; // get Media Without Ui

export const openCamera = (cameraOptions: CameraOptions = { mediaType: 'photo' }, onSucess?: (response: ImagePickerResponse) => void, onFailuer?: (err: ErrorCode) => void): void => {
    launchCamera({ ...cameraOptions }, (response) => {
        if (response.errorCode) {
            onFailuer && onFailuer(response.errorCode)
        } else {
            onSucess && onSucess(response)
        }
    })
}

export const openImageLibrary = (options: ImageLibraryOptions = { mediaType: 'photo' }, onSucess?: (response: ImagePickerResponse) => void, onFailuer?: (err: ErrorCode) => void): void => {
    launchImageLibrary({ ...options }, response => {
        if (response.errorCode) {
            onFailuer && onFailuer(response.errorCode)
        } else {
            onSucess && onSucess(response)
        }
    })
}

export const getAllPhotos = (onSucess?: (response: PhotoIdentifier[]) => void, onFailuer?: (err: any) => void): void => {
    getPhotos({ first: 1000, assetType: 'Photos' }).then((e) => {
        onSucess && onSucess(e.edges)
    }).catch((e) => {
        onFailuer && onFailuer(e)
    })
}

export const getAllAlbums = (onSucess?: (response: Album[]) => void, onFailuer?: (err: any) => void) => {

    getAlbums({ assetType: 'Photos' }).then((e) => {
        onSucess && onSucess(e)
    }).catch((e) => {
        onFailuer && onFailuer(e)
    })
}