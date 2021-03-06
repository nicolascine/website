/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/twitss              ->  index
 * POST    /api/twitss              ->  create
 * GET     /api/twitss/:id          ->  show
 * PUT     /api/twitss/:id          ->  update
 * DELETE  /api/twitss/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
var Twits = require('./twits.model');

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
        res.status(statusCode).send(err);
    };
}

function responseWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function(entity) {
        if (entity) {
            res.status(statusCode).json(entity);
        }
    };
}

function handleEntityNotFound(res) {
    return function(entity) {
        if (!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

function saveUpdates(updates) {
    return function(entity) {
        var updated = _.merge(entity, updates);
        return updated.saveAsync()
            .spread(updated => {
                return updated;
            });
    };
}

function removeEntity(res) {
    return function(entity) {
        if (entity) {
            return entity.removeAsync()
                .then(() => {
                    res.status(204).end();
                });
        }
    };
}

// Gets a list of Twitss
export function index(req, res) {
    var limit = parseInt(req.query.twitLimit, 10);
    var limitTwit = typeof limit === 'undefined' ? 0 : limit;
    var lastTwit = req.query.lastTwit;
    var params = lastTwit != 0 ? { _id: { $gte: lastTwit } } : {};
    Twits.find(params).limit(limitTwit)
        .execAsync()
        .then(responseWithResult(res))
        .catch(handleError(res));
}

// Gets a single Twits from the DB
export function show(req, res) {
    Twits.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(responseWithResult(res))
        .catch(handleError(res));
}

// Creates a new Twits in the DB
export function create(req, res) {
    Twits.createAsync(req.body)
        .then(responseWithResult(res, 201))
        .catch(handleError(res));
}

// Updates an existing Twits in the DB
export function update(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Twits.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(responseWithResult(res))
        .catch(handleError(res));
}

// Deletes a Twits from the DB
export function destroy(req, res) {
    Twits.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}
