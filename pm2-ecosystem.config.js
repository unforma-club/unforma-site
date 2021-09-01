module.exports = {
    apps: [
        {
            name: "unforma-site",
            script: "yarn start",
            watch: ".next",
            env: {
                PORT: 9992,
                NODE_ENV: "production",
            },
        },
    ],
};
