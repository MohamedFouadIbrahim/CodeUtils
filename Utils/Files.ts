import DocumentPicker, { DocumentPickerOptions, DocumentPickerResponse, Platform } from 'react-native-document-picker';
import RNFS from 'react-native-fs';

export const pickFile = (options: DocumentPickerOptions<Platform>, onSucess: (res: DocumentPickerResponse) => void, onFailuer?: (err: any) => void): void => {

    DocumentPicker.pick({ ...options }).then((res) => {
        onSucess && onSucess(res)
    }).catch(err => {
        if (!DocumentPicker.isCancel(err)) {
            onFailuer && onFailuer(err)
        }
    })
}


export const pickMultiFile = (options: DocumentPickerOptions<Platform>, onSucess: (res: DocumentPickerResponse[]) => void, onFailuer?: (err: any) => void): void => {

    DocumentPicker.pickMultiple({ ...options }).then((res) => {
        onSucess && onSucess(res)
    }).catch(err => {
        if (!DocumentPicker.isCancel(err)) {
            onFailuer && onFailuer(err)
        }
    })
}

export const readFile = (fileDir: string, encodingOrOptions: any): void => {
    
    RNFS.readFile(fileDir, encodingOrOptions).then((file) => {
        console.log(file)
    }).catch(e => {
        console.log(e)
    })

}

export const writeFile = (fileDir: string, contents: string, encodingOrOptions: any, onSucess?: () => void, onFailuer?: (err: any) => void): void => {

    // use DocumentDirectoryPath
    RNFS.writeFile(fileDir, contents, encodingOrOptions).then(() => {
        onSucess && onSucess()
    }).catch((e) => {
        onFailuer && onFailuer(e)
    })

}