import Photo from "../models/photoModel.js";

const createPhoto = async (req, res) => {
  try {
    const photo = await Photo.create(req.body);
    res.status(201).json({ success: true, photo });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      succeded: false,
      err,
    });
  }
};

const getAllPhotos = async (req, res) => {
  try {
    const photos = await Photo.find();
    res.status(200).render("photos", {
      photos,
      link: "photos",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      succeded: false,
      err,
    });
  }
};

const getAPhoto = async (req, res) => {
  try {
    const photo = await Photo.findById({ _id: req.params.id });
    res.status(200).render("photo", {
      photo,
      link: "photos",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      succeded: false,
      err,
    });
  }
};

export { createPhoto, getAllPhotos, getAPhoto };
