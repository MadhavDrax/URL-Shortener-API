const URL = require('../model/urlM');
const shortid = require("shortid");

exports.getURLs = async (req, res) => {
    try {
        const urls = await URL.find({});
        res.status(200).json(urls);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

exports.createURL = async (req, res) => {
    const body = req.body;
    console.log("Request body:", body);
    if (!body.url) {
        return res.status(404).json({
            status: 'Failed',
            message: 'Please provide a url!'
        });
    }
    try {
        const originalUrl = body.url;
        console.log("Original URL:", originalUrl); // Debug log

        // Check if the URL already exists in the database
        let newurl = await URL.findOne({ originalUrl });

        if (newurl) {
            return res.status(200).json({
                status: 'ok',
                message: 'URL has already been shortened',
                shortUrl: newurl.shortId
            });
        }

        const shortUrlID = shortid.generate();
        // Create a new instance of the urldata model
        newurl = await URL.create(
            {
                originalUrl: body.url,
                shortId: shortUrlID
            });

        // Save the new URL document to the database
        res.status(200).json({
            status: 'ok',
            message: 'URL created succesfully',
            shortUrl: shortUrlID
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error while creating URL' });
    }
}

exports.redirectToUrl = async (req, res) => {
    const shortId = req.params.shortId;
    console.log("Received shortId:", shortId);

    try {
        const url = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visithistory: { timestamp: Date.now() },
                },
            },
            { new: true }
        );

        if (!url) {
            console.log("Short URL not found");
            return res.status(404).json({ status: 'fail', message: 'Short URL not found' });
        }

        console.log("Updated visithistory:", url.visithistory);
        res.redirect(url.originalUrl);
    } catch (error) {
        console.error('Error during redirection:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

//delete url
exports.deleteURL = async(req,res)=>{
    const deleteId =  await URL.findOneAndDelete(req.params);
    if(!deleteId){
      res.status(404).json({
        Status: "Failed",
        message: "User ID is not exsist!"
      })
    }
    else{
      return res.status(200).json({
        status: "Successfully deleted",
        message: "User deleted successfully"
      });
    }
  };

// Analytics
exports.analyticsOfURL = async(req,res)=>{
    const userShortId = req.params.shortId;
    // console.log(userShortId);
    const result = await URL.findOne({shortId: userShortId});
    // console.log(result);
    if(!result){
        return res.status(404).json({
            status: "Failed",
            message: "Short url not found!"
        });
    }

    return res.json({
        totalClickes: result.visithistory.length,
        analytics: result.visithistory
    })
};

// in morning fix the analytics controller