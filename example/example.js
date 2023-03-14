// Copyright IBM Corp. 2016,2019. All Rights Reserved.
// Node module: loopback-connector-qadashdb
// This file is licensed under the Artistic License 2.0.
// License text available at https://opensource.org/licenses/Artistic-2.0

'use strict';

const g = require('../lib/globalize');
const DataSource = require('loopback-datasource-juggler').DataSource;
const DASHDB = require('../'); // loopback-connector-qadashdb

const config = {
  username: process.env.DASHDB_USERNAME,
  password: process.env.DASHDB_PASSWORD,
  hostname: process.env.DASHDB_HOSTNAME,
  port: 50000,
  database: 'SQLDB',
};

const db = new DataSource(DASHDB, config);

const User = db.define('User', {name: {type: String}, email: {type: String},
});

db.autoupdate('User', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  User.create({
    name: 'Tony',
    email: 'tony@t.com',
  }, function(err, user) {
    console.log(err, user);
  });

  User.find({where: {name: 'Tony'}}, function(err, users) {
    console.log(err, users);
  });

  User.destroyAll(function() {
    g.log('example complete');
  });
});
