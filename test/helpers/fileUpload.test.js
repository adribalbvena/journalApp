import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
    cloud_name: 'reactapps',
    api_key: '518841923421927',
    api_secret: 'x-jqzyNAIRGQGVwyCWTKbQ3YTxo',
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