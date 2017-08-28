require('mongoose').Promise = Promise;
const assert = require('chai').assert;
const Image = require('../../lib/models/Image');

const expectedValidation = () => { throw new Error('expected validation errors'); };

describe('images model', () => {
    
    it('validates a good model', () => {
        const image = new Image({ 
            title: 'Test Bunny Title', 
            description: 'Test Bunny Description', 
            url: 'testbunny@test.com' 
        });
        return image.validate();
    });

    describe('validation failures', () => {
        
        it('everything is required', () => {
            const image = new Image();
            return image.validate()
                .then(expectedValidation, 
                    err => {
                        const errors = err.errors;
                        assert.ok(errors.title && errors.title.kind === 'required');
                        assert.ok(errors.description && errors.description.kind === 'required');
                        assert.ok(errors.url && errors.url.kind === 'required');
                    });
        });
    });
});
