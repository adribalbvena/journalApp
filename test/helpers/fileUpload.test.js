import { v2 as cloudinary } from 'cloudinary';
import { getEnvironments } from '../../src/helpers';
import { fileUpload } from "../../src/helpers/fileUpload";

const {
    VITE_CLOUDINARY_APIKEY,
    VITE_CLOUDINARY_APISECRET,
    VITE_CLOUDINARY_NAME
} = getEnvironments();

cloudinary.config({
    cloud_name: VITE_CLOUDINARY_NAME,
    api_key: VITE_CLOUDINARY_APIKEY,
    api_secret: VITE_CLOUDINARY_APISECRET,
    secure: true
});

describe('Tests in fileUpload', () => { 
    test('Should upload the file to cloudinary successfully', async() => {
        const imageUrl = 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg';
        const resp = await fetch( imageUrl );
        const blob = await resp.blob();
        const file = new File([blob], 'photo.jpg');

        const url = await fileUpload( file );
        expect( typeof url ).toBe('string');

        //to clean from claudinary
        const segments = url.split('/');
        const imageId = segments[ segments.length -1 ].replace('.jpg','');

        const cloudResp = await cloudinary.api.delete_resources([ 'journal/' + imageId ], {
            resource_type: 'image'
        });

    });

    test('Should return null', async() => { 
        const file = new File([], 'photo.jpg');

        const url = await fileUpload( file );
        expect( url ).toBe( null );
     });
 });