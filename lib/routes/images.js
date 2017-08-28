const Router = require('express').Router;
const router = Router();
const Image = require('../models/Image');

router
    .get('/', (req, res, next) => {
        Image.find()
            .lean()
            .select('title description url')
            .then(images => res.send(images))
            .catch(next);
    })

    .post('/', (req, res, next) => {
        new Image(req.body)
            .save()
            .then(image => res.send(image))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Image.findByIdAndRemove(req.params.id)
            .then(response => {
                res.send({ removed: !!response });
            })
            .catch(next);
    });

module.exports = router;