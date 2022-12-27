export const fileUpload = async( file ) => {
    //if ( !file ) throw new Error('There is no image to upload');
    if ( !file ) return null;


    const cloudUrl = 'https://api.cloudinary.com/v1_1/reactapps/upload';

    const formData = new FormData();
    formData.append('upload_preset','journal');
    formData.append('file', file );

    try {
 
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        })

        if ( !resp.ok ) throw new Error('Error uploading images')
        const cloudResp = await resp.json();

        return cloudResp.secure_url;

    } catch (error) {
        //console.log(error);
        //throw new Error( error.message );
        return null;
    }

}