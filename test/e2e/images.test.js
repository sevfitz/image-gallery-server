const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;

describe('images api', () => {

    before(db.drop);

    let testbunny = {
        title: 'testbunny title',
        description: 'description',
        url: 'url'
    };

    function saveBunny(image) {
        return request
            .post('/api/images')
            .send(image)
            .then(res => {
                let body = res.body;
                image.__v = body.__v;
                image._id = body._id;
                return body;
            });
    }

    it('initial /GET returns empty list', () => {
        return request.get('/api/images')
            .then(req => {
                const images = req.body;
                assert.deepEqual(images, []);
            });
    });

    it('saves a bunny', () => {
        return saveBunny(testbunny)
            .then(saved => {
                assert.deepEqual(saved, testbunny);
            });
    });

    it('deletes a bunny', () => {
        return request.delete(`/api/images/${testbunny._id}`)
            .then(res => res.body)
            .then(result => {
                assert.isTrue(result.removed);
            });
    });

    it('delete an imaginary bunny is removed false', () => {
        return request.delete(`/api/images/${testbunny._id}`)
            .then(res => res.body)
            .then(result => {
                assert.isFalse(result.removed);
            });
    });

});