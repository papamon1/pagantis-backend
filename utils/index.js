exports.handleResults = (errors, data, res, message) =>{


    // This is the hidden feature

    if(message && message.indexOf('generosity')!==-1){
        return res.status(200).send({
            data,
            message,
            url:'https://res.cloudinary.com/hrs6od6oy/video/upload/v1616372830/easter_eggPc_pfh3u6.mov'
        });
    }

    if(errors ){

        // We should manage the error in this block. For the example, we just return a message
        return res.status(422).send({
            message,
            details: errors
        });

    }

    if(!data || data.length===0){
        return res.status(404).send({
            message
        });    
    }

    return res.status(200).send({
        data
    });

}