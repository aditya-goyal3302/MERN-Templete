require('dotenv').config();

module.exports = {
  "local": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_DATABASE,
        "host": process.env.DB_HOST,
        "dialect": "postgres",
        "seederStorage": "sequelize",
        "logging": console.log,
        "define": {
            "underscored": true,
            "timestamps": true,
            "createdAt": "created_at",
            "updatedAt": "updated_at",
            "deletedAt": "deleted_at",
        },
    },
    "test": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database": "db-test",
        "host": process.env.DB_HOST,
        "dialect": "postgres",
        "seederStorage": "sequelize",
        "logging": false,
        "define": {
            "underscored": true,
            "timestamps": true,
            "createdAt": "created_at",
            "updatedAt": "updated_at",
            "deletedAt": "deleted_at",
        },
    },
    "development": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_DATABASE,
        "host": process.env.DB_HOST,
        "dialect": "postgres",
        "seederStorage": "sequelize",
        "logging": false,
        "define": {
            "underscored": true,
            "timestamps": true,
            "createdAt": "created_at",
            "updatedAt": "updated_at",
            "deletedAt": "deleted_at",
        },
    },
    "production": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_DATABASE,
        "host": process.env.DB_HOST,
        "dialect": "postgres",
        "seederStorage": "sequelize",
        "logging": false,
        "define": {
            "underscored": true,
            "timestamps": true,
            "createdAt": "created_at",
            "updatedAt": "updated_at",
            "deletedAt": "deleted_at",
        },
    }
}

